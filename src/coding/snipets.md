---
date: 2025-09-05
icon: burst
category:
  - 推荐
tag:
  - 脚本
---

# snipets

我在不同系统上使用的不同 shell 的小脚本记录。

虽然 AI 时代这些 snipets 可能已经变得一文不值，但我还是想纪念一下。

## gfixup

我最常用的脚本，没有之一。约等于一个 git-absorb，即将当前的 git 已追踪修改“吸收”到任意 commit（默认为最近的 commit，即 HEAD）。

用法：`gfixup [git_commit]`

::: code-tabs

@tab bash

```sh
set -euxo pipefail
commit_hash="''${1:-HEAD}"
git commit -a --fixup "$commit_hash"

if [ "$commit_hash" = "HEAD" ]; then
  rebase_target="HEAD~2"
else
  rebase_target="''${commit_hash}~1"
fi
GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash "$rebase_target"
```

@tab nushell

```nushell
# Creates a fixup commit for a specific commit and autosquashes it via interactive rebase.
#
# Usage:
#   gfixup           # Creates a fixup commit for the current HEAD and rebases
#   gfixup <hash>    # Creates a fixup commit for <hash> and rebases
#
def gfixup [commit_hash?: string = 'HEAD'] {
    git commit -a --fixup $commit_hash
    let rebase_target = if $commit_hash == 'HEAD' { 'HEAD~2' } else { ($commit_hash | str trim) + "~1" }
    GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash $rebase_target
}
```

@tab fish

```fish
set commit_hash $argv[1]
if test -z "$commit_hash"
    set commit_hash 'HEAD'
end
git commit -a --fixup $commit_hash
set rebase_target ""
if test $commit_hash = 'HEAD'
    set rebase_target 'HEAD~2'
else
    set rebase_target (string trim -- "$commit_hash")~1
end
GIT_SEQUENCE_EDITOR=: git rebase -i --autosquash $rebase_target
```

:::

## revertversion

将当前 git 仓库指定 tag 移动到 HEAD（本地 + remote）

用法：`rv <tag>`，rv 是 revertversion 的 alias

::: code-tabs

@tab bash

```sh
if [ $# -ne 1 ]; then
  echo "Usage: revertversion <version>"
  return 1
fi
echo "Reverting version $@"
git push origin :refs/tags/$@
git tag -d $@
git tag $@
git push --tags
```

@tab nushell

```nushell
def rv [version: string] {
    echo $"Reverting version $version ..."
    git push origin $":refs/tags/($version)"
    git tag -d $version
    git tag $version
    git push --tags
}
```

:::

## repeat

重复执行一条命令多次，主要用于暴力测试。它帮我发现了一些运行上千次才会崩溃一次的 bug。

用法：`repeat <...>`

::: code-tabs

@tab bash

```sh
if [ "$#" -eq 0 ]; then
  echo "usage: $0 <command> [args...]"
  exit 1
fi
MAX_ATTEMPTS=10000
for ((i=1; i<=MAX_ATTEMPTS; i++)); do
  echo "---"
  echo "第 $i 次尝试: 正在执行 '$@'"
  "$@"
  exit_code=$?
  if [ ''${exit_code} -ne 0 ]; then
    echo "---"
    echo "命令在第 $i 次尝试时失败，退出码为 ''${exit_code}。脚本已停止。"
    exit ''${exit_code}
  fi
done
echo "命令成功执行了 ''${MAX_ATTEMPTS} 次而未失败。"
```

:::

## audiofmt

将任意格式的音频转为固定大小（默认 5MB）的 opus 音频，选择 opus 是因为该格式拥有优秀的压缩比，详见[音频处理](./audio.md)。主要用于无损格式音频的有损压缩，依赖 ffmpeg。

使用方法：`audiofmt <input_file> [size(MB)]`

::: code-tabs

@tab python

```py
import argparse
import os
import subprocess
import sys


def get_audio_duration(file_path):
    """使用 ffprobe 获取音频文件的时长（秒）"""
    command = [
        "ffprobe",
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        file_path,
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True)
        return float(result.stdout.strip())
    except FileNotFoundError:
        print(
            "错误：'ffprobe' 命令未找到。请确保 FFmpeg 已安装并已添加到系统路径中。",
            file=sys.stderr,
        )
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"错误：ffprobe 无法获取文件时长。输出：\n{e.stderr}", file=sys.stderr)
        sys.exit(1)
    except ValueError:
        print("错误：无法将 ffprobe 的输出解析为浮点数。", file=sys.stderr)
        sys.exit(1)


def convert_flac_to_opus(input_file, target_size_mb):
    """
    将 FLAC 文件转换为指定大小的 Opus 文件。
    """
    if not os.path.exists(input_file):
        print(f"错误：输入文件 '{input_file}' 不存在。", file=sys.stderr)
        return

    # 1. 获取音频时长
    print(f"正在分析文件：'{os.path.basename(input_file)}'...")
    duration_s = get_audio_duration(input_file)
    if not duration_s:
        return

    # 2. 计算所需比特率 (kbps)
    target_size_bytes = target_size_mb * 1024 * 1024
    # 比特率 (kbps) = (目标大小(Bytes) * 8) / 时长(s) / 1000
    target_bitrate_k = int((target_size_bytes * 8) / duration_s / 1000)

    if target_bitrate_k <= 0:
        print("错误：计算出的目标比特率过低，请增加目标文件大小。", file=sys.stderr)
        return

    # 构建输出文件名
    base_name = os.path.splitext(input_file)[0]
    output_file = f"{base_name}.opus"

    print(f"  - 音频时长: {duration_s:.2f} 秒")
    print(f"  - 目标大小: {target_size_mb} MB")
    print(f"  - 计算比特率: {target_bitrate_k} kbps")
    print(f"  - 输出文件: '{os.path.basename(output_file)}'")

    # 3. 构建并执行 ffmpeg 命令
    command = [
        "ffmpeg",
        "-i",
        input_file,
        "-c:a",
        "libopus",
        "-b:a",
        f"{target_bitrate_k}k",
        "-map_metadata",
        "0",  # 复制所有元数据
        "-y",  # 如果输出文件已存在，则直接覆盖
        output_file,
    ]

    print("\n正在执行 FFmpeg 命令...")
    print(f"  {' '.join(command)}")

    try:
        subprocess.run(command, check=True, capture_output=True, text=True)
        print("\n转换成功！")

        # 打印实际文件大小以供比较
        actual_size_mb = os.path.getsize(output_file) / (1024 * 1024)
        print(f"实际输出文件大小: {actual_size_mb:.2f} MB")

    except FileNotFoundError:
        print(
            "错误：'ffmpeg' 命令未找到。请确保 FFmpeg 已安装并已添加到系统路径中。",
            file=sys.stderr,
        )
    except subprocess.CalledProcessError as e:
        print("\nFFmpeg 执行出错:", file=sys.stderr)
        print(e.stderr, file=sys.stderr)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="将无损 FLAC 文件转换为指定大小的有损 Opus 文件。",
        formatter_class=argparse.RawTextHelpFormatter,
    )
    parser.add_argument("input_file", help="输入的 FLAC 文件路径。")
    parser.add_argument(
        "target_size",
        type=float,
        nargs="?",  # 使其成为可选参数
        default=5.0,
        help="目标输出文件的大小（单位：MB）。\n如果未提供，则默认为 5.0 MB。",
    )

    args = parser.parse_args()

    convert_flac_to_opus(args.input_file, args.target_size)
```

:::

## make_new_subvolume

早期脚本，用于将文件夹转换为 btrfs subvolume，已不再使用

::: code-tabs

@tab fish

```fish
set dir $argv
sudo mv $dir{,.bak}
sudo btrfs subvolume create $dir
sudo cp --archive --one-file-system --reflink=always $dir{.bak/*,}
sudo rm -r --one-file-system $dir'.bak'
```

:::
