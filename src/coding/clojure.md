---
date: 2024-08-12
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# Clojure

因为工作需要（写 jepsen test），不得不学习这门语言。这是一门 lisp 系纯函数式的语言。我还没忘记第一次读 SICP 时 lisp 给我带来的伤害，看起来 Clojure 也是括号满地，但是事到如今也只能硬着头皮上了。

## 学习

1. [learnxinyminutes](https://learnxinyminutes.com/docs/zh-cn/clojure-cn/)：学语言首选，并且它下面也推荐了几个其他网址，方便快速入门，我觉得挺好的。
2. [official quickref](https://clojuredocs.org/quickref)：肯定少不了来这里查。可以学到许多 builtin functions。
3. [Solving Problems the Clojure Way - Rafal Dittwald](https://www.youtube.com/watch?v=vK1DazRK_a0)：函数式思想入门，茅塞顿开
4. [Clojure 风格指南](https://github.com/geekerzp/clojure-style-guide/blob/master/README-zhCN.md)
5. [Writing Macros - Clojure for the Brave and True](https://www.braveclojure.com/writing-macros/)

## 开发环境

vscode 安装 _Calva Spritz_ 即可。

`Ctrl + Shift + P`，_create a mini clojure project_。然后点击下方的 REPL（一个可以实时查看执行结果的东西），打开（Jack-in）即可。一般选择 Babashka，~~因为其他两个都打不开~~。

用法只需要掌握：在当前代码行上，按 `Alt + Enter` 执行单句。如果有调用前面的函数，先按 `Ctrl + Shift + c, Enter` 引入依赖，再执行单句。（什么邪恶快捷键）

更多可以看[The Top 10 Calva Commands](https://calva.io/commands-top10/)。

## 语言基础

零散知识点。

- function 隐式命名规则：
  - 后面加 v 指返回 vector（`[]`），例如 `filterv`, `mapv`。
- list 和 vec 的区别：list 的尾部是前面，vec 尾部是后面。许多函数例如 `conj`, `peek`, `pop` 都遵循这个规律。正常人都会用 vector 吧。
  ```clojure
  (peek '(1 2)) ; => 1
  (peek [1 2])  ; => 2
  ```
  - 但是有例外，`last` 不遵循此规律。。
  ```clojure
  (last '(1 2)) ; => 2
  ```
- `->` 和 `->>` 的区别：添加的位置不同。`->` 加到调用链每一环函数参数首位，`->>` 加到调用链每一环参数末尾。
  ```clojure
  (-> 1 (func x y)) ; (func 1 x y)
  (->> 1 (func x y)) ; (func x y 1)
  ```
- apply 可以实现函数参数解包，例如
  ```clojure
  (defn wrap
    [x y z]
    (myfunc x y z))
  (defn wrap
    [& args]
    (apply myfunc args))
  ```
  这两个是等价的。
- if 内可以判断很多类型，常见的 `[]` `()` 都能判 false
- peek 是 last 的高速代替
- identity 代表返回自身的函数，用于 filter 等。但是不允许用 `#(%)`。

和其他语言对比：

- loop - recur 就是 for - continue
- defprotocol 就是定义 interface，defrecord 就是 class
- mapcat 就是 flatmap
- distinct 就是 unique 列表去重
- [没有 zip function](https://stackoverflow.com/questions/2588227)，要自己写。
  ```clojure
  (defn zip
    "[1 2 3]
     [4 5 6]
    => [[1 4]
        [2 5]
        [3 6]"
    [m]
    (apply map vector m))
  ```
- 没有 filter-map function：
  ```clojure
  (defn filter-map [f coll]
    (filter identity (map f coll)))
  ```

## 项目管理

- filename 除去 `.clj` 后缀，不能包含 `.`。因为 ns 里的 `.` 代表多一层 dir `/`。
- 导入另一个文件的函数：
  ```clojure
  (ns xxx.yyy)
    (require '[xxx.zzz :as myalias])
  ; 也可以这样写
  (ns xxx.yyy
    (:require [xxx.zzz :as myalias]))
  (myalias/myfunc 123)
  ```
  想要运行这个需要用 `clj` 命令行，在 REPL 内运行只会报错。只有下面的 `:refer` 形式可以在 REPL 用，不会炸。
- 引用标准库：`use :only` 已经 deprecate 了，用 require。
  ```clojure
  (ns chapter2.2-37U
    (:require [clojure.test :refer [deftest is]])
    (:require [chapter2.2-36 :as acn]))
  ```

## 打包

将 clojure 打包为 jar 文件，方便调用。
假设我有一个 `src/mytest.clj`：

```clojure
(ns mytest
  (:gen-class))
(defn -main
  [& args]
  (println (str "Hello, World!" args)))
```

::: details 老式：lein uberjar

官网有 [tools.build Guide](https://clojure.org/guides/tools_build)，但是讲得实在是抽象。因此我先尝试老式打包。

- project.clj
  ```clojure
  (defproject myproject "0.1.0"
  :description "A simple Hello World project"
  :dependencies [[org.clojure/clojure "1.11.4"]]  ; 是必要的，否则找不到 main
  :main mytest
  :aot [mytest])
  ```

然后运行 `lein uberjar` 打包，`java -cp target/myproject-0.1.0-standalone.jar clojure.main -m mytest` 验证。也可以直接 `java -jar target/myproject-0.1.0-standalone.jar`。

:::

- [tools.build Guide](https://clojure.org/guides/tools_build)，多看看，实际上没有太抽象，照着抄就完了。

- `deps.edn`
  ```clojure
  {:paths ["src"] ;; project paths
  :deps {}       ;; project deps
  :aliases
  {;; Run with clj -T:build function-in-build
    :build {:deps {io.github.clojure/tools.build {:git/tag "v0.10.5" :git/sha "2a21b7a"}}
            :ns-default build}}}
  ```
- `build.clj`
  ```clojure
  (ns build
    (:require [clojure.tools.build.api :as b]))
  (def lib 'my/lib1)
  (def version (format "1.2.%s" (b/git-count-revs nil)))
  (def class-dir "target/classes")
  (def jar-file (format "target/%s-%s.jar" (name lib) version))
  (def uber-file (format "target/%s-%s-standalone.jar" (name lib) version))
  ;; delay to defer side effects (artifact downloads)
  (def basis (delay (b/create-basis {:project "deps.edn"})))
  (defn clean [_]
    (b/delete {:path "target"}))
  (defn jar [_]
    (b/write-pom {:class-dir class-dir
                  :lib lib
                  :version version
                  :basis @basis
                  :src-dirs ["src"]})
    (b/copy-dir {:src-dirs ["src" "resources"]
                :target-dir class-dir})
    (b/jar {:class-dir class-dir
            :jar-file jar-file}))
  (defn uber [_]
    (clean nil)
    (b/copy-dir {:src-dirs ["src" "resources"]
                :target-dir class-dir})
    (b/compile-clj {:basis @basis
                    :ns-compile '[mytest]
                    :class-dir class-dir})
    (b/uber {:class-dir class-dir
            :uber-file uber-file
            :basis @basis
            :main 'mytest}))
  ```

运行 `clj -T:build clean && clj -T:build uber` 即可。（`clj -T:build jar` 是来凑数的不用管）

## [劝退](../gossip/fuckxxx.md#clojure-有多难用)
