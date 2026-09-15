/**
 * 按人群定制的遊覽方案與通用路線
 *
 * - 三條針對性路線：親子家庭 / 攝影自然 / 低體力無障礙
 * - 兩條通用路線：半日 / 全日
 * - 路線設計原則：避免商業化推廣、以科普與現場觀察為主軸
 */

export interface ItineraryStop {
  /** 順序編號（顯示用） */
  n: string;
  /** 站點名稱 */
  title: string;
  /** 預估停留時間（分鐘） */
  duration: number;
  /** 站點說明 */
  description: string;
}

export interface ItineraryPlan {
  /** 路線代號 */
  id: "family" | "photography" | "accessibility" | "half-day" | "full-day";
  /** 中文標題 */
  title: string;
  /** 英文副標 */
  subtitle: string;
  /** 適用對象 */
  audience: string;
  /** 總時間 */
  totalDuration: string;
  /** 步行距離（公里） */
  distance: string;
  /** 體力需求 1-5 */
  effort: number;
  /** 重點說明 */
  summary: string;
  /** 行程清單 */
  stops: ItineraryStop[];
  /** 貼心提醒 */
  tips: string[];
}

export const itineraries: ItineraryPlan[] = [
  // 三條針對性路線
  {
    id: "family",
    title: "親子家庭路線",
    subtitle: "Family-friendly Loop",
    audience: "5–12 歲孩童、長輩、推嬰兒車",
    totalDuration: "1 小時 30 分鐘",
    distance: "0.6 公里",
    effort: 1,
    summary:
      "以氣根樹蔭為天然遮陽、保安宮廟埕為主要活動區，全程平緩、補給方便，適合學齡前與學齡兒童。",
    stops: [
      {
        n: "01",
        title: "通樑保安宮前集合",
        duration: 10,
        description: "介紹廟宇建築、安全守則與古榕故事（簡化版）。",
      },
      {
        n: "02",
        title: "古榕樹蔭下散步",
        duration: 30,
        description:
          "由家長或導覽志工帶領孩子觀察支柱根、氣根、樹皮紋理；鼓勵孩童觸摸、提問。",
      },
      {
        n: "03",
        title: "找樹洞、找小生物",
        duration: 20,
        description:
          "在安全範圍內尋找樹洞、蜘蛛網、雀鳥，練習安靜觀察與生物辨識。",
      },
      {
        n: "04",
        title: "仙人掌冰時間",
        duration: 20,
        description: "於廟埕周邊攤位享用冰品，補充水分與休息。",
      },
      {
        n: "05",
        title: "拍照小任務",
        duration: 10,
        description: "分配小任務：拍攝樹幹紋理、保安宮屋脊、家族合照。",
      },
    ],
    tips: [
      "古榕樹蔭區可遮陽，但廟埕開闊無遮蔭處，建議攜帶遮陽帽與飲水。",
      "請勿讓孩童攀爬支柱根或拉扯氣根，避免斷裂與生態破壞。",
      "如需哺乳或換尿布，可至廟方詢問是否有合適空間。",
    ],
  },
  {
    id: "photography",
    title: "攝影自然路線",
    subtitle: "Photography & Nature Loop",
    audience: "攝影愛好者、自然觀察者",
    totalDuration: "2 小時 30 分鐘",
    distance: "1.2 公里",
    effort: 3,
    summary:
      "以古榕光影、保安宮屋脊與廟埕人文為主題，分時段、分構圖取景，適合晨昏與自然光場景。",
    stops: [
      {
        n: "01",
        title: "晨光斜射氣根長廊",
        duration: 30,
        description:
          "日出後 1 小時內陽光斜射，穿透樹冠形成光柱；建議廣角與長焦並用。",
      },
      {
        n: "02",
        title: "古榕與保安宮屋脊同框",
        duration: 30,
        description:
          "由廟埕正面取景，捕捉廟宇燕尾脊與翠綠榕葉的對比；注意安全島位置。",
      },
      {
        n: "03",
        title: "支柱根的紋理特寫",
        duration: 30,
        description:
          "使用微距鏡頭拍攝樹皮、氣根痕跡、人造支撐與自然的界線。",
      },
      {
        n: "04",
        title: "廟埕人文紀實",
        duration: 30,
        description:
          "在不打擾前提下，紀錄居民、信眾、攤商於廟埕活動的日常。",
      },
      {
        n: "05",
        title: "黃昏樹冠剪影",
        duration: 30,
        description:
          "日落前 1 小時於橋側取景，捕捉古榕剪影與跨海大橋的遠景層次。",
      },
    ],
    tips: [
      "請避免使用閃光燈對準廟宇神像與信眾，尊重信仰空間。",
      "反光板與腳架請於廟埕外圍使用，避免阻擋通行。",
      "晨昏時段光線變化快，建議提前 30 分鐘到達選定位置。",
    ],
  },
  {
    id: "accessibility",
    title: "低體力無障礙路線",
    subtitle: "Accessibility & Low-Effort Loop",
    audience: "長輩、輪椅使用者、推嬰兒車、孕婦",
    totalDuration: "50 分鐘",
    distance: "0.4 公里",
    effort: 1,
    summary:
      "全程以廟埕平面與遮蔭區為主，避免上下階梯與遠距離步行；可於廟方詢問當日動線。",
    stops: [
      {
        n: "01",
        title: "廟埕集合、行程說明",
        duration: 10,
        description:
          "由廟方或導覽志工說明當日動線、可休息位置與緊急聯絡方式。",
      },
      {
        n: "02",
        title: "樹蔭主景區（廟埕前段）",
        duration: 25,
        description:
          "選擇路面平整、可坐輪椅或推車通過的區域，靜靜觀察氣根與樹冠。",
      },
      {
        n: "03",
        title: "保安宮內部參觀（如開放）",
        duration: 10,
        description:
          "由廟方引導至可通行區域，注意門檻與階梯。",
      },
      {
        n: "04",
        title: "補給與休息",
        duration: 5,
        description: "於攤位附近尋找座位、飲水與簡單補給。",
      },
    ],
    tips: [
      "澎湖夏季高溫，長輩與孩童務必於上午或傍晚前往。",
      "建議於出發前先致電保安宮管理委員會，確認當日動線與廁所位置。",
      "如需輔具租借，可洽詢澎湖縣輔具資源中心。",
    ],
  },
  // 兩條通用路線
  {
    id: "half-day",
    title: "半日精華路線",
    subtitle: "Half-Day Highlight Loop",
    audience: "行程時間約半天（4 小時以內）",
    totalDuration: "3 小時",
    distance: "8 公里",
    effort: 2,
    summary:
      "聚焦北環三個核心點：通樑古榕、跨海大橋、白沙市區，半天即可飽覽精華。",
    stops: [
      {
        n: "01",
        title: "馬公市區出發",
        duration: 40,
        description: "沿 203 縣道往北，經中屯、風車園區作為熱身。",
      },
      {
        n: "02",
        title: "通樑古榕",
        duration: 60,
        description: "氣根樹蔭觀察、保安宮參訪、仙人掌冰補給。",
      },
      {
        n: "03",
        title: "澎湖跨海大橋",
        duration: 30,
        description: "橋面散步、攝影、遠眺西嶼方向。",
      },
      {
        n: "04",
        title: "白沙市區補給",
        duration: 30,
        description: "地方小吃、便利商店補給、加油。",
      },
      {
        n: "05",
        title: "返程",
        duration: 20,
        description: "原路或經 203 縣道返馬公，彈性追加赤崁碼頭或後寮天堂路。",
      },
    ],
    tips: [
      "建議上午 9 點前抵達古榕，避開正午人潮與強光。",
      "跨海大橋風切明顯，步行拍照注意保暖。",
      "半日路線可彈性縮短為 2.5 小時，視當天體力調整。",
    ],
  },
  {
    id: "full-day",
    title: "北環全日深度路線",
    subtitle: "Full-Day North Loop",
    audience: "行程時間一整天、可彈性停點",
    totalDuration: "8 小時",
    distance: "60 公里",
    effort: 4,
    summary:
      "完整走訪澎湖北環：通樑古榕、跨海大橋、小門鯨魚洞、二崁聚落、大菓葉柱狀玄武岩、漁翁島燈塔。",
    stops: [
      {
        n: "01",
        title: "馬公出發 → 中屯 → 通樑古榕",
        duration: 120,
        description: "上午由馬公出發，先抵達通樑古榕享受遮蔭與涼意。",
      },
      {
        n: "02",
        title: "澎湖跨海大橋",
        duration: 30,
        description: "白沙端遠眺、橋面散步。",
      },
      {
        n: "03",
        title: "小門鯨魚洞",
        duration: 60,
        description: "觀察海蝕洞與玄武岩節理。",
      },
      {
        n: "04",
        title: "二崁聚落午餐",
        duration: 90,
        description: "在地小吃、杏仁茶、傳統聚落導覽。",
      },
      {
        n: "05",
        title: "大菓葉柱狀玄武岩",
        duration: 45,
        description: "觀察地質景觀與海岸地形。",
      },
      {
        n: "06",
        title: "漁翁島燈塔",
        duration: 60,
        description: "西嶼海岸線最高點，欣賞夕陽與歷史燈塔建築。",
      },
      {
        n: "07",
        title: "返程",
        duration: 90,
        description: "經跨海大橋返馬公，視體力彈性追加晚餐或夜探。",
      },
    ],
    tips: [
      "全日路線強烈建議騎乘機車或開車，並預留緩衝時間。",
      "午餐選擇以二崁聚落最具特色，但夏季需提前訂位。",
      "返程如遇黃昏，建議於西嶼海岸停留欣賞夕陽，攝影最佳時段為日落前 1 小時。",
    ],
  },
];

export function itineraryById(id: ItineraryPlan["id"]): ItineraryPlan {
  return itineraries.find((p) => p.id === id)!;
}