import { DateType } from "./types.js";

export type JobItemInputType = {
  /**
   * 公司名字
   */
  name: string;
  /**
   * 岗位
   */
  job: string;
  /**
   * 投递渠道
   */
  by: string;
  /**
   * 投递时间
   */
  time: DateType;
  /**
   * 投递结果
   */
  result: string;
  /**
   * 是否有 offer
   */
  offer?: boolean;
};
