export interface NavItem {
  label: string;
  href: string;
  desc?: string;
}

/** 主導覽 */
export const mainNav: NavItem[] = [
  { label: "參觀指南", href: "/visitor-guide/", desc: "值不值得去、看什麼、停留多久" },
  { label: "交通停車", href: "/transportation/", desc: "怎麼去、停車與 Google Maps 導航" },
  { label: "歷史傳說", href: "/history/", desc: "樹齡爭議與保安宮的老榕故事" },
  { label: "氣根生態", href: "/aerial-roots/", desc: "一棵榕樹如何長成一片森林" },
  { label: "保安宮", href: "/baoan-temple/", desc: "古樹與廟宇共生的信仰空間" },
  { label: "拍照指南", href: "/photo-guide/", desc: "氣根長廊與屋脊的取景位置" },
  { label: "路線方案", href: "/itinerary/", desc: "親子 / 攝影 / 無障礙 + 半日全日" },
  { label: "季度策略", href: "/seasonal-strategy/", desc: "12 月氣象與遊覽建議" },
  { label: "附近景點", href: "/nearby-attractions/", desc: "跨海大橋、鯨魚洞與西嶼沿線" },
  { label: "訪客服務", href: "/visitor-services/", desc: "WC / 餐飲 / 住宿 / 加油 / 充電" },
  { label: "科普責任", href: "/science/", desc: "古樹生態與訪客守則" },
];

/** 站內主題入口（首頁錨點連結） */
export const topicNav: NavItem[] = [
  { label: "即時天氣", href: "/#weather-title", desc: "今日與七日預報" },
  { label: "季度策略", href: "/#seasonal-title", desc: "12 月氣象與遊覽建議" },
  { label: "路線方案", href: "/#itinerary-title", desc: "三條針對性 + 通用路線" },
  { label: "服務設施", href: "/#services-title", desc: "WC / 停車 / 餐飲 / 住宿 / 加油 / 充電" },
  { label: "科普與責任", href: "/#science-title", desc: "古樹生態與訪客守則" },
];

/** 頁尾次要連結 */
export const footerNav: NavItem[] = [
  { label: "美食補給", href: "/food/" },
  { label: "半日行程", href: "/half-day-itinerary/" },
  { label: "常見問題", href: "/faq/" },
  { label: "關於本站", href: "/about/" },
  { label: "編輯原則", href: "/editorial-policy/" },
  { label: "更正政策", href: "/corrections/" },
  { label: "資料來源", href: "/sources/" },
  { label: "聯絡我們", href: "/contact/" },
];
