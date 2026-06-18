---
date: 2026-06-17
icon: linux
category:
  - 教程
tag:
  - 桌面端
  - CLI
  - Windows
---

# msys2

msys2 是一个开发工具，通过转译兼容层，可以在 Windows 上模拟 unix 的环境。一般用于开发者交叉编译，或作为某些 linux only shell (fish, zsh) 的载体。

比起 WSL2（是一个完整的虚拟机），msys2 使用转译，可以更快启动、具有更好的性能（特别是在 Windows NTFS 上的 IO 性能）。

## 安装

通过 scoop 安装：

```sh
scoop install msys2
```

安装好后，首次启动 msys2，会写入默认的一些 bash 配置文件到 `<scoop_dir>/persist/msys2/home/<username>`。后续编辑即可。

## 配置

推荐这样配置你的 msys2。

1. msys2 默认不继承 Windows 的 PATH 环境变量，也就是无法在内部运行 Windows 的程序。显然我不希望这样，需要设置 **Windows 的环境变量**：`MSYS2_PATH_TYPE=inherit`，这样之后打开 msys2 就会继承 Windows PATH。
2. msys2 默认的 home 目录和 Windows 是隔离的，但是我更想直接使用 Windows 的 home 目录：在 msys2 的 home 目录下，编辑 `.bash_profile`，在顶部写入如下内容即可。
   ```sh
   if [[ -n "$MSYSTEM" ]]; then
     export HOME="/c/Users/$(whoami)"
   fi
   ```
3. 符号链接优化：由于 Windows 的限制，在 msys2 里用 `ln -s` 会复制整个文件夹。如果确实需要创建 Windows symlink，需要设置 Windows 环境变量：`MSYS=winsymlinks:nativestrict`，并且为 Windows 当前用户[添加 SeCreateSymbolicLinkPrivilege 权限](./settings.md#:~:text=SeCreateSymbolicLinkPrivilege)。

比较好笑的是，Git bash 虽然基于 msys2，但是其有自己的优化，上面的 1-2 点在 Git Bash 上都是不需要显式配置的。

## 包管理

msys2 比起 Git Bash，最大的优势就在其可以安装更多的包，而包管理器在 Git Bash 上是被阉割了的。

msys2 使用 pacman 作为包管理器，[Arch Linux](../linux/install_and_config.md) user 肯定非常熟悉。并且 msys2 的 pacman 是开箱即用，不需要[折腾 keyring](../linux/problem.md#更新-pacman-keyring)，连镜像源都是全部 enable 的，把饭喂到嘴边了。

一些配置：

1. 虽然默认启用所有镜像源，但是你可以手动调整镜像源的位置设置优先级。编辑这些文件，把 ustc、tuna 源调高即可。
   ```sh
   vim /etc/pacman.d/mirrorlist.msys
   vim /etc/pacman.d/mirrorlist.mingw
   ```
