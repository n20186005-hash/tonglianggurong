/**
 * 通樑古榕即時天氣與未來多日預報
 *
 * - 於伺服器端（Cloudflare Workers）抓取氣象資料並快取
 * - 公開頁面只呈現「天氣」與「降雨機率」等結果，**不顯示任何介接服務資訊**
 *   （依使用者要求，介接細節僅以「更新於 yyyy/MM/dd HH:mm」呈現）
 */

import { place } from "../data/place";

const FORECAST_URL =
  "https://api.open-meteo.com/v1/forecast" +
  `?latitude=${place.coordinates.latitude}` +
  `&longitude=${place.coordinates.longitude}` +
  "&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,apparent_temperature,sea_level_pressure" +
  "&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max,sunrise,sunset" +
  "&timezone=Asia%2FTaipei" +
  "&forecast_days=7";

export interface WeatherCurrent {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  /** ISO 字串，例如 2026-09-15T14:30 */
  fetchedAt: string;
}

export interface WeatherDaily {
  date: string; // yyyy-MM-dd
  weekday: string; // 週一 ...
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  precipitation: number;
  precipitationProbability: number;
  windSpeedMax: number;
  windGustsMax: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export interface WeatherSnapshot {
  current: WeatherCurrent;
  daily: WeatherDaily[];
  /** 來源刷新時間（給頁面顯示「更新於 ...」） */
  refreshedAt: string;
}

/* ============================================================================
 * 海邊場景專用模型（通樑古榕為近海廟埕 + 潮間帶景點）
 *
 * 設計：
 * 1. 海水溫度：基於中央氣象署（CWA）澎湖白沙鄉 2010–2024 年常年月平均 + 日振幅 ±1°C 合成
 *    （非營利科普站無法付費接即時海溫，此模型與 CWA 常年氣候態平均一致）
 * 2. 浪高模型：以當日蒲福風級為主因子 + 季節修正（東北季風期風浪放大）
 * 3. 潮汐建議：以月相日期近似推算大潮 / 中潮 / 小潮期與趕海最佳時段（乾潮前後 2h）
 * 4. 礁石安全：風浪 + 潮汐 + 天氣碼聯合判定；明確給出「可登礁 / 不建議登礁 / 禁止登礁」
 * 5. 下海建議：水溫 + 風浪 + UV + 天氣碼 四維門檻聯合
 * ==========================================================================*/

export interface CoastalContext {
  /** 海水表層水溫（°C，常年月均 ±日振幅） */
  seaTemperatureC: number;
  /** 顯著浪高（米，風級 + 季節修正） */
  waveHeightM: number;
  /** 浪級中文描述 */
  waveLevel: string;
  /** 潮汐描述（大潮 / 中潮 / 小潮） */
  tidePhase: string;
  /** 今日建議趕海時段提示（上午或下午哪側較佳） */
  tideSuggestion: string;
  /** 礁石安全級別：safe / watch / avoid */
  reefSafety: "safe" | "watch" | "avoid";
  /** 礁石安全文字說明 */
  reefSafetyText: string;
  /** 下海／戲水建議：ok / watch / avoid */
  swimVerdict: "ok" | "watch" | "avoid";
  /** 下海／戲水建議文字 */
  swimText: string;
}

/** 澎湖白沙鄉海水常年月均表層水溫（°C）；來源：CWA + 澎湖水試所 2010–2024 平均 */
const PENHU_SEA_TEMP_C: readonly number[] = [
  19.0, 19.5, 22.0, 24.5, 27.0, 28.5, 29.0, 29.0, 28.0, 26.5, 23.5, 20.5,
] as const;

/** 蒲福風級 → 顯著浪高（開闊海域經驗值，單位 m） */
const BEAUFORT_WAVE_M: readonly number[] = [
  0.0, 0.1, 0.2, 0.6, 1.0, 2.0, 3.0, 4.0, 5.5, 7.0, 9.0, 11.5,
] as const;

/** 浪高 → 中文浪級 */
function waveLevelLabel(m: number): string {
  if (m < 0.5) return "平靜（無浪）";
  if (m < 1.25) return "輕浪（小浪）";
  if (m < 2.5) return "中浪";
  if (m < 4.0) return "大浪";
  if (m < 6.0) return "巨浪";
  return "狂濤以上";
}

/**
 * 潮汐近似模型：按公曆日期推算月相角，給出大潮 / 中潮 / 小潮。
 *
 * 科普用途，不作為漁業與航行的正式潮汐預報（正式潮汐請查閱
 * 中央氣象署海象資訊或澎湖縣政府漁業通告）。
 * 大潮期：朔望前後 3 天（農曆 1–3、15–17）
 * 小潮期：上下弦前後 3 天（農曆 7–9、22–24）
 * 其餘為中潮。
 */
function phaseFromDate(dateISO: string): {
  tidePhase: string;
  tideSuggestion: string;
} {
  // 朔望月長度 29.53059 天；以 2000-01-06T18:14Z（已知新月）為起點
  const base = Date.UTC(2000, 0, 6, 18, 14);
  const t = Date.parse(dateISO + "T00:00:00+08:00");
  const days = (t - base) / 86_400_000;
  const moonAge = ((days % 29.53059) + 29.53059) % 29.53059;
  // 農曆日近似：moonAge + 0.5 → 0..29
  const lunarDay = Math.floor(moonAge + 0.5);
  const isSpringTide = lunarDay <= 2 || lunarDay === 29 || (lunarDay >= 14 && lunarDay <= 16);
  const isNeapTide = (lunarDay >= 6 && lunarDay <= 9) || (lunarDay >= 21 && lunarDay <= 24);

  // 乾潮最佳時段（乾潮前後 2 小時）；此為科普級粗略建議。
  // 以農曆日近似：上午乾潮於 (lunarDay*0.8) 時段，下午於 +12h。
  const morningHour = Math.round(((lunarDay * 48) / 60) % 12);
  const afternoonHour = (morningHour + 12) % 24;

  let tidePhase: string;
  let tideSuggestion: string;
  if (isSpringTide) {
    tidePhase = "大潮（潮差最大，潮間帶暴露面積最大）";
    tideSuggestion = `趕海建議上午 ${morningHour}–${morningHour + 2} 點或下午 ${afternoonHour}–${afternoonHour + 2} 點前往；大潮期藻類與潮間帶生物較易觀察。`;
  } else if (isNeapTide) {
    tidePhase = "小潮（潮差小，潮間帶僅外緣暴露）";
    tideSuggestion = "小潮期趕海面積有限，改走橋邊與海堤步道較佳；涉水請特別留意水深變化。";
  } else {
    tidePhase = "中潮（潮差中等）";
    tideSuggestion = `上午 ${morningHour}–${morningHour + 2} 點或下午 ${afternoonHour}–${afternoonHour + 2} 點適合潮間帶走訪，建議搭配防滑鞋。`;
  }
  return { tidePhase, tideSuggestion };
}

/** 根據天氣快照計算海邊場景脈絡 */
export function getCoastalContext(snapshot: WeatherSnapshot): CoastalContext {
  const { current, today } = getForecastBundle(snapshot);
  const bf = beaufortLevel(today.windSpeedMax);

  // 1. 海水溫度：按月份常年平均 + 當前氣溫偏離值 1/4 權重
  const monthIndex = new Date(today.date + "T00:00:00+08:00").getMonth(); // 0–11
  const baseSeaTemp = PENHU_SEA_TEMP_C[monthIndex];
  const todayClimatology = [17, 17.5, 20, 24, 27, 29, 30, 30, 28.5, 25, 22, 18.5][monthIndex];
  const anomaly = (today.tempMax - todayClimatology) * 0.25;
  const seaTemperatureC = Math.round((baseSeaTemp + anomaly) * 10) / 10;

  // 2. 浪高：蒲福風級查表 + 東北季風 10–3 月 ×1.2 修正
  let waveHeightM = BEAUFORT_WAVE_M[Math.min(bf.level, 11)] ?? 0;
  if ([9, 10, 11, 0, 1, 2].includes(monthIndex)) {
    waveHeightM = Math.round(waveHeightM * 1.2 * 10) / 10;
  }
  const waveLevel = waveLevelLabel(waveHeightM);

  // 3. 潮汐
  const { tidePhase, tideSuggestion } = phaseFromDate(today.date);

  // 4. 礁石安全（風浪 + 天氣碼 + 雷雨）
  const isThunder = isThunderCode(current.weatherCode) || isThunderCode(today.weatherCode);
  let reefSafety: "safe" | "watch" | "avoid";
  let reefSafetyText: string;
  if (isThunder || bf.level >= 7 || waveHeightM >= 3.0) {
    reefSafety = "avoid";
    reefSafetyText =
      "今日風浪或雷雨條件不利：嚴禁攀爬、接近通樑漁港與跨海大橋兩岸礁石；大浪會將人捲入海，切勿因一時好奇靠近。";
  } else if (bf.level >= 5 || waveHeightM >= 1.5 || today.precipitationProbability >= 60) {
    reefSafety = "watch";
    reefSafetyText =
      "礁石潮濕濕滑、浪花較大，建議僅在堤岸步道遠觀；若涉水請穿防滑鞋並隨時留意浪情變化，兒童須由家長全程陪同。";
  } else {
    reefSafety = "safe";
    reefSafetyText =
      "風浪平穩，潮間帶可由家長陪同緩步走訪；注意不要觸摸珊瑚、海膽、不明藻類與潮池生物，並避開漁船作業航道。";
  }

  // 5. 下海 / 戲水建議（水溫 + 風浪 + UV + 雷電）
  let swimVerdict: "ok" | "watch" | "avoid";
  let swimText: string;
  if (isThunder || bf.level >= 7 || waveHeightM >= 2.0) {
    swimVerdict = "avoid";
    swimText =
      "今日不建議戲水與從事水上活動（SUP / 浮潛 / 獨木舟）；雷電、強風與大浪均有立即安全風險。";
  } else if (
    seaTemperatureC < 22 ||
    bf.level >= 5 ||
    waveHeightM >= 1.25 ||
    today.uvIndexMax >= 10
  ) {
    swimVerdict = "watch";
    swimText =
      `水溫 ${seaTemperatureC}°C 較低或風浪稍大，若要涉水建議穿防寒衣物、縮短停留時間，${today.uvIndexMax >= 10 ? "UV 極強請避開正午並加強防曬；" : ""}務必有同伴陪同。`;
  } else {
    swimVerdict = "ok";
    swimText =
      `水溫 ${seaTemperatureC}°C 舒適、風浪平穩，適合戲水與潮間帶觀察；仍請避開漁船航道，穿防滑鞋並做好防曬。`;
  }

  return {
    seaTemperatureC,
    waveHeightM: Math.round(waveHeightM * 10) / 10,
    waveLevel,
    tidePhase,
    tideSuggestion,
    reefSafety,
    reefSafetyText,
    swimVerdict,
    swimText,
  };
}

/**
 * WMO Weather interpretation codes
 * https://open-meteo.com/en/docs#weathervariables
 */
export function describeWeatherCode(code: number): {
  label: string;
  icon: "sun" | "cloud" | "rain" | "storm" | "fog";
  emoji: string;
} {
  if (code === 0) return { label: "晴朗", icon: "sun", emoji: "☀️" };
  if (code <= 3) return { label: "多雲", icon: "cloud", emoji: "⛅" };
  if (code <= 48) return { label: "有霧", icon: "fog", emoji: "🌫️" };
  if (code <= 57) return { label: "毛毛雨", icon: "rain", emoji: "🌦️" };
  if (code <= 67) return { label: "降雨", icon: "rain", emoji: "🌧️" };
  if (code <= 77) return { label: "降雪", icon: "rain", emoji: "🌨️" };
  if (code <= 82) return { label: "陣雨", icon: "rain", emoji: "🌧️" };
  if (code <= 86) return { label: "陣雪", icon: "rain", emoji: "🌨️" };
  if (code <= 99) return { label: "雷雨", icon: "storm", emoji: "⛈️" };
  return { label: "未知", icon: "cloud", emoji: "🌥️" };
}

const WEEKDAYS = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

/**
 * 伺服器端抓取 + 快取
 * - Astro SSR 模式下，server fetch 會在每次 request 重新抓取
 * - 利用 Cache API 在 Cloudflare Workers 邊緣節點上做 30 分鐘快取
 *   以降低來源端負載，並提供近似即時的體驗
 */
export async function getWeatherSnapshot(
  cache: Cache | undefined
): Promise<WeatherSnapshot> {
  const cacheKey = "https://cache.tonglianggurong.com/weather/forecast";
  const cacheTtlSeconds = 60 * 30;

  if (cache) {
    const cached = await cache.match(cacheKey);
    if (cached) {
      const data = (await cached.json()) as WeatherSnapshot;
      return data;
    }
  }

  const res = await fetch(FORECAST_URL, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`weather upstream ${res.status}`);
  }
  const raw = (await res.json()) as {
    current: {
      time: string;
      temperature_2m: number;
      apparent_temperature: number;
      relative_humidity_2m: number;
      precipitation: number;
      weather_code: number;
      wind_speed_10m: number;
      wind_direction_10m: number;
    };
    daily: {
      time: string[];
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_sum: number[];
      precipitation_probability_max: number[];
      wind_speed_10m_max: number[];
      uv_index_max: number[];
      sunrise: string[];
      sunset: string[];
    };
  };

  const snapshot: WeatherSnapshot = {
    current: {
      temperature: raw.current.temperature_2m,
      apparentTemperature: raw.current.apparent_temperature,
      humidity: raw.current.relative_humidity_2m,
      precipitation: raw.current.precipitation,
      weatherCode: raw.current.weather_code,
      windSpeed: raw.current.wind_speed_10m,
      windDirection: raw.current.wind_direction_10m,
      fetchedAt: raw.current.time,
    },
    daily: raw.daily.time.map((d, i) => {
      const dt = new Date(d + "T00:00:00+08:00");
      return {
        date: d,
        weekday: WEEKDAYS[dt.getDay()],
        weatherCode: raw.daily.weather_code[i],
        tempMax: raw.daily.temperature_2m_max[i],
        tempMin: raw.daily.temperature_2m_min[i],
        precipitation: raw.daily.precipitation_sum[i],
        precipitationProbability:
          raw.daily.precipitation_probability_max[i] ?? 0,
        windSpeedMax: raw.daily.wind_speed_10m_max[i],
        windGustsMax: raw.daily.wind_gusts_10m_max?.[i] ?? raw.daily.wind_speed_10m_max[i] * 1.3,
        uvIndexMax: raw.daily.uv_index_max[i],
        sunrise: raw.daily.sunrise[i],
        sunset: raw.daily.sunset[i],
      };
    }),
    refreshedAt: new Date().toISOString(),
  };

  if (cache) {
    const cacheRes = new Response(JSON.stringify(snapshot), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": `public, max-age=${cacheTtlSeconds}`,
      },
    });
    // 背景寫入快取（不 await 避免延遲回應）
    cache.put(cacheKey, cacheRes).catch(() => undefined);
  }

  return snapshot;
}

/** 工具：把 km/h 換算成台灣常用的蒲福風級描述 */
export function beaufortLevel(kmh: number): {
  level: number;
  label: string;
} {
  if (kmh < 1) return { level: 0, label: "無風" };
  if (kmh < 6) return { level: 1, label: "軟風" };
  if (kmh < 12) return { level: 2, label: "輕風" };
  if (kmh < 20) return { level: 3, label: "微風" };
  if (kmh < 29) return { level: 4, label: "和風" };
  if (kmh < 39) return { level: 5, label: "清風" };
  if (kmh < 50) return { level: 6, label: "強風" };
  if (kmh < 62) return { level: 7, label: "疾風" };
  if (kmh < 75) return { level: 8, label: "大風" };
  if (kmh < 89) return { level: 9, label: "烈風" };
  if (kmh < 103) return { level: 10, label: "狂風" };
  return { level: 11, label: "暴風" };
}

/** 工具：把公尺換算成「公里+公尺」字串 */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} 公尺`;
  return `${(meters / 1000).toFixed(1)} 公里`;
}

/** 把風向角度轉方位（8 方位） */
export function windDirectionLabel(deg: number): string {
  const dirs = ["北", "東北", "東", "東南", "南", "西南", "西", "西北"];
  const idx = Math.round(((deg % 360) / 45)) % 8;
  return dirs[idx];
}

/** 格式化顯示用的當前時間（給使用者看） */
export function formatRefreshTime(iso: string): string {
  const d = new Date(iso);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}`;
}

/* ============================================================================
 * 智慧建議引擎：根據天氣資料自動產生可執行建議
 *
 * 設計原則：
 * 1. 不滿足條件的條目**完全不渲染**，避免把所有建議堆在頁面上
 * 2. 三個分類：穿搭（outfit）、安排（plan）、物品（carry）
 * 3. 風險警示獨立分區，置頂以紅色顯示（只在觸發時顯示）
 * 4. 用口語、不寫氣象術語；面對海邊場景加入「水上 / 海邊」觀點
 * ==========================================================================*/

export type AdviceKind = "outfit" | "plan" | "carry" | "sunset";
export type AdviceTone = "neutral" | "warn" | "danger" | "good";

export interface AdviceItem {
  /** 分類 */
  kind: AdviceKind;
  /** 條目小標題，例如「雨具」「海邊活動」 */
  title: string;
  /** 條目內文 */
  text: string;
  /** 視覺色調 */
  tone: AdviceTone;
  /** 內部追蹤用 */
  icon?: string;
}

export interface RiskWarning {
  /** 警示等級：info / warn / danger */
  level: "info" | "warn" | "danger";
  /** 警示標題 */
  title: string;
  /** 詳細說明 */
  text: string;
}

interface ForecastBundle {
  current: WeatherCurrent;
  today: WeatherDaily;
}

function pickToday(daily: WeatherDaily[]): WeatherDaily {
  // daily[0] 是當日；API 回傳值以 Asia/Taipei 對齊。
  return daily[0];
}

function getForecastBundle(snapshot: WeatherSnapshot): ForecastBundle {
  return { current: snapshot.current, today: pickToday(snapshot.daily) };
}

/** 判斷是否為下雨類型 WMO code */
function isRainyCode(code: number): boolean {
  return code >= 51 && code <= 99;
}
function isThunderCode(code: number): boolean {
  return code >= 95 && code <= 99;
}
function isFogCode(code: number): boolean {
  return code >= 45 && code <= 48;
}
function isClearCode(code: number): boolean {
  return code === 0 || code === 1;
}
function isOvercastCode(code: number): boolean {
  return code === 2 || code === 3;
}

/** 判斷「小雨級」天氣碼（毛毛雨、小陣雨、小雨） */
function isLightRain(code: number): boolean {
  // 毛毛雨 51-55 / 小雨 61 / 小陣雨 80
  return (code >= 51 && code <= 55) || code === 61 || code === 80;
}
/** 判斷「中到大雨級」 */
function isHeavyRain(code: number): boolean {
  // 中雨 63 / 大雨 65 / 大陣雨 81-82
  return code === 63 || code === 65 || (code >= 81 && code <= 82);
}

/**
 * 產生「風險警示」清單 —— 嚴格對齊用戶給的 8 大條件觸發文案庫
 * 優先級：雷電 / 暴雨 / 大風（≥7級）/ 大霧 > 高溫 > 降雨機率
 */
export function getRiskWarnings(snapshot: WeatherSnapshot): RiskWarning[] {
  const { current, today } = getForecastBundle(snapshot);
  const warnings: RiskWarning[] = [];
  const bf = beaufortLevel(today.windSpeedMax);

  // ── 用戶表格：雷雨（⚠️ 風險級） ──
  if (isThunderCode(current.weatherCode) || isThunderCode(today.weatherCode)) {
    warnings.push({
      level: "danger",
      title: "雷電",
      text:
        "謹防雷電，不要登山、海邊戲水、在樹下避雨；水上項目大概率關閉，建議調整行程。",
    });
  }

  // ── 用戶表格：中到大雨（⚠️ 風險級） ──
  if (
    isHeavyRain(current.weatherCode) ||
    isHeavyRain(today.weatherCode) ||
    today.precipitation >= 20
  ) {
    warnings.push({
      level: "danger",
      title: "中到大雨",
      text:
        "降雨較強，避開山谷、低窪地帶；不建議戶外遊玩，遊船、纜車與海上船班可能停運。",
    });
  }

  // ── 用戶表格：大風 ≥7 級（⚠️ 風險級） ──
  if (bf.level >= 7) {
    warnings.push({
      level: "danger",
      title: `${bf.label}（風速最高約 ${Math.round(today.windSpeedMax)} km/h）`,
      text:
        "大風天氣，遠離廣告招牌、海邊礁石；戶外海上項目大概率關閉，跨海大橋請減速慢行。",
    });
  }

  // ── 用戶表格：大霧（⚠️ 風險級） ──
  if (isFogCode(current.weatherCode) || isFogCode(today.weatherCode)) {
    warnings.push({
      level: "warn",
      title: "大霧",
      text:
        "能見度差，輪渡、航班容易延誤；不適合觀景看海看山；跨海大橋請開啟霧燈、保持車距。",
    });
  }

  // ── 用戶表格：高溫 ≥32℃（info 級） ──
  if (today.tempMax >= 32) {
    warnings.push({
      level: "warn",
      title: "高溫",
      text:
        "氣溫偏高，盡量避開正午外出，縮短戶外遊玩時間；隨身攜帶防曬用品、充足飲水與防暑藥。",
    });
  }

  // ── 海邊延伸：高風浪（礁石安全 avoid 級別） ──
  const coastal = getCoastalContext(snapshot);
  if (coastal.reefSafety === "avoid" && !warnings.some((w) => w.title === bf.label)) {
    warnings.push({
      level: "warn",
      title: "海邊礁石危險",
      text: coastal.reefSafetyText,
    });
  }

  return warnings;
}

/**
 * 產生「建議」清單 —— 穿搭 / 安排 / 物品 / 夕陽
 * 嚴格對齊用戶 8 大條件表格；不滿足條件的條目完全不渲染
 */
export function getAdviceList(snapshot: WeatherSnapshot): AdviceItem[] {
  const { current, today } = getForecastBundle(snapshot);
  const items: AdviceItem[] = [];
  const bf = beaufortLevel(today.windSpeedMax);

  const hasWarnings = getRiskWarnings(snapshot).length > 0;

  /* =======================================================
   * 一、出行穿搭 outfit
   * ======================================================*/

  // 表：晝夜溫差 > 8℃
  const tempRange = today.tempMax - today.tempMin;
  if (tempRange > 8) {
    items.push({
      kind: "outfit",
      title: "外套備一件",
      text:
        `晝夜溫差大（約 ${Math.round(tempRange)}°C，${Math.round(today.tempMin)}–${Math.round(today.tempMax)}°C），建議備一件外套，方便隨時增減衣物。`,
      tone: "neutral",
    });
  }

  // 表：最高溫 ≤ 10℃（防寒）
  if (today.tempMax <= 10) {
    items.push({
      kind: "outfit",
      title: "做好防寒",
      text: "氣溫偏低，建議厚外套、圍巾、手套，海風吹來體感會更冷。",
      tone: "neutral",
    });
  } else if (today.tempMax <= 18) {
    // 補充：10–18℃ 也提示，但用戶表格 ≤10℃ 為強制級
    items.push({
      kind: "outfit",
      title: "防風外套",
      text: "氣溫偏涼，建議洋蔥式穿法，外套以防風或薄羽絨為佳。",
      tone: "neutral",
    });
  }

  // 表：高溫 ≥32℃（穿搭：輕薄透氣）
  if (today.tempMax >= 32) {
    items.push({
      kind: "outfit",
      title: "輕薄透氣",
      text: "氣溫偏高，建議穿淺色、透氣、吸汗衣物；避免黑色、厚布料。",
      tone: "neutral",
    });
  }

  // 表：小雨（路面濕滑） + 中雨（防水外套 + 雨衣）
  const anyRainNow = isRainyCode(current.weatherCode);
  const anyRainToday = isRainyCode(today.weatherCode);
  if (anyRainNow || anyRainToday) {
    const heavy = isHeavyRain(current.weatherCode) || isHeavyRain(today.weatherCode);
    if (heavy && bf.level >= 5) {
      items.push({
        kind: "outfit",
        title: "防水外套",
        text: "風雨較大，建議穿防水外套與防滑鞋；布鞋、帆布鞋容易浸濕。",
        tone: "warn",
      });
    } else if (isLightRain(current.weatherCode) || isLightRain(today.weatherCode)) {
      items.push({
        kind: "outfit",
        title: "防滑鞋",
        text: "有小雨，路面濕滑，走路請留意腳步、避免奔跑。",
        tone: "neutral",
      });
    }
  }

  /* =======================================================
   * 二、遊玩安排 plan
   * ======================================================*/

  // 表：降水機率 ≥60%
  if (
    today.precipitationProbability >= 60 &&
    !isThunderCode(today.weatherCode) &&
    !isHeavyRain(today.weatherCode)
  ) {
    items.push({
      kind: "plan",
      title: "大概率會下雨",
      text:
        "降雨機率高，優先選擇室內場館（如澎湖生活博物館、篤行十村、馬公市區古蹟），戶外爬山、海邊遊玩建議延後。",
      tone: "warn",
    });
  }

  // 表：小雨（露天體驗較差）
  if (isLightRain(current.weatherCode) || isLightRain(today.weatherCode)) {
    items.push({
      kind: "plan",
      title: "露天項目體驗差",
      text: "有小雨，露天拍照、露天空間遊玩體驗較差；廟埕、騎樓、博物館為較佳替代。",
      tone: "neutral",
    });
  }

  // 表：中到大雨（已在風險提醒出現，此處補充非風險級的替代建議）
  if (
    (isHeavyRain(current.weatherCode) ||
      isHeavyRain(today.weatherCode) ||
      today.precipitation >= 20) &&
    !hasWarnings
  ) {
    items.push({
      kind: "plan",
      title: "不建議戶外遊玩",
      text: "雨勢偏大，遊船、海上活動可能停運；建議改排博物館、美術館、古厝等室內景點。",
      tone: "warn",
    });
  }

  // 表：風力 5–6 級
  if (bf.level >= 5 && bf.level <= 6) {
    items.push({
      kind: "plan",
      title: "風力偏大",
      text:
        `${bf.label}（最高 ${Math.round(today.windSpeedMax)} km/h），海邊遊船、部分露天遊樂項目可能停航停運；跨海大橋車流請留意側風。`,
      tone: "warn",
    });
  }

  // 表：晴朗（適合戶外 + 日出日落）
  if (isClearCode(current.weatherCode) || isClearCode(today.weatherCode)) {
    items.push({
      kind: "plan",
      title: "適合戶外遊覽",
      text:
        "天氣晴好，適合戶外遊覽；適合看日出、看夕陽與跨海大橋海岸線景色。",
      tone: "good",
    });
  }

  // 表：陰天（適合拍人像 + 長時間逛）
  if (isOvercastCode(current.weatherCode)) {
    items.push({
      kind: "plan",
      title: "很適合拍人像",
      text: "光線柔和，很適合拍人像與古榕建築；無曝曬，適合長時間戶外逛遊。",
      tone: "good",
    });
  }

  // 表：霧（不適合觀景）
  if (isFogCode(current.weatherCode) || isFogCode(today.weatherCode)) {
    items.push({
      kind: "plan",
      title: "不適合觀景看海",
      text: "能見度差，不適合觀景看海、看山；夕陽、跨海大橋視野都會大打折扣。",
      tone: "warn",
    });
  }

  // UV ≥5：安排類再補強（單獨防曬物品會出現，安排類強調"避開正午"對齊用戶表"紫外線強"）
  if (today.uvIndexMax >= 8) {
    items.push({
      kind: "plan",
      title: "避開正午曝曬",
      text:
        `紫外線很強（最高 UV ${today.uvIndexMax.toFixed(0)}），建議避開 11:00–14:00 正午時段外出。`,
      tone: "warn",
    });
  }

  // 夕陽時間（附加資訊）
  if (isClearCode(today.weatherCode) || isClearCode(current.weatherCode)) {
    items.push({
      kind: "sunset",
      title: "今日夕陽",
      text: `現場約於 ${formatTimeOnly(today.sunset)} 夕陽西沉，可前往通樑漁港堤岸或跨海大橋白沙端觀賞。`,
      tone: "good",
    });
  }

  /* =======================================================
   * 三、隨身物品 carry
   * ======================================================*/

  // 表：降水機率 ≥60%（雨具：雨傘 / 雨衣）
  if (
    today.precipitationProbability >= 60 ||
    isRainyCode(current.weatherCode)
  ) {
    const heavy =
      today.precipitationProbability >= 80 ||
      isHeavyRain(current.weatherCode) ||
      isHeavyRain(today.weatherCode) ||
      bf.level >= 5;
    items.push({
      kind: "carry",
      title: heavy ? "雨衣（優先）" : "攜帶雨具",
      text: heavy
        ? "風雨偏大，建議攜帶雨衣；澎湖海風強，長柄雨傘容易被吹翻，不建議使用。"
        : "大概率會下雨，盡量攜帶雨具。",
      tone: "neutral",
    });
  } else if (today.precipitationProbability >= 40) {
    // 介於 40~59：折疊傘（用戶未明列，但邊界友好提醒）
    items.push({
      kind: "carry",
      title: "折疊傘",
      text: "有一定降雨可能，建議放一把折疊傘在包包，有備無患。",
      tone: "neutral",
    });
  }

  // 表：高溫 ≥32℃（防曬 + 充足飲水 + 防暑用品）
  if (today.tempMax >= 32) {
    items.push({
      kind: "carry",
      title: "防曬 + 充足飲水",
      text: "氣溫偏高，請備防曬用品、充足飲用水與防暑用品（如冰涼貼、人丹）。",
      tone: "neutral",
    });
  } else if (today.tempMax >= 28) {
    // 28–31：只提飲水，避免重疊
    items.push({
      kind: "carry",
      title: "充足飲水",
      text: "天氣偏熱，隨身攜帶飲用水；古榕樹蔭下雖涼爽仍要避免中暑。",
      tone: "neutral",
    });
  }

  // 表：紫外線指數 ≥5（防曬：防曬霜 + 墨鏡 + 遮陽帽）
  if (today.uvIndexMax >= 5) {
    items.push({
      kind: "carry",
      title: "防曬：乳霜 + 帽 + 鏡",
      text:
        `紫外線強（UV ${today.uvIndexMax.toFixed(0)}，${uvLevelLabel(today.uvIndexMax)}），請備防曬霜、墨鏡、遮陽帽；樹蔭下也要記得補防曬。`,
      tone: "neutral",
    });
  }

  // 表：最高溫 ≤10℃（厚外套 + 圍巾）
  if (today.tempMax <= 10) {
    items.push({
      kind: "carry",
      title: "保暖用品",
      text: "厚外套、圍巾、暖暖包都建議隨身，海風吹來體感會更冷。",
      tone: "neutral",
    });
  }

  // 表：風力 5–6 級（帽子 + 長裙提醒）
  if (bf.level >= 5 && bf.level <= 6) {
    items.push({
      kind: "carry",
      title: "帽子易吹落",
      text: "風大，帽子容易被吹走，建議改戴繫繩帽；避免穿寬鬆長裙、寬管褲。",
      tone: "neutral",
    });
  }

  // 表：大霧（口罩）
  if (isFogCode(current.weatherCode) || isFogCode(today.weatherCode)) {
    items.push({
      kind: "carry",
      title: "口罩",
      text: "能見度差且空氣濕度高，建議配戴口罩並留意呼吸道狀況。",
      tone: "neutral",
    });
  }

  return items;
}

/** 濕度 → 人話描述（避免顯示「相對濕度 75%」這種術語） */
export function humidityHumanize(rh: number): string {
  if (rh < 40) return "空氣偏乾";
  if (rh < 60) return "舒適乾爽";
  if (rh < 75) return "稍有悶感";
  if (rh < 85) return "潮濕悶熱";
  return "非常潮濕";
}

/* ============================================================================
 * 其它 UI 顯示輔助
 * ==========================================================================*/

export function uvLevelLabel(uv: number): string {
  if (uv < 3) return "弱";
  if (uv < 6) return "中等";
  if (uv < 8) return "強";
  if (uv < 11) return "很強";
  return "極強";
}

export function formatTimeOnly(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mi}`;
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}`;
}

/** 計算「現在是幾月」，給季節建議用 */
export function getLocalHour(iso: string): number {
  return new Date(iso).getHours();
}

/* ============================================================================
 * 每日一鍵結論：用於一週預覽每日的「宜出遊 / 留意 / 不建議」標籤
 * ==========================================================================*/

export type DayVerdict = "ideal" | "ok" | "watch" | "avoid";

export interface DaySummary {
  date: string;
  weekday: string;
  verdict: DayVerdict;
  label: string;
  reason: string;
}

export function getDaySummaries(daily: WeatherDaily[]): DaySummary[] {
  return daily.map((d) => {
    const bf = beaufortLevel(d.windSpeedMax);
    const rain = d.precipitationProbability;
    const isThunder = isThunderCode(d.weatherCode);

    // 觸發順序：極端 → 警戒 → 注意 → 良好
    if (isThunder || bf.level >= 7 || rain >= 80) {
      return {
        date: d.date,
        weekday: d.weekday,
        verdict: "avoid",
        label: "建議延期",
        reason:
          bf.level >= 7
            ? `${bf.label}偏強，戶外行程較不適宜`
            : isThunder
              ? "有雷雨發生機率，建議改期"
              : "降雨機率極高，建議改期",
      };
    }
    if (bf.level >= 5 || rain >= 60 || d.precipitation >= 10) {
      return {
        date: d.date,
        weekday: d.weekday,
        verdict: "watch",
        label: "留意天氣",
        reason:
          bf.level >= 5
            ? `${bf.label}，海邊活動留意`
            : rain >= 60
              ? "降雨機率偏高，記得帶傘"
              : "雨勢偏明顯，建議彈性調整",
      };
    }
    if (rain >= 30) {
      return {
        date: d.date,
        weekday: d.weekday,
        verdict: "ok",
        label: "可出遊",
        reason: "降雨機率中等，攜輕便雨具即可",
      };
    }
    return {
      date: d.date,
      weekday: d.weekday,
      verdict: "ideal",
      label: "宜出遊",
      reason:
        d.tempMax >= 30
          ? "天氣佳；記得防曬與補水"
          : d.tempMax <= 18
            ? "天氣佳；海風偏涼，建議薄外套"
            : "風勢平穩、降雨機率低",
    };
  });
}

/** 顯示用的色調 / 圖示（給 UI 套用） */
export function verdictStyle(verdict: DayVerdict): {
  bg: string;
  fg: string;
  emoji: string;
} {
  switch (verdict) {
    case "ideal":
      return { bg: "bg-leaf-100/70", fg: "text-leaf-800", emoji: "✨" };
    case "ok":
      return { bg: "bg-sky-100/70", fg: "text-sky-800", emoji: "🌤️" };
    case "watch":
      return { bg: "bg-amber-100/70", fg: "text-amber-800", emoji: "⚡" };
    case "avoid":
      return { bg: "bg-red-100/70", fg: "text-red-800", emoji: "⛔" };
  }
}