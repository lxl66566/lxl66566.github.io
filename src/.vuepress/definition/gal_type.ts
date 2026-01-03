// 存放 galgame 相关的类型与方法

import { DateDurationType } from "./types.js";

export enum PlayingStatus {
  PLAYING = "游玩中",
  PAUSED = "中断",
  STOPPED = "已停止",
}

// 每个 galgame item 的类型，用于 galgame list 的生成
export type GalItemInputType = {
  /**
   * 游戏名称
   */
  name: string;
  /**
   * 处理后的游戏名称，用于 v-slot 的名字
   */
  valid_name?: string;
  /**
   * 该游戏的其他可能名称，用于搜索
   */
  other_names?: string[];
  /**
   * 资源或游戏链接
   */
  url?: string;
  /**
   * 推的是否生肉
   */
  namaniku?: boolean;
  /**
   * 作品系列中的次序
   */
  order?: number;
  /**
   * 第几次游玩
   */
  nth_time?: number;
  /**
   * 游玩时长
   */
  use_time?: string;
  /**
   * 游玩状态
   */
  playing_status?: PlayingStatus;
  /**
   * 游玩起止日期
   */
  duration?: DateDurationType;
  /*
   * 作品本身属性
   */
  tag?: {
    /**
     * 是否**不是**严格定义的 galgame
     */
    not_strict?: boolean;
    /**
     * 是否全年龄（没有露点与插入）
     */
    all_ages?: boolean;
    /**
     * 是否血腥（轻度 R18G）
     */
    blood?: boolean;
    /**
     * 是否猎奇（重度 R18G）
     */
    bizarre?: boolean;
    /**
     * 是否惊悚
     */
    thrill?: boolean;
  };
  /**
   * 打分
   */
  score?: {
    /**
     * 剧情分
     */
    story?: number;
    /**
     * 画风分
     */
    visual?: number;
    /**
     * 程序分
     */
    program?: number;
    /**
     * 感染力
     */
    thrill?: number;
  };
};

/**
 * 用于机器的 GalItemType
 */
export type GalItemType = {
  [K in keyof GalItemInputType]: K extends "duration"
    ? {
        start?: Date;
        end?: Date;
      }
    : GalItemType[K];
};
