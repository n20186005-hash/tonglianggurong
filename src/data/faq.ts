export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "通樑古榕需要門票嗎？",
    answer:
      "通樑古榕位於通樑保安宮廟埕前，是免費開放的公共空間，沒有門票費用。廟方偶有收受隨喜香油，用以維護古樹與廟宇，請自行衡量。",
  },
  {
    question: "通樑古榕值得專程前往嗎？",
    answer:
      "取決於行程方向。若你正在規劃澎湖北環或前往西嶼，通樑古榕幾乎一定順路，非常值得停留 20 到 40 分鐘。它與跨海大橋一橋之隔，是拍照、吃冰、避開烈日的最佳中繼點。如果行程完全集中在馬公市區，則不建議專程往返。",
  },
  {
    question: "建議停留多久？",
    answer:
      "快速約 20 分鐘（走過氣根長廊、看保安宮、拍幾張照）；舒適約 40 分鐘（加上仙人掌冰）；慢遊約 1 小時（細看支柱根與人工支撐，搭配跨海大橋一起走）。",
  },
  {
    question: "古榕真的是同一棵樹嗎？",
    answer:
      "是的。多數看似獨立的「樹幹」其實是同一株榕樹的支柱根。氣根從枝條下垂、落地後逐漸木質化並加粗，形成能承重的新支柱，這就是熱帶至亞熱帶海岸常見的「獨木成林」策略。",
  },
  {
    question: "樹齡到底是 200 年還是 300 年？",
    answer:
      "兩種說法都廣為流傳，也都缺乏可考的確切起點。與其糾結精確數字，不如理解為「至少兩、三百年的老樹」——這已足以說明它在澎湖自然與人文史上的份量。",
  },
  {
    question: "可以推嬰兒車或輪椅嗎？",
    answer:
      "可以，但建議先洽詢保安宮管理委員會確認當日動線與廁所位置。廟埕地面多為平面，遮蔭區與古樹主景區之間可能有少許階梯，可改走平緩的廟埕前段。我們另有<a href=\"/itinerary/\">低體力無障礙路線</a>整理。",
  },
  {
    question: "附近有洗手間嗎？",
    answer:
      "通樑保安宮周邊與跨海大橋兩端休憩區通常設有公共洗手間，部分流動洗手間僅於觀光旺季開放。古榕主樹蔭下為開放空間、無獨立洗手間設施，建議於出發前或返程途中使用。",
  },
  {
    question: "可以和跨海大橋一起玩嗎？",
    answer:
      "非常推薦。通樑古榕距離澎湖跨海大橋白沙端約 1 分鐘車程，兩者可以安排在一起，多數旅客會在這裡停留 30 至 60 分鐘。完整北環行程請見<a href=\"/north-loop-itinerary/\">澎湖北環一日行程</a>。",
  },
  {
    question: "雨天適合去嗎？",
    answer:
      "雨天仍可前往，但安全起見建議避開雷陣雨期間。古榕樹冠的遮蔽效果有限，攜帶輕便雨具為佳；氣象與降雨機率請參考首頁的「即時天氣」與<a href=\"/seasonal-strategy/\">季度遊覽策略</a>。",
  },
  {
    question: "最新開放情況在哪裡看？",
    answer:
      "通樑古榕為開放式公共空間，無固定休假日。建議透過 Google Maps 查看「現場照片」、使用者評論與即時路況，作為當天是否適合前往的參考。",
  },
  {
    question: "今天會下雨嗎？需要帶傘嗎？",
    answer:
      "首頁「即時氣象」會顯示今天降雨機率與七日預報。一般而言，機率 30% 以下多數時間不需撐傘；機率超過 60% 建議攜帶雨具。澎湖東北季風強勁，傘具建議選用可抗風的款式。",
  },
  {
    question: "電動車能在古榕附近充電嗎？",
    answer:
      "目前通樑古榕周邊未設常設公共充電樁。建議於馬公市區或西嶼充電後再出發，並保留 30–50 公里的續航緩衝。常見規格為 SAE J1772（慢充）與 CCS1（快充），請依車輛規格選擇。",
  },
  {
    question: "什麼季節最適合去？",
    answer:
      "氣候與人潮綜合考量下，<strong>4 月至 6 月</strong>最為推薦，氣溫適中、海況穩定、人流尚未進入暑假高峰。詳細 12 月氣候分析請見<a href=\"/seasonal-strategy/\">季度遊覽策略</a>。",
  },
  {
    question: "澎湖東北季風對古榕有影響嗎？",
    answer:
      "有。每年 10 月至翌年 3 月，澎湖受東北季風影響，跨海大橋與古榕樹下風切明顯。對古榕而言，強風同時是考驗與助力：促使根系加深、向四周擴展，但也讓淺層氣根容易折斷。冬季前往請特別注意防風保暖。",
  },
];

interface FAQPageSchema {
  "@context": string;
  "@type": string;
  mainEntity: Array<{
    "@type": "Question";
    acceptedAnswer: { "@type": "Answer"; text: string };
  }>;
}

export function faqSchema(items: FAQItem[]): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question" as const,
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: it.answer,
      },
    })),
  };
}