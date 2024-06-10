---
icon: brands fa-bots
date: 2023-07-24
category:
  - 编程
  - 教程
tag:
  - 成果
---

# bot

我曾使用 [nonebot2](https://nonebot.dev/) + cqhttp 的方式搭建 bot。这种方案使用 python 语言，并且需要自己写比较底层的代码。在此感谢 [yaowan233](https://github.com/yaowan233) 学长的指导。

而现在我选择 [koishi](https://koishi.chat/zh-CN/) 框架。该框架基于 [node.js](./nodejs.md)，具有图形化的操作界面和高度预设，可以接入多个平台，也有成熟的 npm 包管理。文档虽说不算优秀，但至少比曾经的 nonebot2 强数倍。同时也有[论坛](https://forum.koishi.xyz/)以供交流。但是代价就是 node.js 的高运行时内存占用了。（常态 600M）

comp: 这两个平台都通过 Adapter 适配不同的平台，比较泛用；都有数据库的抽象层，比较易用；2023 开源之夏 nonebot2 也新增了图形界面。我感觉还是看写 python 还是写 ts 舒服来选平台比较合适。

我建的 bot 有两个实例：一个是之前一直在用的 QQ bot `atri`（2433269451），另一个是后来使用 koishi 的 Telegram bot [`atri bot`](https://t.me/atri_absx_bot)。

::: details 查看 atri(QQ) 的信息

<ZoomedImg alt="atri" src="/images/farraginous/atri/atri.jpg" scale="40%" />

她的功能：

- 背单词（英日双语）
- 随机数
- 带饭记账
- 偷窥我

请加为好友（联系绝对值\_x 同意好友）后发送`help`获取详细指令。你也可以在[这里](https://github.com/lxl66566/primary-atri-bot-plugins)得到她的实现上述功能的 python 源码。关于环境：

1. [使用 conda](../coding/python.md#创建环境)创建出所需环境（此处环境名为`atri`）：`conda create -n atri python=3.9`
   > nonebot2 需要在 python>=3.8 环境下运行
2. 使用 pip 安装依赖：
   ```sh
   pip install nb-cli
   pip install nonebot-adapter-onebot
   ```
3. 参考[随笔中的启动脚本](../essay/2022.md#_20220506)

:::

## koishi

### install

这里推荐[使用 pnpm/npm 安装](https://koishi.chat/zh-CN/manual/starter/boilerplate.html)，而不是官方推荐的下载安装包。使用 pnpm/npm 安装对 bot 功能没有影响，而且方便开发。

::: code-tabs
@tab pnpm

```sh
pnpm i -g create-koishi@latest
pnpm create koishi  # 选择是否 install and start 的时候选择 否
pnpm i --shamefully-hoist   # 需要添加此后缀
pnpm dev
```

@tab npm

```sh
npm i -g create-koishi@latest
npm init koishi
```

:::

> _关于 pnpm 安装后缀，详见 [nodejs](./nodejs.md#神秘报错)_

### 使用

- telegram：本机没有公网 ip，因此选择 _polling_ 工作模式。代理用 http 好像不能用（这也是我第一次退坑 koishi 的理由），之后尝试用 socks 端口就可以了。
- QQ：~~参考[论坛](https://forum.koishi.xyz/t/topic/2502)。回复挺破碎的，需要多翻一翻。我能够成功使用，不过会报 warning:~~

  > 由用户 '\*' 发送的 session '\*' 缺失 username。插件处理可能出现问题。若要针对此问题进行反馈，请前往 <https://k.ilharp.cc/2510> 。错误码：2130

  ~~不影响使用，开发者也[说不用在意](https://forum.koishi.xyz/t/topic/2510/154)，那就不管了。~~
  chronocat 开发的 QQNT 适配器现已被下架。

### 开发

我写了一个小玩具（[koishi-plugin-peek](https://github.com/lxl66566/koishi-plugin-peek)），大致涵盖了基本的开发指令。推荐在 github 上搜索其他源码广泛学习。

- 关于发布插件：**`pub` 之前请一定记得 `build`！！切记！！**
