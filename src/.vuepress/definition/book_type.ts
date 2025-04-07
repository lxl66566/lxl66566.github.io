// 存放 book 相关的类型与方法

export type ReadingStatus =
  | { kind: "在读"; extra?: string }
  | { kind: "等待连载"; extra?: string }
  | { kind: "中断"; extra?: string }
  | { kind: "已放弃"; extra?: string }
  | { kind: "已停更"; extra?: string };

export type BookDuration =
  | {
      start?: string;
      end?: string;
    }
  | string;

// 黄色程度
export enum HLevel {
  // 无任何 R18 内容
  NONE = "无",
  // 无任何 R18 细节描写，且 R18 场景在文中是微量的可有可无的部分
  LITE = "普通",
  // 不以 R18 内容为主
  LOW = "轻度",
  // 黄色为作品的主要基调
  MEDIUM = "中度",
  // 黄色占据作品的绝大部分篇幅
  HIGH = "重度",
}

// 每个 book item 的类型，用于 book list 的生成
export type BookItemInputType = {
  /**
   * 书名
   */
  name: string;
  /**
   * 作者
   */
  author?: string;
  /**
   * 处理后的书名，用于 v-slot 的名字
   */
  valid_name?: string;
  /**
   * 资源或书本链接
   */
  url?: string;
  /**
   * 标签
   */
  tags?: {
    /**
     * 学习相关?
     */
    study?: boolean;
    /**
     * 不是网络小说?
     */
    not_network?: boolean;
    /**
     * 日本轻小说?
     */
    japanese?: boolean;
    /**
     * 生肉?
     */
    namaniku?: boolean;
  };

  /**
   * 黄色程度
   */
  h_level?: HLevel;
  /**
   * 第几次阅读
   */
  nth_time?: number;
  /**
   * 作品系列中的次序
   */
  order?: number;
  /**
   * 阅读时长
   */
  use_time?: string;
  /**
   * 阅读状态
   */
  reading_status?: ReadingStatus;
  /**
   * 阅读起止日期
   */
  duration?: BookDuration;
};
