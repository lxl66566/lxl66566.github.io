---
date: 2023-12-30
icon: download
category:
  - 推荐
  - 教程
tag:
  - 工具
  - 桌面端
---

# yt-dlp 使用教程

[yt-dlp](https://github.com/yt-dlp/yt-dlp) 是一个开源命令行视频/音频下载工具，远比那些闭源收费的视频下载扩展/软件好用。

但是，yt-dlp 也有一些缺点：

- 对于某些 B 站视频可能无法选择最高清晰度
- yt-dlp 不能下载任意网站的视频。要查看是否支持某网站，请直接搜 [Changelog](https://github.com/yt-dlp/yt-dlp/blob/master/Changelog.md)。我主要用 yt-dlp 下载 youtube 与 bilibili 视频。
- 2024 年后期 Youtube 和 Chrome 同时增强了限制，导致现在下载 Youtube 的视频显得稍有麻烦。

## 安装

linux 上可以使用包管理器安装。

```sh
sudo pacman -S yt-dlp ffmpeg
```

windows 上请：

1. 前往[其 github release](https://github.com/yt-dlp/yt-dlp/releases)，下载以 `.exe` 结尾的可执行文件。
2. 放到 `C:\Windows\System32` 下。（比起操作环境变量，我更推荐这种方式）
3. (recommended) 安装 ffmpeg 用于音视频合并。

## 使用

以下例子中的视频仅做学习使用。

### 基础下载

`yt-dlp <video-link>`

```sh
yt-dlp https://www.bilibili.com/video/BV1wK41147Za
```

其会自动调用 ffmpeg 进行合并。

### 选择画质/仅下载音频

\+ `-F`

```sh
yt-dlp https://www.bilibili.com/video/BV1wK41147Za -F
```

然后在弹出的列表中，选择你需要的项目 ID ，并交给 `-f <ID>`：

```sh
yt-dlp https://www.bilibili.com/video/BV1wK41147Za -f 30216
```

注意，一次只能传入一个 `-f`（多的以最后一个为准），如果要下载多个项目，需要使用多条指令。

### 手动合并

当下载好（选择完画质的）视频后，可能需要手动合并音视频。此时需要用到 ffmpeg。

#### 单独合并

```sh
ffmpeg -i input.mp4 -i input.m4a -c:v copy -c:a copy -strict experimental output.mp4
```

#### 批量合并

linux 脚本，注意更改目标位置。

```sh
find . -name "*.mp4" -exec bash -c 'file="{}"; ffmpeg -nostats -i "$file" -i "${file%.mp4}.m4a" -c:v copy -c:a copy -strict experimental "/home/absolutex/Videos/${file}"' \;
```

### 下载大会员视频

你可能有下载 B 站版权保护视频（大会员专享）的需求，例如番剧、电视剧等，或者在 Youtube 新政策后下载 Youtube 视频。

此时需要用到 `--cookies-from-browser <browser>`。例如使用 chromium 登录了 B 站的大会员账号，然后：

```sh
yt-dlp https://www.bilibili.com/bangumi/play/ss27047 --cookies-from-browser chromium -F
```

其会自动读取 chromium 浏览器的 cookie。然后就能愉快下载了。

当然，现在 Chrome 系浏览器更新了 cookie 保护措施，第三方软件无法再直接读取 cookie。此时需要费一点事，参考[使用 cookie](#使用-cookie)

### [使用 cookie](https://github.com/yt-dlp/yt-dlp/wiki/FAQ#how-do-i-pass-cookies-to-yt-dlp)

1. 使用 [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc) 导出 cookies 文件
2. 使用参数 `--cookies <exported file path>`
