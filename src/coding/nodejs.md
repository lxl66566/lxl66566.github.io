---
date: 2023-07-24
icon: nodeJS
category:
    - 编程
tag:
    - 工具
---
# node.js
Node.js 是能够在服务器端运行 JavaScript 的开放源代码、跨平台执行环境。一言：集成开发环境，必装。

[npm](#npm) 为 Node.js 的官方包管理器。此外比较广泛使用的包管理器还有 yarn 和 pnpm 等，其各有优势，可自行选择使用。yarn 在早期比 npm 强，现在优势[貌似不大](https://zhuanlan.zhihu.com/p/27449990)。pnpm 使用硬链接，在空间上具有很大优势，但普及度还是略逊一筹（可能难以找到非常规问题解法）。

我对磁盘空间较为敏感，因此使用 pnpm。由于其文档问题，建议先熟悉 npm 命令后，再使用 pnpm 命令。
## pnpm
[用前必读](https://pnpm.io/zh/pnpm-cli#命令行)

* 如果直接使用 `pnpm i` 安装依赖后运行报错，请使用 `pnpm i --shamefully-hoist` 安装依赖！[^1]
* `npm init ...` == `pnpm create ...`
[^1]: 感谢 Asuka Minato 解答
## npm
### 基本命令
```sh
npm search <package_name>   # 查找包
npm install <package_name> [option] # 安装包
npm list -g --depth=0   # 列出全局包，不包含依赖
npm update -g   # Update all global
npm uninstall <package_name> [option] # 卸载包及其依赖
```
* [镜像](https://www.runoob.com/w3cnote/npm-switch-repo.html)
### 其他命令
* 如果需要重装所有 `node_modules`，可在 bash 中：`rm -rf node_modules && rm package-lock.json && npm cache clear --force`
* 更新依赖([ref](https://juejin.cn/post/6844903827599015944))：
    ```sh
    npm i -g npm-check
    npm-check -u
    ```
### 关于 --save
有时候会看到 `npm i xxx --save`，`--save` 是写入 `package.json` 的过程，而 npm 5 之后 install 会自动 save，不需要手动指定。一句话：**不用加**。
## 查询包大小
查询 install size 可以使用 [Package Phobia](https://packagephobia.com/)。
## 遇到的问题
### CORS policy
在单文件 html 内写 js 时调试，总会遇到 CORS policy 问题，即不允许访问本地文件。解法很简单，开个 local server (!= localhost) 跑 html 就完事了。
在文件目录下 `python -m http.server`，打开浏览器访问 `localhost:8000`，点击要调试的 html 即可。<span class="heimu" title="你知道的太多了">20230603：我是铸币</span>
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
## external
1. [npm vs pnpm vs Yarn — Which Package Manager Reigns Supreme?](https://javascript.plainenglish.io/npm-vs-pnpm-vs-yarn-which-package-manager-reigns-supreme-a942d17a2051)