---
date: 2023-07-24
icon: brands fa-node-js
category:
  - 编程
tag:
  - 工具
  - 前端
---

# JS 生态

> _（js/ts 语言有关请[跳转 JavaScript/TypeScript](./tsjs.md)）_

现在也出现了很多新的 js/ts 集成开发环境（你们 Rust 人…），如 ~~[swc](https://swc.rs/)~~（swc 是底层，不要直接用它）, [bun](https://bun.sh/), [deno](https://deno.com/) 等。这些新 runtime 对 TypeScript 的支持都非常好。

::: tabs

@tab node.js

Node.js 是 js 运行时 + npm 包管理 + corepack，前端开发**必装**。毕竟公司的运行时用的一定是最老牌最稳定的 Node.js。

Node.js 正在计划原生支持 ts，不过截至 2024 尚未实装。

Node.js 的原生 command 和文件系统 API 都很难用。

@tab bun

bun 是 Rust 写的 js 运行时，自带包管理器，并且比 deno 快。

[bun 的一些 API 设计](https://bun.sh/guides/runtime)非常对我的胃口，特别是 system command。

- 不过跨平台差了点。我在 2023 年就尝试过 bun 了。当时刚宣布支持 windows，结果疯狂 crash，就是一坨。不过现在倒是稳定了许多，即使现在还是有很多 crash 报告。
- bun 1.3 后可以使用 [isolated installs](https://bun.com/docs/pm/cli/install#isolated-installs) 模拟 pnpm 的软链接特性。

@tab deno

deno 我也试用过了一下，没啥感觉。

:::

## 包管理

nodejs 常见的就 npm, yarn, pnpm 三件套，现在的框架文档也基本会同时给出这三个包管理器的命令。其他的 js 运行时或许有自带包管理（bun），这样统一也不错。

- [npm](#npm) 为 Node.js 的自带官方包管理器，挺难用的，安装又慢，进度条又假。当然由于 nodejs 自带，普及率非常广。
- yarn 在早期比 npm 强，卖点是可复现性。然而现在优势[貌似不大](https://zhuanlan.zhihu.com/p/27449990)。
- [pnpm](#pnpm) 使用硬链接，一块硬盘上同一个依赖不会被复制多次，在节省空间上具有很大优势。安装速度也非常快。但普及度还是略逊一筹（可能难以找到非常规问题解法），并且老项目兼容性会差一点。

节省磁盘空间对我来说真的很加分，因此我使用 pnpm。由于其文档并不面向初心者，建议先熟悉 npm 命令后，再使用 pnpm 命令。

### pnpm

[用前必读](https://pnpm.io/zh/pnpm-cli#命令行)

- 如果直接使用 `pnpm i` 安装依赖后运行报错（而在 npm/yarn 上表现良好），请使用 `pnpm i --shamefully-hoist` 安装依赖！[^1]
- `npm init ...` == `pnpm create ...`

[^1]: 感谢 Asuka Minato 解答；大概是有依赖不支持 pnpm 的目录模式。

### npm

我已不再使用 npm。npm 比起其他包管理器有太多不足了，除非公司强制使用，否则我不用。

::: details archive

#### 基本命令

```sh
npm search <package_name>                 # 查找包
npm install <package_name> [option]       # 安装包
npm list -g --depth=0                     # 列出全局包，不包含依赖
npm update -g                             # Update all global
npm uninstall <package_name> [option]     # 卸载包及其依赖
npx <command>                             # npm 的脚本运行器，可以自动下载脚本并运行
```

- [镜像](https://www.runoob.com/w3cnote/npm-switch-repo.html)

#### 其他命令

- 如果需要重装所有 `node_modules`，可在 bash 中：`rm -rf node_modules && npm cache clear --force`
- 更新依赖([ref](https://juejin.cn/post/6844903827599015944))：

  ```sh
  npm i -g npm-check
  npm-check -u
  ```

#### 关于 --save

有时候会看到 `npm i xxx --save`，`--save` 是写入 `package.json` 的过程，而 npm 5 之后 install 会自动 save，不需要手动指定。一句话：**不用加**。

:::

### 关于 lockfile

> 对于不同的包管理器，lockfile 的名称不同。

在 `package.json` 的包版本信息是使用[版本修饰符](https://eminoda.github.io/2021/01/29/npm-semver-strategy/)，允许上下浮动的。并且依赖、依赖的依赖……都可能不固定版本。然而版本不同就有可能导致错误，此时就需要使用 lockfile 进行精确版本的指定。

若 lockfile 不存在，install/update 时会自动生成。若存在且 lockfile 版本符合 `package.json` 版本，则从 lockfile 中安装依赖。若 lockfile 不兼容 `package.json`，则 pnpm/npm 会直接更新 lockfile 或报错退出（因此，强烈建议将 lockfile 添加到 git 版本控制中[^2]）。

很遗憾，目前我没有找到任何方法使我能够严格依照 lockfile 进行依赖安装：在冲突时使用 `--frozen-lockfile` 参数，npm 会直接忽略之并写入 lockfile，pnpm/yarn 会报错并终止。同样的，`npm init -y` | `npm-collect` 都无法完成此任务。
[^2]: [惨痛教训](https://t.me/withabsolutex/1216)

### 一些查询

- 查询包的 install size 可以使用 [Package Phobia](https://packagephobia.com/)。
- 在前端项目中查询未使用的依赖可以用 depcheck：`pnpm i -g depcheck && depcheck`

## 三方包记录

几乎成为行业标准，必须掌握：

<!-- prettier-ignore -->
| 库名 | 简介 |
| --- | --- |
| zod | type validator |

我用过然后觉得好用：

<!-- prettier-ignore -->
| 库名 | 简介 |
| --- | --- |
| tinybench | code snipets benchmark tool |

**避雷条目一生黑**：

<!-- prettier-ignore -->
| 库名 | 吐槽 |
| --- | --- |
| node-pre-gyp | 为了好看，超过终端宽度的行都用 `...` 截断，但是又不给完整 log [src](https://t.me/withabsolutex/2521) |

## 运行时特性

### 输入

JS/TS 有一个很大的特点，就是对于 console 输入、文件系统等实现并不是由语言本身，而是由 runtime 提供的 builtin package 完成的。因此这部分内容在不同的 runtime 上需要实现不同的代码。这其中自然就有 API 设计的优劣之分。

::: tabs

@tab deno

deno 支持 prompt API：

```ts
alert("Please acknowledge the message."); // 相当于带消息的 pause
confirm("Do you want to proceed?"); // yN 选择器
prompt("Please enter your name:"); // input
```

但是 prompt API 有一个巨大的问题：无法不带 prompt。这是例子：

```ts
prompt(); // 会在用户输入前打印 "Prompt "
prompt(""); // 会在用户输入前打印 " "
```

prompt api 总是会想要打印一点东西，我是真的没绷住。

@tab bun

bun 官方提供了一个示例：

```ts
for await (const line of console) {
}
```

但是问题是我并不知道如何仅读取一行输入。如果每次都要在 for 循环里读入然后 break 也太傻了。然而翻了 [SO 的回答](https://stackoverflow.com/questions/78247715/) 和 [关联的 issue](https://github.com/oven-sh/bun/issues/7541)，并没有其他解法，还是 break 大法好。

bun 也同时支持 prompt API，不过如前文 deno 所述，有一个问题。

@tab nodejs

[nodejs 的 api](https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs) 又臭又长，暂且不论。

:::

### system command

::: tabs

@tab bun

目前的 js runtime 里，system command 我只服 bun 一个。他的语法实在是太简洁了。

```ts
import { $ } from "bun";
let res = await $`ls .`;
for (const line of res.stdout.toString().split("\n")) {
  console.log(line);
}
```

:::

## 构建包

如果开发了一个库，需要将其上传到 npmjs 上，这时候可以使用专门用于构建与上传的包，可以省去很多烦恼。

有许多包可以做到这件事，例如 [unbuild](https://github.com/unjs/unbuild)，[bunchee](https://github.com/huozhi/bunchee)和[pkgroll](https://github.com/privatenumber/pkgroll)。阅读 README 后我更倾向于使用 pkgroll，虽然我都没试过。

## 遇到的问题

> 时间倒序

### fetch 爆炸

nodejs 跑 ofetch 一直爆炸，然而我的测试脚本都是用 `bun xxx.ts` 跑的，而测试脚本运行完好。debug 许久发现是 nodejs 的 fetch 有问题 ([src](https://t.me/withabsolutex/2234))。。

### 标准输入

nodejs 想实现在 terminal 内的标准输入甚至需要对 async/await 模型有一点了解。

首先，`import readline from "readline";` 的 readline 是非阻塞的。回调函数会在用户输入后才执行，但在 readline 前的代码就惨了。。

其次，`"readline"` 本身没有提供 Promise。因此需要这样：

```js
import readline from "node:readline/promises";
const rl = readline.createInterface(process.stdin);
for (const element of data) {
  do_something_pre();
  const answer = await rl.question("?");
  do_something_after();
}
```

才能让 `pre()` 与 `after()` 都呈现阻塞的效果。

当然，如果你可以使用 npmjs 包还可以用 [Inquirer](https://github.com/SBoudrias/Inquirer.js)；如果不使用 nodejs 运行时也能享受到其他运行时的 prompt API 设计，没必要硬吃 nodejs 这坨屎。至于 [prompt API 也是一坨屎](https://t.me/withabsolutex/2047)……那没救了。

### 脚本调库

有时我们可能会想在简单的脚本中调用第三方 nodejs 库。但使用包管理器后，又带来了不必要的复杂度。

当我为了调库而创建了一个项目后，首先需要填写一堆信息。当然，只是写点小脚本完全可以不填，一路回车。然后再安装需要的包。

然而，在代码中直接使用 `require` 调库会报错：

> ReferenceError: require is not defined in ES module scope, you can use import instead

而使用 `import` 又会报：

> SyntaxError: Cannot use import statement outside a module

在 `package.json` 中添加 `"type": "module",` 后，才能算是结束。

### 神秘报错

nodejs 出错的报错基本上是没用的，因为一般出现玄学问题是依赖包的问题而不是用户的问题（笑）。

1. pnpm 安装 [koishi](./bot.md) 依赖的问题，dev 的时候遇到神秘报错，而使用 npm 安装却不会报错。需要使用 `--shamefully-hoist` 生成与 npm 一样的扁平化目录。
2. [vuepress1 文档构建失败](https://github.com/DIYgod/RSSHub/issues/13007)：webpack 与 nodejs 之间的碰撞！我甚至想到了降级 nodejs 到 LTS，但没想到的是连 LTS v18 也不行，得降到 v17......

### 安装 sharp

我想使用 sharp 作为图像处理库。而直接 `npm i sharp` 会报错：

```text
npm ERR! code 1
npm ERR! path D:\program\koishi-app\node_modules\sharp
npm ERR! command failed
npm ERR! command C:\WINDOWS\system32\cmd.exe /d /s /c (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)
npm ERR! sharp: Downloading https://github.com/lovell/sharp-libvips/releases/download/v8.14.3/libvips-8.14.3-win32-x64.tar.br
npm ERR! sharp: Please see https://sharp.pixelplumbing.com/install for required dependencies
npm ERR! sharp: Installation error: Request timed out
```

尝试：

1. 更换其他 npm 源，无法解决。
2. 使用 `--ignore-scripts` 选项，能够安装，但无法启动 koishi 服务器：
   > app Error: <br/>
   > Something went wrong installing the "sharp" module<br/>
   > Cannot find module '../build/Release/sharp-win32-x64.node'
3. 尝试执行([ref](https://sharp.pixelplumbing.com/install#chinese-mirror))：

   ```shell
   npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
   npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
   ```

   报错

   > npm ERR! code ENOWORKSPACES<br/>
   > npm ERR! This command does not support workspaces.

难道真的山穷水尽了吗？不！再次 `npm i sharp` 后，经过漫长的等待，终于安装成功了！并且服务器也没有报错！

总之，还是挺玄学的。

### CORS policy

在单文件 html 内写 js 时调试，总会遇到 CORS policy 问题，即不允许访问本地文件。解法很简单，开个 local server (!= localhost) 跑 html 就完事了。
在文件目录下 `python -m http.server`，打开浏览器访问 `localhost:8000`，点击要调试的 html 即可。<span class="heimu" title="你知道的太多了">20230603：我是铸币</span>

这种方法只能避开访问 localhots 的跨域，不能避开 fetch 其他网站的跨域。如果对于确定的网站资源，可以 _curl_ 到本地再引入。

## external

1. [npm vs pnpm vs Yarn — Which Package Manager Reigns Supreme?](https://javascript.plainenglish.io/npm-vs-pnpm-vs-yarn-which-package-manager-reigns-supreme-a942d17a2051)
2. [加盐 hash 保存密码的正确方式](https://wooyun.js.org/drops/加盐hash保存密码的正确方式.html)
