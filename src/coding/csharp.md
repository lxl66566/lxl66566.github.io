---
date: 2022-09-29
icon: code
category:
  - 编程
tag:
  - 编程语言
---

# C#

我没有太多动力去学习 C#，因此本篇文章目前不会有太多内容。

## 学习

我个人喜欢 MS 官方的 [C# 语言参考](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/) 挺不错的，抓牢了这门语言的特性，没一句废话，样例也很全。

不过我不推荐给编程初学者，术语太多太杂了，初学的还是去 google “C# tutorial” 选几个吧。

## 安装与开发环境配置

C# 在 windows 的环境配置是我接触过的语言中最简单的**之一**。

1. 进入[.NET 官网](https://dotnet.microsoft.com/en-us/download)下载 .NET SDK x64 安装包并安装。你可以在 cmd 中运行 `dotnet -h` 测试环境是否完善。
2. vscode 中安装 C# 扩展。后续记得看右下角可能出现的提示。
3. 打开你的项目文件夹，终端中输入 `dotnet new console` 创建项目。
4. F5 编译运行。
5. Formatter: 扩展搜索 [CSharpier](https://csharpier.com/) 并安装。首次使用会在右下角弹出本地安装提示，选择 global install。然后就是 format on save 老规矩安排上。

## 语言基础

由于文档很全，这里就不放长篇语法基础或者容易找到的部分了，主要放一些个人理解。

- object vs dynamic：object 仍然是编译期类型，而 dynamic 是运行期；object 赋值是显式，dynamic 是隐式。无论哪一种，强制转换时类型不匹配都会抛异常（不过异常的种类不同，InvalidCastException vs RuntimeBinderException）。
