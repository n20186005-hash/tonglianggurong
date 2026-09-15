import { place } from "./place";

/**
 * 谷歌地圖評價資料（顯示於頁面，不進入 JSON-LD，避免 Google 判定違規）
 *
 * - 數據來源：Google Maps（谷歌地圖）用戶評價
 * - 同步時間：2026 年 9 月
 * - 顯示位置：評價區塊（含小字來源、查看按鈕）
 * - 注意：這些數值只在前端顯示，不寫入結構化資料 aggregateRating
 */

export const googleReviews = {
  rating: 4.4,
  reviewCount: 14737,
  /** 同步年月字串（用於頁面顯示） */
  syncMonth: "2026 年 9 月",
  /** ISO 同步日期（給機器讀取用） */
  syncDate: "2026-09",
} as const;

/** 評價區塊顯示用的入口連結（Google Maps 地點頁 + 評論錨點） */
export const reviewsEntryUrl = place.mapsShareUrl;

/** 評價區塊「小字」來源說明（顯示於評分下一行） */
export const reviewsFootnote =
  `評分與評價數同步自谷歌地圖（Google Maps）用戶評價 · ${googleReviews.syncMonth} · ` +
  `<a href="${reviewsEntryUrl}" target="_blank" rel="noopener noreferrer" class="underline hover:text-temple-700">點擊查看谷歌地圖全部評價↗</a>`;

/** 評價區塊「來源說明」（位於評分下方、按鈕上方） */
export const reviewsSourceNote =
  `同步自 Google 地圖用戶評價，同步時間 ${googleReviews.syncMonth}；` +
  `版權歸原作者與 Google 地圖所有`;

/** 評價區塊按鈕文字 */
export const reviewsButtonLabel = "在谷歌地圖查看全部評價";

/** 資料來源頁條目：評價來源 */
export const sourcesReviewEntry = {
  name: "Google 地圖用戶評價（同步時間 2026 年 9 月）",
  url: reviewsEntryUrl,
};