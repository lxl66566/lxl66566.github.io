---
date: 2023-07-24
icon: nodeJS
category:
  - 编程
tag:
  - 工具
---

# node.js

> _（js/ts 语言有关请[跳转 Javascript/Typescript](./tsjs.md)）_

Node.js 是能够在服务器端运行 JavaScript 的开放源代码、跨平台执行环境。一言：开发环境，必装。

> 不过现在也出现了很多新的 js/ts 集成开发环境，如[swc](https://swc.rs/), [bun](https://bun.sh/), [deno](https://deno.com/) 等。可以酌情尝试使用。

[npm](#npm) 为 Node.js 的官方包管理器。此外比较广泛使用的包管理器还有 yarn 和 pnpm 等，其各有优势，可自行选择使用。yarn 在早期比 npm 强，现在优势[貌似不大](https://zhuanlan.zhihu.com/p/27449990)。pnpm 使用硬链接，在空间上具有很大优势，但普及度还是略逊一筹（可能难以找到非常规问题解法）。

我对磁盘空间较为敏感，因此使用 pnpm。由于其文档问题，建议先熟悉 npm 命令后，再使用 pnpm 命令。

## 包管理

### pnpm

[用前必读](https://pnpm.io/zh/pnpm-cli#命令行)

- 如果直接使用 `pnpm i` 安装依赖后运行报错（而在 npm/yarn 上表现良好），请使用 `pnpm i --shamefully-hoist` 安装依赖！[^1]
- `npm init ...` == `pnpm create ...`

[^1]: 感谢 Asuka Minato 解答

### npm

#### 基本命令

```sh
npm search <package_name>   # 查找包
npm install <package_name> [option] # 安装包
npm list -g --depth=0   # 列出全局包，不包含依赖
npm update -g   # Update all global
npm uninstall <package_name> [option] # 卸载包及其依赖
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

### 关于 lockfile

> 对于不同的包管理器，lockfile 的名称不同。

在 `package.json` 的包版本信息是使用[版本修饰符](https://eminoda.github.io/2021/01/29/npm-semver-strategy/)，允许上下浮动的。然而版本不同就有可能导致错误。此时就需要使用 lockfile 进行精确版本的指定。

若 lockfile 不存在，install/update 时会自动生成。若存在且 lockfile 版本符合 `package.json` 版本，则从 lockfile 中安装依赖。若 lockfile 不兼容 `package.json`，则 pnpm/npm 会直接更新 lockfile 或报错退出（因此，强烈建议将 lockfile 添加到 git 版本控制中[^2]）。

很遗憾，目前我没有找到任何方法使我能够严格依照 lockfile 进行依赖安装：在冲突时使用 `--frozen-lockfile` 参数，npm 会直接忽略之并写入 lockfile，pnpm/yarn 会报错并终止。同样的，`npm init -y` | `npm-collect` 都无法完成此任务。
[^2]: [惨痛教训](https://t.me/withabsolutex/1216)

### npx

npx 是一个执行脚本的 nodejs 附属物。其实际上做的是临时拉取某个 bin 包并执行，但是不太好用的样子。

因此我们也可以 `pnpm/yarn install -g <bin> && <bin> ...` 安装到全局再执行，或者 install as dep 后，在 `./node_modules/.bin/<bin>` 下手动调用执行。

### 查询包大小

查询 install size 可以使用 [Package Phobia](https://packagephobia.com/)。

## 遇到的问题

> 时间倒序

## 标准输入

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

## 脚本调库

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

[^1]: 大概是有依赖不支持 pnpm 的目录模式。

### 安装 sharp

我想使用 sharp 作为图像处理库。而直接 `npm i sharp` 会报错：

```
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
