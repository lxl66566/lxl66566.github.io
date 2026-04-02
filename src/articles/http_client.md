---
date: 2026-03-29
icon: paper-plane
category:
  - 推荐
tag:
  - 桌面端
  - 横评
---

# HTTP Client

在尝试了许多 http client，例如 postman，apifox，bruno 后，我一直都很想喷这群 B。

- http client 这么简单的东西，为什么各家都做成这个鸟样[^apifoxcve1]。。。postman 不充钱难用得要死，apifox 卡手而且代码质量很差，bruno bug 一堆。。

[^apifoxcve1]: [Apifox 遭遇投毒](https://ourl.co/112328?t)

### postman

最老牌。

但是 postman 不充钱几乎没法用，连保存 http 请求都做不到。也没有 collection 用。

### Apifox

国产公司的商业化产品，谁用？

[新时代互联网笑话一则](https://t.me/fucku_idiot/26266)：

> 我们开发团队Q1的目标：全面取消前后端分工，所有人必须全栈；所有人写的代码必须要求80%以上代码由AIAgent产出；每个人必须要有能力指挥5个以上的Agent同时并行干活，并且能做到Agent产出的代码质量不低于真人。每个人产能提升5倍是合格，8~10才是优秀

### bruno

bruno 的免费版能做的事情比较多，不像其他两个几乎都是不可用状态。但是 bruno bug 还是挺多的。

- bruno 3.1.4，自动粘贴 curl 后 url 框的内容不会重新渲染，需要切一下 tab 才能渲染。
- bruno 的 headers 列表，会自己排序，勾选或者取消勾选都会（延迟一段时间）触发它的排序。问题是这样非常影响手感，我输入一半给我打断了算啥啊。
- bruno 粘贴 curl 只能粘 bash 格式的，cmd 格式不支持，识别是错的。。我觉得这是非常基本的能力啊。
- 常态内存占用 450MB，electron 也没这么离谱啊。
- 性能太差了，一个 response 才 7MB json，我从 raw 切到 json 渲染能卡死我几秒钟。。。。
- Windows 下代理优先级有问题，不遵守系统代理排除列表，也不遵守 NO_PROXY。实在是太邪恶了。

### yaak

bruno 实在是问题太多，我开始尝试其他的 http client。

yaak 的 star 也挺多的，下载下来试试。Rust + tauri，看着还行。默认的 theme 比较有特色，资源占用也比较小。

- 最大的问题是商业化，只有 personal use 免费，工作用是违反协议的。你也不知道它有没有遥测，有没有上传你的数据。
- 默认是开启自动检查和自动更新的，我不喜欢。
  - Update Behavior 如果选成 Manual，Automatically download updates 变灰不允许修改，但是值还是 follow 的 Automatic Update 的值。用户交互不是很用心。

### [Hoppscotch](https://hoppscotch.io/)

web based 的 HTTP client。
