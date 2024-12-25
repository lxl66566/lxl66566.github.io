/**
 * 扩展 Date 类，添加 formatDate 方法
 */
declare global {
  interface Date {
    formatDate(): string;
  }
}

Date.prototype.formatDate = function (): string {
  return this.toISOString().slice(0, 10);
};

// 导出扩展后的 Date 类
export {};
