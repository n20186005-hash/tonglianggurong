/**
 * 季度遊覽策略表
 *
 * - 氣象、水文、節慶與人流綜合分析
 * - 氣象與風力資料以中央氣象署（CWA）澎湖測站 30 年常年氣候為基礎
 * - 月份排序由 1 月至 12 月，方便旅客依月對照
 *
 * 注意：使用者原文提及 NOAA 與 FWC（美國佛州漁業及野生動物研究所），
 * 由於本站為澎湖（台灣）景點，故以**中央氣象署與在地單位**為資料主體，
 * 並保留「氣象、海洋／水體、野生動物與人潮」四面向的綜合分析框架。
 */

export interface SeasonalMonth {
  /** 1-12 */
  month: number;
  /** 月份中文短稱 */
  monthLabel: string;
  /** 平均氣溫（°C） */
  avgTemp: number;
  /** 平均最高 / 最低氣溫（°C） */
  avgHigh: number;
  avgLow: number;
  /** 平均月降雨量（mm） */
  rainfallMm: number;
  /** 平均降雨日數 */
  rainyDays: number;
  /** 平均最大風速（km/h） */
  avgWindMax: number;
  /** 蒲福風級中位描述 */
  windLevel: string;
  /** 海況（澎湖海域概況） */
  seaCondition: string;
  /** 適合指數（1-5，5 為最推薦） */
  visitScore: number;
  /** 適合指數的視覺色調 */
  scoreTone: "leaf" | "temple" | "neutral";
  /** 推薦與注意事項 */
  recommendation: string;
  /** 節慶、動植物或天文特色 */
  highlights: string[];
}

export const seasonalMonths: SeasonalMonth[] = [
  {
    month: 1,
    monthLabel: "1 月",
    avgTemp: 16.5,
    avgHigh: 18.7,
    avgLow: 14.4,
    rainfallMm: 21.0,
    rainyDays: 6,
    avgWindMax: 55,
    windLevel: "疾風至大風",
    seaCondition: "東北季風強烈，海面白浪明顯；水溫約 18–20°C，能見度受渾流影響較低，水質清澈度中等",
    visitScore: 2,
    scoreTone: "neutral",
    recommendation:
      "風大、氣溫偏低，適合有防風準備的候鳥觀察與古榕人文行程，不建議海上活動。",
    highlights: [
      "冬候鳥群聚高峰期（黑鸌、蒼燕鷗、小水鴨）",
      "澎湖燈會前夕、年貨街",
      "跨海大橋風切與東北季風體驗",
      "水質：冷水期沿岸藻類生長緩慢，能見度約 5–8 公尺",
    ],
  },
  {
    month: 2,
    monthLabel: "2 月",
    avgTemp: 17.2,
    avgHigh: 19.5,
    avgLow: 15.0,
    rainfallMm: 36.0,
    rainyDays: 7,
    avgWindMax: 53,
    windLevel: "疾風至大風",
    seaCondition: "東北季風仍強，海域能見度受波浪影響；水溫約 18–19°C",
    visitScore: 2,
    scoreTone: "neutral",
    recommendation:
      "春節期間人潮集中，建議避開正月初二至初五，並提前 2–4 週預訂住宿。",
    highlights: [
      "澎湖燈會（外垵漁火、馬公市主燈）",
      "元宵乞龜民俗活動",
      "冬末海菜季節（紫菜、石花菜盛產）",
      "野生動物：東北季風過境猛禽（遊隼、紅隼）觀察",
    ],
  },
  {
    month: 3,
    monthLabel: "3 月",
    avgTemp: 19.0,
    avgHigh: 21.6,
    avgLow: 16.4,
    rainfallMm: 48.0,
    rainyDays: 9,
    avgWindMax: 48,
    windLevel: "清風至強風",
    seaCondition: "東北季風漸緩，海況開始穩定；水溫約 20–22°C，能見度提升至 8–12 公尺",
    visitScore: 3,
    scoreTone: "neutral",
    recommendation:
      "風速漸緩、人流尚未進入旺季，是喜愛靜謐、海岸觀察旅客的好選擇。",
    highlights: [
      "綠蠵龜產卵季前夕（成龜陸續洄游至望安、七美海域）",
      "海菜採收尾聲、珊瑚產卵季（3 月前後滿潮後）",
      "海洋水質：春季溶氧量回升，珊瑚蟲活動活躍",
      "野生動物：白頭翁、綠繡眼進入繁殖期鳴唱高峰",
    ],
  },
  {
    month: 4,
    monthLabel: "4 月",
    avgTemp: 22.3,
    avgHigh: 25.0,
    avgLow: 19.7,
    rainfallMm: 75.0,
    rainyDays: 10,
    avgWindMax: 38,
    windLevel: "和風至清風",
    seaCondition: "海面漸趨平靜，水溫 23–25°C，能見度 10–15 公尺，全年水質最佳時段之一",
    visitScore: 4,
    scoreTone: "leaf",
    recommendation:
      "氣候溫和、能見度佳，適合賞花、海岸線騎行；建議避開清明連假人潮。",
    highlights: [
      "天人菊、澎湖仙人掌盛開花季",
      "澎湖國際海上花火節首場（約 4 月中下旬開幕）",
      "綠蠵龜產卵期開啟（望安島保護區夜間觀察）",
      "水質：春季無明顯陸源排放，沿岸珊瑚覆蓋度指標最高",
      "野生動物：燕鷗抵達、蒼燕鷗築巢高峰",
    ],
  },
  {
    month: 5,
    monthLabel: "5 月",
    avgTemp: 24.8,
    avgHigh: 27.6,
    avgLow: 22.3,
    rainfallMm: 110.0,
    rainyDays: 12,
    avgWindMax: 30,
    windLevel: "微風至和風",
    seaCondition: "海況平穩，水溫 25–27°C，適合浮潛與潮間帶觀察；午後雷陣雨後能見度暫降",
    visitScore: 4,
    scoreTone: "leaf",
    recommendation:
      "梅雨季開始，建議攜帶輕便雨具；午後陣雨後通樑古榕空氣更清新。",
    highlights: [
      "天人菊盛開滿山黃金景觀",
      "綠蠵龜產卵與孵化期（夜間導覽需事先申請）",
      "澎湖海灣旅遊季、SUP 立槳水域活動高峰",
      "海洋水質：溶氧量 5–7 mg/L，屬良好級別；午後暴雨後沿岸濁度升高",
      "野生動物：螃蟹、寄居蟹在潮間帶活躍",
    ],
  },
  {
    month: 6,
    monthLabel: "6 月",
    avgTemp: 27.0,
    avgHigh: 29.7,
    avgLow: 24.6,
    rainfallMm: 165.0,
    rainyDays: 14,
    avgWindMax: 26,
    windLevel: "微風",
    seaCondition: "西南氣流漸起，海面平穩偏暖；水溫 27–29°C，熱帶低氣壓前後能見度波動大",
    visitScore: 4,
    scoreTone: "leaf",
    recommendation:
      "氣溫升高、日照強，建議清晨或傍晚前往通樑古榕，避開正午烈日曝曬。",
    highlights: [
      "澎湖海洋地質季（柱狀玄武岩、海蝕洞主題活動）",
      "海葡萄季節（馬公、西嶼沿海潮間帶盛產）",
      "燕鷗繁殖季（貓嶼、雞善嶼等無人島）",
      "水質：西南氣流帶來外海水，能見度約 8–12 公尺；颱風前後請避開海上活動",
      "野生動物：綠蠵龜幼龜孵化（6 月下旬至 8 月）",
    ],
  },
  {
    month: 7,
    monthLabel: "7 月",
    avgTemp: 28.4,
    avgHigh: 31.1,
    avgLow: 26.0,
    rainfallMm: 175.0,
    rainyDays: 13,
    avgWindMax: 28,
    windLevel: "微風至和風",
    seaCondition: "海況平穩，水溫 28–30°C；午後熱對流旺盛，短延時雷陣雨頻繁",
    visitScore: 3,
    scoreTone: "neutral",
    recommendation:
      "暑假旺季，建議提前 3–4 週預訂住宿；注意防曬、補水與正午避蔭。",
    highlights: [
      "澎湖國際海上花火節（週一與週四晚間）",
      "學子海洋營隊、潮間帶生態調查活動",
      "玄武岩地形觀察（大菓葉、池西岩瀑退潮最美）",
      "水質：高溫季節藻華風險提升，部分內灣能見度下降至 5 公尺以內",
      "野生動物：獨角仙成蟲羽化，古榕周邊夜間誘燈可觀察",
    ],
  },
  {
    month: 8,
    monthLabel: "8 月",
    avgTemp: 28.2,
    avgHigh: 30.9,
    avgLow: 25.9,
    rainfallMm: 200.0,
    rainyDays: 15,
    avgWindMax: 28,
    windLevel: "微風至和風",
    seaCondition: "颱風潛勢期，海況變化劇烈；水溫 28–30°C，颱風過後渾流擾動能見度",
    visitScore: 3,
    scoreTone: "neutral",
    recommendation:
      "颱風季，出發前 24–48 小時請確認氣象、船班與航班；建議投保旅遊不便險。",
    highlights: [
      "中元節普渡祭祀活動（澎湖特殊的「牽罟」與漁村祭典）",
      "海廢監測行動（淨灘、海岸監測志工）",
      "潮間帶觀察（退潮時可見陽燧足、海參、章魚）",
      "水質：颱風過後 1–2 日海水混濁，水上活動應暫停；待恢復後水質清澈",
      "野生動物：赤蠵龜、欖蠵龜偶有被記錄於北環海域",
    ],
  },
  {
    month: 9,
    monthLabel: "9 月",
    avgTemp: 27.0,
    avgHigh: 29.7,
    avgLow: 24.6,
    rainfallMm: 110.0,
    rainyDays: 9,
    avgWindMax: 36,
    windLevel: "和風至清風",
    seaCondition: "東北季風漸起，海面起伏加大；水溫回落至 26–28°C，能見度回升",
    visitScore: 3,
    scoreTone: "neutral",
    recommendation:
      "暑假尾聲、人潮漸減；秋初颱風與東北季風交替，出發前請持續關注氣象預報。",
    highlights: [
      "天人菊尾聲、鹽地植物結果期",
      "海鳥過境觀察（灰面鵟鷹、赤腹鷹南下過境）",
      "秋蟹季節（潮間帶扇形蟹、絨毛近方蟹活躍）",
      "海洋水質：颱風季結束，能見度回升至 10–14 公尺，珊瑚觀察恢復",
      "野生動物：東北季風前鋒過境帶來稀有迷鳥記錄",
    ],
  },
  {
    month: 10,
    monthLabel: "10 月",
    avgTemp: 24.5,
    avgHigh: 27.0,
    avgLow: 22.2,
    rainfallMm: 35.0,
    rainyDays: 5,
    avgWindMax: 50,
    windLevel: "清風至強風",
    seaCondition: "東北季風確立，海面起伏大；水溫 23–25°C，風大浪高不建議淺水活動",
    visitScore: 3,
    scoreTone: "neutral",
    recommendation:
      "秋高氣爽但風速漸增，適合有防風準備的人文與陸地生態行程；海上活動需評估。",
    highlights: [
      "菊島海鮮節（牡蠣、石斑、紫菜季開跑）",
      "候鳥過境（灰面鵟鷹、赤腹鷹、鶇科鳥類）",
      "風力活動體驗（風帆船、風箏衝浪季）",
      "水質：東北季風攪動底層沉積物，近岸能見度 5–8 公尺",
      "野生動物：燕鷗開始南遷，白頷燕鷗群可見於跨海大橋兩端",
    ],
  },
  {
    month: 11,
    monthLabel: "11 月",
    avgTemp: 21.6,
    avgHigh: 23.9,
    avgLow: 19.4,
    rainfallMm: 25.0,
    rainyDays: 4,
    avgWindMax: 55,
    windLevel: "疾風至大風",
    seaCondition: "東北季風強勁，跨海大橋風切明顯；水溫約 20–22°C",
    visitScore: 2,
    scoreTone: "neutral",
    recommendation:
      "風速大、氣溫轉涼，建議穿防風外套；屬於淡季人潮少，適合人文深度參訪。",
    highlights: [
      "冬候鳥季開啟（小水鴨、尖尾鴨、黑腹濱鷸於潮口聚集）",
      "海菜採集季（紫菜、石花菜、海蘆筍開始生長）",
      "在地文創市集、馬公市眷村文化活動",
      "水質：冬季冷水期水質穩定，但因波浪混濁能見度 4–7 公尺",
      "野生動物：東北季風過境猛禽持續，遊隼、澤鵟可見",
    ],
  },
  {
    month: 12,
    monthLabel: "12 月",
    avgTemp: 18.4,
    avgHigh: 20.5,
    avgLow: 16.4,
    rainfallMm: 22.0,
    rainyDays: 5,
    avgWindMax: 56,
    windLevel: "疾風至大風",
    seaCondition: "東北季風最強，海面與沿岸風切明顯；水溫 17–19°C，全年最冷",
    visitScore: 2,
    scoreTone: "neutral",
    recommendation:
      "氣溫最低、風速最強，需洋蔥式穿法加防風外套；屬於觀光淡季，古榕參訪品質佳。",
    highlights: [
      "冬至湯圓活動、澎湖年貨市集",
      "冬候鳥高峰（黑鸌、鳳頭潛鴨、小辮鴴於潮間帶）",
      "海風氣象觀察（跨海大橋強風體驗、海浪拍岸）",
      "水質：全年水溫最低，魚群種類減少，但溶氧量為全年最高",
      "野生動物：古榕樹冠層夜間可觀察東方角鴞等冬候鳥",
    ],
  },
];

/** 季節性人潮概覽（給頁面摘要） */
export const seasonalSummary = {
  bestMonths: [4, 5, 6],
  shoulderMonths: [3, 7, 9, 10],
  offMonths: [1, 2, 8, 11, 12],
};

/** 從 1-5 的 visitScore 映射到色調 class */
export function scoreColor(score: number): {
  fill: string;
  text: string;
} {
  if (score >= 4) return { fill: "bg-leaf-100", text: "text-leaf-700" };
  if (score >= 3) return { fill: "bg-sand-100", text: "text-temple-700" };
  return { fill: "bg-banyan-100", text: "text-banyan-700" };
}

/** 視覺化的 12 月卡片顯示用星等 */
export function scoreDots(score: number): string {
  return "●●●●●".slice(0, score) + "○○○○○".slice(score);
}