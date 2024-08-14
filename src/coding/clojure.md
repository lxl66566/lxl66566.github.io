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

## 开发环境

vscode 安装 _Calva Spritz_ 即可。

`Ctrl + Shift + P`，_create a mini clojure project_。然后点击下方的 REPL（一个可以实时查看执行结果的东西），打开（Jack-in）即可。一般选择 Babashka，~~因为其他两个都打不开~~。

用法只需要掌握：在当前代码行上，按 `Alt + Enter` 执行单句。如果有调用前面的函数，先按 `Ctrl + Shift + c, Enter` 引入依赖，再执行单句。（什么邪恶快捷键）

更多可以看[The Top 10 Calva Commands](https://calva.io/commands-top10/)。

## basic

零散知识点。

- conj + list 是加到前面：`(conj '(2 3 4) 1)`，+ vec 是加到后面：`(conj [1 2] 3 4)`
- `->` 和 `->>` 的区别：添加的位置不同。`->` 加到调用链每一环函数参数首位，`->>` 加到调用链每一环参数末尾。

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
