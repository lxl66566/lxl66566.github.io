// 每个 anime item 的类型，用于 anime list 的生成
export type AnimeItemInputType = {
  /**
   * anime 名称
   */
  name: string;
  /**
   * 处理后的 anime 名称，用于 v-slot 的名字
   */
  valid_name?: string;
  /**
   * 是否里番（有露点或插入）
   */
  r18?: boolean;
  /**
   * 番外
   */
  extra?: boolean;
  /**
   * 作品系列中的次序
   */
  order?: number;
  /**
   * 观看次数
   */
  watch_times?: number;
  /**
   * 观看起止日期
   */
  duration?: {
    start?: string;
    end?: string;
  };
};
