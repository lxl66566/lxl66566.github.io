import { TwoScoreItemType } from "./types";

export interface AvItemType extends TwoScoreItemType {
  /**
   * 番号
   */
  id: string;
  /**
   * 番号名字/类型/标签/评价
   */
  name?: string;
  /**
   * 是否具有 unsensored leak
   */
  u?: boolean;
  /**
   * 是否跳转到另一个非默认链接
   */
  otherlink?: string;
  /**
   * 简评
   */
  say?: string;
}
