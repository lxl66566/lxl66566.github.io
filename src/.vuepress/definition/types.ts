/**
 * Interface representing a TwoScoreItem, each item has two score.
 */
export interface TwoScoreItemType {
  /**
   * a 分
   */
  aScore: number;
  /**
   * b 分
   */
  bScore: number;
}

/**
 * Interface representing an AvItem.
 */
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
}

interface Link {
  text: string;
  url: string;
}

// 用于 ArticleCell 组件的 box 的类型，每个 Box 里有许多链接。
export interface ArticleCellBoxType {
  links: Link[];
  field?: string;
}
