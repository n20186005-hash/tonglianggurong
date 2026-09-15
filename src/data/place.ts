/**
 * 單景點 SEO 實體綁定配置變數
 *
 * 所有頁面與結構化資料皆共用此檔，作為「單一真實來源」。
 * 欄位說明見 doc.md 第十七節「單景點 SEO 實體綁定配置變數表」。
 */
export const place = {
  // --- 基本識別 ---
  name: "通樑古榕",
  officialEnglishName: "Tongliang Great Banyan",
  brandName: "Tongliang Gurong",
  shortName: "Tongliang Gurong",
  tagline: "一棵樹，長成一片森林",

  alternateNames: [
    "通梁古榕",
    "通樑保安宮古榕",
    "澎湖通樑古榕",
    "澎湖古榕",
    "澎湖榕樹",
    "通樑保安宮",
    "澎湖保安宮",
    "Tongliang Great Banyan",
    "Tongliang Gurong",
    "Tongliang Banyan Tree",
    "Tongliang Ancient Banyan",
  ],

  // --- 地理位置 ---
  address: "澎湖縣白沙鄉通樑村149號",
  addressEn: "Tongliang Village, Baisha Township, Penghu County 884, Taiwan",
  plusCode: "MH44+JR Tongliang Village, 白沙鄉澎湖縣台灣",
  phone: "+886 6 921 6521",
  phoneRaw: "88669216521",
  addressParts: {
    streetAddress: "通樑村149號",
    addressLocality: "白沙鄉",
    addressRegion: "澎湖縣",
    addressCountry: "TW",
  },
  cityName: "白沙鄉",
  cityNameEn: "Baisha Township",
  stateProvince: "澎湖縣",
  stateProvinceEn: "Penghu County",
  countryName: "台灣",
  countryNameEn: "Taiwan",
  countryCode2: "TW",
  postalCode: "884",

  coordinates: {
    latitude: 23.6566132,
    longitude: 119.5570153,
  },

  // --- Google Maps 連結（保留所有外部連結） ---
  /** Google Maps 地點頁（完整版，含評論、星級） */
  googleMapsUrl:
    "https://www.google.com/maps/place/Tongliang+Great+Banyan/@23.6566132,119.5570153,17z/data=!3m1!4b1!4m6!3m5!1s0x346c5cb044844859:0xc0b4ebc69bfa29ad!8m2!3d23.6566132!4d119.5570153!16s%2Fg%2F1tj3htfj",
  /** Google Maps 短網址（用於分享 / 評價區塊入口） */
  mapsShareUrl: "https://maps.app.goo.gl/gbyG9GsKQYJZhkEdA",
  /** Google Maps 評論入口（地點頁 + 錨點至評論） */
  mapsReviewsUrl:
    "https://www.google.com/maps/place/Tongliang+Great+Banyan/@23.6566132,119.5570153,17z/data=!3m1!4b1!4m6!3m5!1s0x346c5cb044844859:0xc0b4ebc69bfa29ad!8m2!3d23.6566132!4d119.5570153!16s%2Fg%2F1tj3htfj",
  /** Google Maps 路線規劃 */
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=23.6566132,119.5570153",

  // --- 權威外部連結 ---
  /** 台灣交通部觀光署英文頁（Tongliang Great Banyan 條目） */
  govtTourismUrl: "https://eng.taiwan.net.tw/m1.aspx?id=657&sNo=0002016",
  /** 澎湖國家風景區管理處頁面 */
  penghuNsaUrl:
    "https://www.penghu-nsa.gov.tw/ScenicSpotDetail.aspx?Cond=46d40746-2dc0-4bf5-9d41-736200364654&DistrictCategory=ef9346dc-0956-406d-bb98-768c416e35f4",
} as const;

export const site = {
  url: "https://tonglianggurong.com",
  name: "通樑古榕",
  brandEnglish: "Tongliang Gurong",
  locale: "zh-Hant-TW",
  contactEmail: "hello@tonglianggurong.com",
} as const;