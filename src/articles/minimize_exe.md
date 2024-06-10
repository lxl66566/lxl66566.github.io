---
date: 2023-04-28
icon: minimize
category:
  - 教程
tag:
  - CLI
  - 桌面端
---

# program minimize

I'm very sensitive to file size. And 20230428 I found a nice guy to minimize my released executable files:

[UPX](https://github.com/upx/upx), The Ultimate Packer for eXecutables. (copy from its readme, ~~strange capitals~~)

## install

- for windows: using [scoop](../farraginous/recommend_packages.md#scoop), `scoop install upx`
- for archlinux: `sudo pacman -S upx`

## usage

`upx --best --lzma <yourfile.exe>`

or you want to minimize the whole package folder including dlls, replace `<yourfile.exe>` with `<yourfolder>/*`
