/**
 * 定义了一些组件内共用的类型和方法
 */

import type { TwoScoreItemType } from "./types.js";

export * from "./types.js";
export * from "./gal_type.js";

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
