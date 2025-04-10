---
date: 2022-05-05
icon: terminal
category:
  - 教程
tag:
  - 移动端
---

# 查看手机 cpu 指令集

<!-- prettier-ignore -->
|手段|大小|图片|使用方法|
| :-: | :-: | :-: | :-: |
|一个木函（国内应用商店）|7M|![一个木函](/images/articles/Android_ISA/yigemuhan.jpg)|设备应用-查看设备详细信息|
|CPU X（谷歌商店）|10M|![CPU X](/images/articles/Android_ISA/cpux.jpg)|中央处理器|
|[ADB](./adb.md)（需要电脑）|-|![ADB](/images/articles/Android_ISA/adb.png)|执行`adb shell getprop ro.product.cpu.abi`|

<style lang="scss" scoped>
table {
  max-width: 100%; /* 限制表格最大宽度 */
  overflow-x: auto; /* 必要时出现横向滚动条 */
  border-collapse: collapse; /* 可选，使表格边框更整洁 */
}

td {
  max-width: 100%; /* 限制单元格最大宽度 */
}

td img {
  max-width: 100%; /* 图片最大宽度不超过容器 */
  height: auto; /* 保持宽高比 */
  object-fit: contain; /* 保持图片比例 */
  
  /* 设置图片最小尺寸为原始尺寸的50% */
  /* 注意：这里需要知道原始尺寸或使用其他方式定义"50%" */
  min-width: 50%; /* 或者使用固定像素值如 min-width: 150px; */
  min-height: auto; /* 保持比例 */
}
</style>
