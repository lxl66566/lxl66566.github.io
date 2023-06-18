# TypeScript
TypeScript 是在 JavaScript 基础上建立的一门语言，新增了类型控制，可以被编译为 JavaScript. 我是激进派，因此本文主要讲 TypeScript；JS 版本 >= ES6.

> JavaScript 是符合 ECMAscript 标准规范的，一门弱类型的 GC 语言，又称 ECMAScript. 浏览器的默认语言。
## 语言基础
大部分语法跟其他语言挺像的。
### 判断
* 重点是 `==` 和 `===` 的区别。
    * 不等号：`!=`,`!==`
### 变量声明
> [菜鸟教程的类型声明](https://www.runoob.com/typescript/ts-variables.html)全是 var，难绷

不许用 var（暴论）。全部使用 `let` | `const`。[区别](https://www.tutorialsteacher.com/typescript/typescript-variable)
## Node.js & npm
Node.js 是能够在服务器端运行 JavaScript 的开放源代码、跨平台执行环境。一言：集成开发环境，必装。

npm 为 Node.js 的包管理器。
### 基本命令
```shell
npm install -g typescript  # 安装 typescript 开发环境
tsc xxx.ts  # 将其编译为 js
node xxx.js # 执行 js 文件
# npm
npm search <package_name>   # 查找包
npm install <package_name> [option] # 安装包
npm list -g --depth=0   # 列出全局包，不包含依赖
npm update -g   # Update all global
```
## 遇到的问题
### CORS policy
在单文件 html 内写 js 时调试，总会遇到 CORS policy 问题，即不允许访问本地文件。解法很简单，开个 local server (!= localhost) 跑 html 就完事了。
在文件目录下 `python -m http.server`，打开浏览器访问 `localhost:8000`，点击要调试的 html 即可。<span class="heimu" title="你知道的太多了">20230603：我是铸币</span>