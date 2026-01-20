/**
 * 定义了一些组件内共用的类型和方法
 */

import type { DateDurationType, DateType, TwoScoreItemType } from "./types.js";

export * from "./anime_type.js";
export * from "./book_type.js";
export * from "./comic_item.js";
export * from "./gal_type.js";
export * from "./job_type.js";
export * from "./types.js";

/**
 * 比较两个 TwoScoreItemType，用于 sort 的输入。
 * @param a 一个 TwoScoreItemType
 * @param b 一个 TwoScoreItemType
 * @returns 比较结果
 */
export function TwoScoreCompare(a: TwoScoreItemType, b: TwoScoreItemType): number {
  const aScore = a.aScore + a.bScore;
  const bScore = b.aScore + b.bScore;
  return bScore - aScore || b.aScore - a.aScore;
}

export function DateCompare(a: DateType, b: DateType): number {
  return a.localeCompare(b);
}

/**
 * 比较两个 DateDurationType，用于 sort 的输入。按照 end 日期顺序排序。
 */
export function DateDurationCompare(a: DateDurationType, b: DateDurationType): number {
  if (a.end && b.end) {
    return a.end.localeCompare(b.end);
  }
  if (a.end) {
    return -1;
  }
  if (b.end) {
    return 1;
  }
  return 0;
}
