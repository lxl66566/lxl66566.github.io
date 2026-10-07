// 存放 speedup（语音加速）相关的类型

export type SpeedupItemType = {
  /**
   * 游戏名（一行动态可能对应多个游戏）
   */
  names: string[];
  /**
   * 插槽唯一标识
   */
  valid_name: string;
  /**
   * 游戏引擎
   */
  engine?: string;
  /**
   * 存档格式
   */
  save_format?: string;
  /**
   * 是否成功拆包加速；null 表示未知
   */
  speedupable: boolean | null;
};
