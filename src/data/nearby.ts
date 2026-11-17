import { images } from "./images";
import type { ImageMetadata } from "astro";

export interface NearbyPlace {
  slug: string;
  name: string;
  english: string;
  image: ImageMetadata;
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Penghu%20Great%20Bridge%20Baisha%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Xiaomen%20Whale%20Cave%20Xiyu%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Daguoye%20Columnar%20Basalt%20Xiyu%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Erkan%20Traditional%20Village%20Xiyu%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Chixi%20Rock%20Waterfall%20Xiyu%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Yuwengdao%20Lighthouse%20Xiyu%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Xiyu%20Western%20Fort%20Penghu%20Taiwan",
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
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Xiyu%20Eastern%20Fort%20Penghu%20Taiwan",
  },
];
