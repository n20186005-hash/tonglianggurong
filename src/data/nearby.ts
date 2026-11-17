import { images } from "./images";
import type { ImageMetadata } from "astro";

export interface NearbyPlace {
  slug: string;
  name: string;
  english: string;
  image?: ImageMetadata;
  alt: string;
  order: number;
  driveFromBanyan: string;
  summary: string;
  suggestion: string;
  mapsUrl: string;
}

/** 北環沿線景點，依馬公出發的順路順序排列 */
export const nearbyPlaces: NearbyPlace[] = [
  {
    slug: "penghu-great-bridge",
    name: "澎湖跨海大橋",
    english: "Penghu Great Bridge",
    image: images.nearbyBridge,
    alt: "澎湖跨海大橋橫跨吼門水道 Penghu Great Bridge",
    order: 1,
    driveFromBanyan: "距通樑古榕約 1 分鐘車程",
    summary:
      "連接白沙與西嶼的地標橋樑，就在通樑古榕旁。西嶼端的橋頭拱門是熱門拍照點，橋下吼門水道流速極快。",
    suggestion: "與通樑古榕安排在一起，停車後步行到橋頭拍照即可。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E6%BE%8E%E6%B9%96%E8%B7%A8%E6%B5%B7%E5%A4%A7%E6%A9%8B%20%E7%99%BD%E6%B2%99%E9%84%89%20%E6%BE%8E%E6%B9%96%E7%B8%A3",
  },
  {
    slug: "xiaomen-whale-cave",
    name: "小門鯨魚洞",
    english: "Xiaomen Whale Cave",
    image: images.nearbyWhaleCave,
    alt: "小門嶼鯨魚洞海蝕拱門 Xiaomen Whale Cave",
    order: 2,
    driveFromBanyan: "距通樑古榕約 10 分鐘車程",
    summary:
      "位於西嶼小門嶼的玄武岩海蝕拱門，因外型狀似鯨魚而得名，是欣賞海蝕地形與玄武岩節理的代表點。",
    suggestion: "適合排在跨海大橋之後，步道平緩，來回約 30 分鐘。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E5%B0%8F%E9%96%80%E9%AF%A8%E9%AD%9A%E6%B4%9E%20%E8%A5%BF%E5%B6%BC%E9%84%89%20%E6%BE%8E%E6%B9%96%E7%B8%A3",
  },
  {
    slug: "daguoye-basalt",
    name: "大菓葉柱狀玄武岩",
    english: "Daguoye Columnar Basalt",
    image: images.nearbyDaguoye,
    alt: "大菓葉柱狀玄武岩節理 Daguoye Columnar Basalt",
    order: 3,
    driveFromBanyan: "距通樑古榕約 15 分鐘車程",
    summary:
      "整齊排列的柱狀玄武岩壁，退潮時前方積水會倒映岩柱，是澎湖最上鏡的地質景觀之一。",
    suggestion: "清晨與退潮時最美，適合放在西嶼行程中段。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E8%8F%93%E8%91%89%E6%9F%B1%E7%8B%80%E7%8E%84%E6%AD%A6%E5%B2%A9%20%E8%A5%BF%E5%B6%BC%E9%84%89%20%E6%BE%8E%E6%B9%96%E7%B8%A3",
  },
  {
    slug: "erkan-village",
    name: "二崁聚落",
    english: "Erkan Village",
    image: images.nearbyErkan,
    alt: "二崁聚落傳統咾咕石古厝 Erkan Village",
    order: 4,
    driveFromBanyan: "距通樑古榕約 15 分鐘車程",
    summary:
      "保存完整的澎湖傳統聚落，咾咕石與玄武岩砌成的古厝群，巷弄間有杏仁茶、二崁傳香等在地小店。",
    suggestion: "適合放在西嶼行程，慢慢走逛約 1 小時。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E4%BA%8C%E5%B4%81%E5%82%B3%E7%B5%B1%E8%81%9A%E8%90%BD%20%E8%A5%BF%E5%B6%BC%E9%84%89%20%E6%BE%8E%E6%B9%96%E7%B8%A3",
  },
  {
    slug: "chixi-rock-waterfall",
    name: "池西岩瀑",
    english: "Chixi Columnar Basalt",
    image: images.nearbyChixi,
    alt: "池西岩瀑如瀑布般傾瀉的柱狀玄武岩 Chixi Columnar Basalt",
    order: 5,
    driveFromBanyan: "距通樑古榕約 20 分鐘車程",
    summary:
      "又稱「小池角柱狀玄武岩」，海崖上的玄武岩柱如瀑布般傾瀉；潮汐、浪高與地形限制，會影響安全觀景範圍。",
    suggestion: "先查潮汐、浪況與封閉公告，只從合法且安全的位置賞景。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E6%B1%A0%E8%A5%BF%E5%B2%A9%E7%80%91%20%E5%B0%8F%E6%B1%A0%E8%A7%92%20%E8%A5%BF%E5%B6%BC%E9%84%89%20%E6%BE%8E%E6%B9%96",
  },
  {
    slug: "yuwengdao-lighthouse",
    name: "漁翁島燈塔",
    english: "Yuwengdao Lighthouse",
    image: images.nearbyLighthouse,
    alt: "漁翁島燈塔（西嶼燈塔）白色塔身 Yuwengdao Lighthouse",
    order: 6,
    driveFromBanyan: "距通樑古榕約 25 分鐘車程",
    summary:
      "台灣最早興建的西式燈塔之一，白色塔身佇立在西嶼最南端的草坡上，是北環路線最遠、也最適合收尾的一站。",
    suggestion: "排在北環一日行程最後，傍晚光線柔和最適合拍照。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E6%BC%81%E7%BF%81%E5%B3%B6%E7%87%88%E5%A1%94%20%E5%A4%96%E5%9E%B5%E6%9D%91%20%E8%A5%BF%E5%B6%BC%E9%84%89%20%E6%BE%8E%E6%B9%96",
  },
  {
    slug: "xiyu-west-fort",
    name: "西嶼西臺",
    english: "Xiyu Western Fort",
    image: images.nearbyXiyuWestFort,
    alt: "西嶼西臺國定古蹟砲臺的厚實防禦牆與砲座",
    order: 7,
    driveFromBanyan: "位於西嶼南部，可與燈塔安排同遊",
    summary: "清代海防砲臺，利用厚實的石造防禦工事和地下通道守護澎湖海域，是認識晚清軍事建築的代表性國定古蹟。",
    suggestion: "適合預留 40–60 分鐘觀察砲臺、通道與防禦視線，依現場開放路線參觀。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E8%A5%BF%E5%B6%BC%E8%A5%BF%E8%87%BA%20%E5%A4%96%E5%9E%B5%E6%9D%91%20%E6%BE%8E%E6%B9%96%E7%B8%A3",
  },
  {
    slug: "xiyu-east-fort",
    name: "西嶼東臺",
    english: "Xiyu Eastern Fort",
    image: images.nearbyXiyuEastFort,
    alt: "西嶼東臺古堡歷史砲臺與防禦建築",
    order: 8,
    driveFromBanyan: "位於西嶼東側，可串聯軍事史蹟園區",
    summary: "又稱東臺古堡，清代海防砲臺遺構與後續軍事使用痕跡交疊，能從砲座、掩體與空間配置讀懂澎湖的海防變遷。",
    suggestion: "先核對園區開放範圍，沿合法參觀動線比較東臺與西臺的地勢和防禦布局。",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=%E8%A5%BF%E5%B6%BC%E6%9D%B1%E8%87%BA%20%E8%A5%BF%E5%B6%BC%E9%84%89%20%E6%BE%8E%E6%B9%96%E7%B8%A3",
  },
  { slug:"tongliang-fishing-harbor",name:"通樑漁港",english:"Tongliang Fishing Harbor",image:images.banyanHarbor,alt:"通樑漁港與榕樹前南側堤岸實景",order:9,driveFromBanyan:"古榕周邊可步行抵達",summary:"通樑村的日常漁港，沿堤岸看漁船、港池與聚落如何相依。",suggestion:"從古榕向港口步行，留意漁船作業空間與海風。",mapsUrl:"https://maps.app.goo.gl/NRDhnGBP1Nkc89NF6" },
  { slug:"tongliang-floating-pier",name:"通樑漁港碼頭浮台",english:"Tongliang Harbor Floating Pier",alt:"通樑漁港碼頭浮台現場位置",order:10,driveFromBanyan:"位於通樑漁港周邊",summary:"觀察潮位變化與漁港上下船動線的浮動碼頭設施。",suggestion:"在開放岸邊看浮台結構，不干擾靠泊與裝卸作業。",mapsUrl:"https://maps.app.goo.gl/JL8vYY4BJCPPWSgq5" },
  { slug:"tongliang-community-park",name:"通樑社區公園",english:"Tongliang Community Park",alt:"通樑社區公園現場位置",order:11,driveFromBanyan:"位於通樑村內",summary:"村落中供居民交流與旅人短暫休息的公共綠地，適合觀察社區生活。",suggestion:"以短程散步串聯古榕、村巷與海岸，尊重居民使用。",mapsUrl:"https://maps.app.goo.gl/gzGhHR6xRpakXUEt5" },
  { slug:"tongliang-baoan-temple",name:"通梁保安宮",english:"Tongliang Baoan Temple",image:images.nearbyBaoanTemple,alt:"通梁保安宮廟宇建築實景",order:12,driveFromBanyan:"與通樑古榕相鄰",summary:"通樑聚落重要的民間信仰場域；古榕與廟埕共同形塑村落中心。",suggestion:"觀察廟埕與榕蔭的空間關係，參觀時避開儀式與祭拜動線。",mapsUrl:"https://maps.app.goo.gl/vYmsSodtvGdZ5Lvh8" },
  { slug:"tongliang-seawall",name:"通樑海堤",english:"Tongliang Seawall",image:images.banyanHarbor,alt:"通樑漁港南側海堤及港灣實景",order:13,driveFromBanyan:"通樑村海岸周邊",summary:"防護聚落與港灣的海岸堤防，提供觀看海風、潮位與岸線的角度。",suggestion:"只在安全公共通道停留，強風大浪時不靠近堤緣。",mapsUrl:"https://maps.app.goo.gl/v5E9NwzZeSpu2tuW7" },
  { slug:"penghu-yuhuang-jiusheng-temple",name:"澎湖玉皇九聖宮",english:"Penghu Yuhuang Jiusheng Temple",image:images.nearbyYuhuangJiushengTemple,alt:"澎湖玉皇九聖宮正面雙龍屋脊與廟埕實景",order:14,driveFromBanyan:"通樑與跨海大橋附近",summary:"位於白沙通樑一帶的宗教場所，適合認識海島聚落的多元信仰。",suggestion:"先從廟外看入口與屋脊，入內依廟方開放及參拜規範。",mapsUrl:"https://maps.app.goo.gl/gKEFjL6WcUWtF1TU7" },
  { slug:"old-penghu-bridge-piers",name:"跨海大橋舊四角橋墩",english:"Old Penghu Bridge Piers",image:images.nearbyBridge,alt:"澎湖跨海大橋與吼門水道海面實景，舊橋墩位於相關海域",order:15,driveFromBanyan:"跨海大橋周邊",summary:"吼門水道旁的舊橋遺構，是澎湖跨海交通建設變遷的可見線索。",suggestion:"從合規岸邊或橋頭觀景區遠望，勿踏入潮流湍急水域。",mapsUrl:"https://maps.app.goo.gl/qmJwmTdvpmxY6Xqi9" },
  { slug:"penghu-aquarium",name:"澎湖水族館",english:"Penghu Aquarium",image:images.nearbyPenghuAquarium,alt:"位於白沙鄉岐頭村的澎湖水族館建築",order:16,driveFromBanyan:"位於白沙鄉岐頭村，需搭車前往",summary:"由水產試驗相關設施發展的海洋教育展示館，認識澎湖近海生物。",suggestion:"預留室內參觀時間，先查館方當日售票與休館公告。",mapsUrl:"https://maps.app.goo.gl/qCRu23QHBGor5CZ86" },
  { slug:"rapunzel-lighthouse",name:"長髮公主燈塔",english:"Rapunzel Lighthouse",alt:"Rapunzel Lighthouse 地圖所標示地點",order:17,driveFromBanyan:"位於白沙鄉赤嶼海岸，依專屬地圖導航",summary:"赤紅色塔身繪有童話長髮公主，是講美附近海岸的彩繪拍照地標。",suggestion:"先查地圖近期照片與入口，別與西嶼漁翁島燈塔混淆。",mapsUrl:"https://maps.app.goo.gl/RyRTNWo4MHd9CegS9" },
  { slug:"baisha-swing",name:"白沙鞦韆",english:"Baisha Swing",alt:"白沙鞦韆地圖所標示地點",order:18,driveFromBanyan:"位於白沙鄉鎮海村白沙海園，需搭車前往",summary:"紅色 BAISHA 字樣與木製鞦韆面向海岸，漲退潮時呈現不同的海景構圖。",suggestion:"到場先確認裝置安全與潮位，不在風浪過大時接近海邊。",mapsUrl:"https://maps.app.goo.gl/rwPdeUk9QcC1y1ok9" },
];
