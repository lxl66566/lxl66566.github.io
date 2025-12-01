---
date: 2024-07-27
icon: gamepad
category:
  - 教程
  - 探索
tag:
  - Windows
  - Galgame
  - 游戏
  - 音频
---

# SPEED UP！与 galgame 解封包

本文主要包含了我对 galgame 语音加速的探索全过程。各章节大致按照时间顺序排布。主要内容在：[二试封包](#二试封包) 和 dll wrapper [v0](#dll-wrapper-v0) [v1](#dll-wrapper-v1)。

我打 [galgame](../hobbies/galgame.md) 已经有几年了，不过也只接触了几部能够语音加速的游戏：紫社全套和 _GINKA_（后来还玩了更多不一一列举了）。游玩这几部作品让我非常兴奋：使用二倍速播放音频，我就能节省一半的游戏时间，~~相当于延长了一倍的生命~~。经历过加速后，再次玩其他语音速度极低的 galgame （真红真红真？）让我感觉像是在浪费生命。因此我尝试寻找能够让我节省时间的游戏语音加速方式。

## 音频处理软件

音频处理领域很多软件都是商业非自由软件，要交钱的，毕竟音频处理本身也是天坑。而我找不到能对其他 APP 进行音频加速的软件。

写在这里的只是我试过的一部分：

- Equalizer APO：提供了易于编辑的 GUI 界面，用户可以自己创建不同的效果器和 filter。不过无法做到音频加速或音量均衡。
- Fxsound：开源效果器，可以让游戏加强脚步声等。不过延迟有点高，而且无法实现音频加速。

## CE

Cheat Engine 想必大家都不陌生，我也会使用 CE 进行 RPG galgame（兰斯系列）或者动效太多（型月）gal 的加速。CE 中有一个变速精灵的功能非常好用，用鼠标点几次即可轻松修改程序速度。但是 CE 不能加速音频（因为音频播放是调用操作系统 API），这也是 CE 的最大败笔。因此我需要另寻出路。

## 解包与封包

20240720 我尝试了一个想法：将 galgame 音频文件解包，加速后再封包回去。由于我不会逆向，因此使用的是 GARbro，这是一个非常泛用的，多目标 galgame 资源提取器。我使用 いろとりどりのセカイ HD 尝试，这个游戏把 `voice.bin` 单文件放在根目录下，非常明显，我很轻易地就提取出了游戏的所有 ogg 格式的语音。

那么我要如何将加速后的 ogg 封装回一个 `voice.bin` 呢？我被卡在了这一步下。GARbro 根据预设的解包规则检测出格式并解了包，但是却**不告诉我这个包用的究竟是什么格式**。Asuka Minato 也提醒：解包容易，但封包可能非常困难。因此我暂时打消了这个想法。<heimu>[二试封包](#二试封包)</heimu>

## pyaudio

20240724 我进行了初次尝试，写一个 python 脚本建立了一个系统音频合成器到扬声器的音频流，在中间使用脚本进行音频加速。

首先安装一个 VB Cable，其作用是修改输入输出设备，防止音频合成器直接将音频输出到扬声器，覆盖掉我处理后的输入。然后脚本大概是这样：

```py
import time
import pyaudio

# 配置音频流参数
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
CHUNK = 1024

SPEED_FACTOR = 1.5

p = pyaudio.PyAudio()

def list_audio_devices_and_return_vb_cable():
    info = p.get_host_api_info_by_index(0)
    num_devices = info.get("deviceCount")
    device_map = {}
    for i in range(num_devices):
        device_info = p.get_device_info_by_host_api_device_index(0, i)
        device_name = device_info.get("name")
        device_map[device_name] = i
        print(
            f"Device ID: {i} - Name: {device_info.get('name')} - Input Channels: {device_info['maxInputChannels']}, Output Channels: {device_info['maxOutputChannels']}"
        )
    return 0, 6     # 直接返回 device id, for testing


# 获取设备索引
input_index, output_index = list_audio_devices_and_return_vb_cable()
print(f"VB-Cable Input: {input_index}, VB-Cable Output: {output_index}")

input_stream = p.open(
    format=FORMAT,
    channels=CHANNELS,
    rate=RATE,
    # rate=int(RATE * SPEED_FACTOR),
    input=True,
    frames_per_buffer=CHUNK,
    input_device_index=input_index,
)


def callback(in_data, frame_count, time_info, status):
    out_data = input_stream.read(frame_count, exception_on_overflow=False)
    return (out_data, pyaudio.paContinue)


output_stream = p.open(
    format=FORMAT,
    channels=CHANNELS,
    rate=int(RATE * SPEED_FACTOR),
    # rate=RATE,
    output=True,
    # frames_per_buffer=int(CHUNK / SPEED_FACTOR),
    frames_per_buffer=CHUNK,
    output_device_index=output_index,
    stream_callback=callback,
)

# 检查是否成功打开
if input_stream.is_active() and output_stream.is_active():
    print("输入和输出流已成功打开。")


try:
    while True:
        time.sleep(0.1)

except KeyboardInterrupt:
    # 用户中断程序时，关闭音频流
    input_stream.stop_stream()
    input_stream.close()
    output_stream.stop_stream()
    output_stream.close()
    p.terminate()
    exit(0)
```

音频的模型可以想象成拥有一个 trunk 缓冲区，音频先被输入到缓冲区，然后再播放出去，而这个缓冲区归我所有，我可以对其进行任意操作。

先列出所有音频设备，然后指定音频合成器作为输入流，扬声器作为输出流，定义了一个 callback 函数让输出流可以直接通过 callback 去请求输入（也可以不用 callback，将逻辑写在 while True 里）。至于音频加速则体现在 output stream 的 rate 上，因此实际上没有对音频进行任何处理，只是改变了输出速率。

实际测试中，音频输出速度和频率确实升高了，但是表现为 (输出一段加速的音频 -> 静音一段时间) 的循环。这是因为 trunk 的输入速率是恒定的，pyaudio 会 wait trunk 填满。如果我加速把 trunk 的音频打出去，那么就会有一段时间，trunk 里不存在音频，所以没有输出。

把 CE 和此脚本一起使用也还是一样的效果，因为 CE 本身不能加速音频，也就无法加速程序对 trunk 的填充速度。因此此次尝试失败，感觉尝试的方向就是错的，没法通过音频倒逼游戏速度。

## TAS

20240727 （也就是本文撰写时间），我突然想到，TAS 是把游戏慢放，那么反向 TAS 是否就能够加速游戏呢？并且 TAS 视频中游戏声音是正常的，显然 TAS 有自己的办法处理游戏音频速度，所以理论上一定是行得通的。

### libTAS

首先我尝试了 libTAS，这是一个泛目标开源 tas 库+软件，许多其他 TAS 生态是建立在 libTAS 上的。libTAS 只能运行在 linux。libTAS 在 NixOS 上的打包不算太好，低了一个版本，也缺失了 libtas32.so 库导致没法运行 32 位 exe，需要手动用 `LIBTAS_SO_PATH` 拉；然后 libTAS 运行时会去找 libalsa，NixOS 的 dynamic link 管理又是混沌与邪恶的，因此我还需要大费周章手动用 `LD_LIBRARY_PATH` 把运行库拉进来。

这一切做好以后，游戏还是打不开，显示 _HD 不是一个有效的 binary_… （HD 是游戏路径上的一个词）我怀疑它 parse 参数出了问题，但是我没有证据，它也不输出它用的启动指令。

后来我自己打了 1.4.6 的 libTAS 包，然后自己打了一串超级长的启动指令：

```sh
LD_LIBRARY_PATH=/tmp:/nix/store/1ry2s2jgqbl3w7w54b8biylwqdxy52zw-steam-fhs/usr/lib32/:LD_LIBRARY_PATH LIBTAS_SO_PATH=/tmp/libtas.so WINEPREFIX=/home/absx/.local/share/wineprefixes/origin libTAS
```

嗯，steam-fhs 还是好用的。现在我的游戏已经起来了，但是我发现我不会用 libTAS，无法调速。。反正 README 说的快捷键，TAB 和 V 这些都是用不了的，在 Qt GUI 窗口里设置速度也没有任何效果。

尝试在 windows WSL2 里用 libTAS，结果还要起 wine，那跟我在 linux 没有任何区别。不测了。

### hourglass

转战 windows，hourglass 也是一个泛用 TAS 工具，仅支持 win32，不过它已经非常老了。我只是想试试看，没想到 hourglass 真的可以让我的游戏跑起来，并且能够改变游戏音频速度！但是 hourglass 有一些致命的缺陷：

1. 不支持鼠标
2. 减速有多档位可调；但是加速只有一个 fastforward 用于快进的，大概有 10 倍速并且不可调。这个速度还不如不听语音（骂人）。

基于这些原因，hourglass 也无法使用。但它的存在是有意义的：它至少给了我一个成功的例子，告诉我前方并非是一片黑暗，我做的事情并不是毫无希望的。

### 其他

尝试其他 TAS，但几乎找不到其他泛用的 TAS 了。TAS 世界的 tools 大多还是针对某个游戏或某个模拟器，这种任意进程加速的工具真是少之又少。

- BizHawk：泛用 TAS 工具，但仅支持镜像加载，主要针对游戏机，不符合我的需求。
  - 不过也有一些 galgame 是使用 CD 的，我只能说保留尝试的可能性。
- UniTAS：专门针对 unity 游戏，有的 galgame 使用 unity 引擎的可能可以尝试。不过真心不多。
- [Hourglass-Resurrection](#hourglass-resurrection)：一个 hourglass fork，但是也已经停更了。没有提供二进制，我尝试自己构建也失败了（VS 除了点构建运行就啥也不会干了）。后面有更详细的尝试过程。

### [libspeedhack](https://github.com/evg-zhabotinsky/libspeedhack)

20240729：虽然很麻烦，但是我还是为了仅存的一点希望去尝试一下 libspeedhack。作者已经消失两年了。我按照说明直接用，不出意外地出了意外： `libspeedhack32.so: undefined symbol: floor`. 然后去瞄了下 issue，果然有一个一样的问题，并且别人也修了，开了 pr 在构建时加了个 `-lm` 参数。然后我很开心，拉下来想构建，结果：

我们的 NixOS 实在是太棒啦！环境根本搞不起来，它的构建指令需要静态链接 + cross 32 位，什么 libclang，glibc_multi 的包直接加进去根本满足不了需求，再加上我根本不知道在 buildInputs 里能写哪些玩意，比如 glibc 就能写 `glibc.static`， glibc_multi 能写 `glibc_multi.dev`，这种有个点后面跟着啥玩意的我除了读 nix 源码也想不到要去哪查。

然后去我的 debian 云服务器上尝试构建，东西都装好了，然后没有数学库：`ld: cannot find -lm: No such file or directory`。我又把 `libm.so` 拿出来装到 `LD_LIBRARY_PATH` 里，继续构建，又会得到：

```
/libc.a(malloc.o): relocation R_X86_64_TPOFF32 against 'tcache' can not be used when making a shared object; recompile with -fPIC
ld: failed to set dynamic section sizes: bad value
collect2: 错误：ld 返回 1
```

一度让我想放弃。问了下 gpt-4o，让我不要把 libm.so 在构建时链进去，应该在运行时加载。于是我最后的尝试成功，修改它给的启动脚本：

```sh
#!/usr/bin/env bash

rm -f /tmp/speedhack_{pipe,log}
mkfifo /tmp/speedhack_pipe

_libdir=/home/absx/lib      # （我把东西存这里）
LD_LIBRARY_PATH="${_libdir}/lib:${_libdir}/lib64:${_libdir}/lib32${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}" \
LD_PRELOAD="libspeedhack.so:${_libdir}/libm.so:${_libdir}/libm32.so:${LD_PRELOAD:+:$LD_PRELOAD}" \
exec "$@"
```

这样把 `libm.so` 作为 `LD_PRELOAD` 运行时加载进 `./start.sh wine xxx.exe` 即可。

游戏打开了，但是……我加速呢？我 `echo 2.0 > /tmp/speedhack_pipe` 都要按冒烟了，所以我的加速呢？？不只声音，就连游戏本身也没有加速，就跟 libspeedhack 不存在一样地和谐。于是此次尝试又宣告失败，骂这个跑路项目也解决不了什么，还是不骂了。

> ps. 事实上，通过源码也能知道，Github 上的这些 libspeedhack、[Letomaniy/Speed-Hack](https://github.com/Letomaniy/Speed-Hack)、[Hirtol/speedhack-rs](https://github.com/Hirtol/speedhack-rs) 等 speedhack 并不涉及音频 api 的修改，因此不可能有音频加速效果。妄图通过简单的一点点源码实现加速只能说是天方夜谭。

## [Speedy](https://github.com/game1024/Speedy)

一个简单点点点就能加速窗口的国人开源软件，比较电脑小白向。最高支持数千倍加速，体验还不错，但是跟 CE 一样，[也不支持音频加速](https://github.com/game1024/Speedy/issues/151)。

## 源码构建

20240803：到了这一步，市面上的各种现有软件看起来已经是山穷水尽了，我开始把目光转向修改代码。

一个选择是读 wine 的音频 api 然后写点 lib 注入。另一个选择看起来成功率更大一些，那就是直接修改 hourglass 的代码，毕竟人家的功能可行性已经通过了验证。

hourglass 是 C++ 写成，调的都是 windows api，项目管理用 vs sln。我之前从未用 vs 写过 C/C++ 代码，而且 C++ 构建本来就是一坨，还是去构建已经不再维护的代码，因此预感此次修改也不会顺利。

### [Hourglass-Resurrection](https://github.com/lxl66566/Hourglass-Resurrection)

这是一份 7 年前的代码，Hourglass 的重生版。不抱希望搜了下 fork，没啥大修改，因此开始 clone。

想修改代码第一步就是跑过编译，因此我开始折腾编译。扔到 vs 2022，一编译，一大堆报错。这些报错还都挺抽象的，例如有个叫 `IDirectSoundSinkFactory` 的玩意找不到声明，但是我把它宏解了能看到声明。Google 也搜不到这玩意。

我看 Hourglass-Resurrection 有一个 [7 年前跑的 CI](https://ci.appveyor.com/project/Warepire/hourglass-resurrection/branch/master) 是可以过构建的，用的是 msbuild。于是我下载 .Net sdk，发现：

1. msbuild 本身不会在安装时被加入环境变量，要用绝对路径调用。
2. windows sdk 版本不匹配，于是我去下载了 10.0.22621，重新 build。
3. 报 `error MSB6001: “CL.exe”的命令行开关无效。` 猜测应该是本机的 clang 太新导致的。

我也想过装老版本 vs，下载后发现不同版本 vs 不能共存。于是打消念头。

不想再折腾本机，跑去写 Github CI。结果找的 install windows sdk CI 没一个能用的，我指定的 22621 version 要么找不到，要么就是脚本内部错误。然后我也不指定版本了，改用 `choco install visualstudio2022buildtools windows-sdk-10.0`，结果花了好几分钟安装后告诉我还是找不到 msbuild。。太经典了。

又继续啃了一会，给一堆 struct 和 macro 移形换位，编译不报错了，取而代之是链接爆了一大堆 error：`LNK2001 无法解析的外部符号`。。这下我是真没辙了。

### [hourglass-win32](https://github.com/TASEmulators/hourglass-win32)

这个是原版 hourglass 代码，年代更加久远了，距今有足足 14 年的历史。

用 vs 2022 打开，跑一次构建，没想到居然能够把 GUI 跑起来，已经很厉害了。不过逻辑是没有的，构建时出了挺多错误。

这些 error 看起来比 Hourglass-Resurrection 好读多了，我猜测是 C++ 编译器标准太高导致的编译低版本不兼容的问题。尝试降低 C++ 编译器版本，vs 告诉我：我们接受指定的最低版本是 C++14 😅。

## 自己写

干到现在我已经不想再折腾构建了，不如干脆读代码，然后开抄，写一个自己的注入 lib。我的想法很简单，只加速音频播放，不加速游戏本身（如果想要两个都加速，那就再开一个 CE）。

从读代码角度来说，Hourglass-Resurrection 还是比原版要好很多的，~~虽然 C++ 项目一直都很难读~~。最重要的显然是 `source\hooks\hooks\soundhooks.cpp`，它是整个音频加速的核心；并且可以看到文件在最后定义了注入/拦截（Intercept），将以下函数全部干掉了：

#### WinSound

- PlaySound 系列：PlaySoundA, PlaySoundW
  - 这是 windows 早期的简单音频播放 api，只需要提供文件名即可。W 和 A 指文件名的编码。由于我们不能直接获取到音频 buffer，因此只能将音频加速后保存到 temp 再调用函数。
  - 但是 Hourglass-Resurrection 把这两个 api suppress 了，那我就干脆不管了，遇到问题再说。
- waveOut 系列，包含 waveOutWrite, waveOutGetPosition, waveOutReset, waveOutOpen。这几个貌似就没法操作 buffer 了，毕竟这个 api 就是操作 tick 用的，可能只能用 tick 魔法了。不过理论上应该也不难。
  - 保留用 waveOutSetPlaybackRate 强改的可能。
- Beep 系列，MessageBeep 和 Beep。这也是 suppress 的，目的应该是 TAS 那边的，不用管。

#### DirectSound

- DirectSoundCreate(8), DirectSoundEnumerate(A/W), DirectSoundCaptureEnumerate(A/W)，这几个是重点，毕竟游戏都调用的 DirectSound，因为可以叠加音频播放。
  - 这些函数可就麻烦了，**Hourglass-Resurrection 自己写了一个 DirectSound 的音频驱动程序**，包括前面的 EmulatedDirectSoundBuffer 也是。我这才知道文件开头的一堆 magic number 是干什么用的。显然我没有自己写驱动水平。
    - 所以如果不写驱动，那么需要 hook 的函数就不能是这些，这些函数是用于创建驱动用的。需要 hook 的应该是 `IDirectSoundBuffer::Lock/Unlock/SetFrequency` 等。
  - 往细想下去就更不得了了：学它直接操作 tick 可能并不能实现不变调加速。或许我听到的 Hourglass 的音频加速只是破碎的 buffer 拼成的音频；10 倍速下确实听不出音频究竟还是否完整。

而起初我并没有发现这些问题，我先写了点操作 buffer 的代码……

### rust

我不想碰 C++（即使已有代码作参考），先用 rust 碰碰壁再说。

试了一下 [detour-rs](https://github.com/darfink/detour-rs)，一个 detour 的 rs 实现，但是拉下来发现编译不过。issue 看到了一个 fork 解决了这个问题，才发觉 detour-rs 已经断更三年了。所以使用此 fork 版本的 [retour-rs](https://github.com/Hpmason/retour-rs)。fork 版的文档也更详细，我用它的 example 配合文档推荐的 [dll-syringe](https://crates.io/crates/dll-syringe) 跑了一下，成功注入了 MessageBoxW，完成了新手教程。

但接下来才是痛苦开始。[rust 音频处理生态](https://rust.audio/)本来就挺烂的。我先尝试的肯定是[rubato](https://crates.io/crates/rubato)，毕竟简介就是速率变换。结果这玩意并不咋样，几乎无文档，examples 里面几百行也没有解释。我把 wav 用 python 转成 f64 raw，跑一遍 example 再转回去，并不是一个可用的音频。

### dll 调库

退一万步，如果用现有的 dll 库呢？我尝试了一下行业用得比较多的 [soundtouch](https://codeberg.org/soundtouch/soundtouch.git)，[写了个 python 小脚本](https://gist.github.com/lxl66566/f7dc49be8a08f2746b4179ccd3b2b378)做测试。soundtouch 的 api 设计就要好得多，用户只需要 put 和 receive 就行了。但是我用 `receiveSamples` (处理 float 数组) 系列测试就返回值为 0（应该要返回数组长度），数组没有被改动；用 `putSamples_i16` 系函数（i16 系是 float 系的包装，包了一层转换）甚至有 bug，直接 internal `OSError: exception: integer divide by zero`。非常郁闷。

### 打击

此时我终于读懂了 Hourglass-Resurrection 的代码是自己写 DirectSound 的驱动，并且也发现操作 tick 并不能实现真正的音频加速，最终的道路一定是 buffer。于是我陷入了消沉：做一个音频加速的复杂度已经远超出了我的想象，即使知晓了音频加速原理，也很难面对一大坨 windows sound api。我目前摸索的这些知识在脑子里并不能合到一起。

## 二试封包

转眼过了半年来到 2025，我在推 _空に刻んだパラレログラム_ 时看到 xp3 格式的文件，又忍不住想起了拆包封包的思路。由于 xp3 是老牌（20+years）的广泛使用的格式，网上的资料非常多，可谓是帮了大忙。我先尝试用 GARbro 拆包，接着用[网上找的脚本](https://github.com/awaken1ng/krkr-xp3)封回去。封完的包比原先的大了十多 MB，心里还是有一些不安的。打开游戏，发现居然可行！！游戏可以读到音频文件！

于是我激动得立刻开始 LLM 写脚本，用 ffmpeg 加速音频。写完运行，发现脚本解包有问题。我怀疑是这个 krkr-xp3 只支持 xp3 v1，而 galgame 用了 v2 打包。不过无伤大雅，我只需要封包能力即可，所以我利用 GARbro 解包后，改一下脚本，将包封回 xp3 即可。实测可以正常游玩。（详细方法，请点击下方表格中 xp3 展开查看）

上述操作让我可以倍速语音游玩所有具有 krkr 移植的 galgame，简直不要太爽。

尝到甜头后，我又开始审视起我仓库中的其他 galgame。下面的表格记录了我的游戏语音加速尝试与心得（时间顺序），可以点击对应条目查看详细内容。

因为我的每个 galgame 都会折腾一番音频加速，因此也写了不少工具。这些工具可以在我的 [Github profile](https://github.com/lxl66566) 下方展开 _Galgame tools_ 查看，下面的表格展开中有的代码里用到的指令就是这些工具。

<SpeedupList>
<template #krkr_xp3>

- ~~最初我先是 [fork 了一个 python 的 repo](https://github.com/lxl66566/krkr-xp3)。这个 repo 解包有些问题，需要使用 GARbro 解包后，再使用脚本进行音频加速与封包。~~
- 后来我又用 rust 重写了一个 [xp3-pack-unpack](https://github.com/lxl66566/xp3-pack-unpack)，这个借助了 xp3 crate。

注意，xp3 引擎的游戏需要看一眼 `patch.xp3` 里有没有音频，那里面的音频也需要加速。

</template>
<template #Artemis>

解封包工具：[sakarie9/pfs_rs](https://github.com/sakarie9/pfs_rs)，这也是一个使用 rust 写的的解包封包工具，我对 rust 工具天生具有好感，项目的质量也不错。

解包樱之刻，我一搜 Artemis Engine，出来[一篇文章](https://www.bilibili.com/opus/568495301662731170)告诉我其实这个引擎不需要封包……实测了一下，果然如此。只需要用 GARbro/其他解封包工具解出来，批量加速后放到 exe 所在文件夹即可。

不过不封包会导致 luna translator 的 hook 失效，估计是不封包就直接读 .ast 文本，不会再经过 hooked 函数了。因此我们可以把 script 重新封回 pfs archive，这样就可以让 luna translator 读到文本。封包时要注意，pfs_rs 会把 input 的所有子文件/文件夹封到 pfs archive 的根下，因此不能直接 `pfs pack scripts root.pfs`，需要先建一个 test dir，把 scripts 移进去再 `pfs pack test root.pfs`。

ps. 也可以 GARbro 直解，反正不用封包。

其他心得：

- 如果游戏（流星·世界演绎者系列）不提供关闭系统语音的功能，可以直接把 sysse 解出来换成 `none.ogg`（随便一个空音频）即可。

</template>
<template #favorite>

FAVORITE 的 .bin 格式也有 [fvp-tools](https://github.com/lxl66566/fvp-tools)。这是我的 fork 版本，修改了其对于解包后文件名的处理。

因为不管是 GARbro 解出来的还是原版 fvp-tools 解出来的，直接封包都不行。它们对于文件名的处理不太行，本来应该是类似 `00000001` 的八位数文件名，原版 fvp-tools 解出来是 `0001_00000001`（添加序号），GARbro 解出来是 `00000001.ogg`（添加后缀），然而 fpv 引擎要求比较严格，不允许自己加这些乱七八糟的。

总之，SPEED UP 的初衷就是干翻 FAVORITE，我的目的已经达成了。

</template>
<template #WOH>

魔法使之夜的解包遇到了一点麻烦。首先一大堆 `data00000.hfa` 并不能看出哪里是语音，哪里是其他素材。其次，GARbro 没法解 hfa 存档，我的心已经凉了一半。

然后在网上找了一个 [mahoyo_tools](https://github.com/loicfrance/mahoyo_tools)，但是这玩意只说能解图像和脚本，不包含音频。而且 star 数和 README 讲的都很糊，根本不会用。(不过代码质量倒是挺高的)

</template>
<template #ypf>

### 首次尝试：失败

尝试解包/封包一个 YU-RIS 引擎的游戏，这玩意也是个老牌引擎了。

GARbro 打开 .ypf 时会提示猜测密钥，能够顺利解包。但是不得不骂，GARbro 并不会告诉我猜到的密钥是啥，并且封包的时候要求必须提供 8 位密钥。

尝试其他工具：

- [fengberd/YuRISTools](https://github.com/fengberd/YuRISTools) / [pre compiled](https://drive.google.com/file/d/1fDa4RaUz2oJUKO6cTLfSEqaAawNSQd3m/view) / [src](https://forums.fuwanovel.moe/topic/24704-a-complete-guide-to-unpack-and-repack-yu-ris-engine-files/)：能够免密钥打包，但是打出的结果不同，并且运行会爆炸。
  - 如果我直接 unpack `vo.ypf` 会得到 `Unsupported YPF engine version: 500`，因此我得到了 engine version。但使用该 version 进行 pack 也是无效的。
- [python-YU-RIS-package-file-unpacker](https://github.com/mwzzhang/python-YU-RIS-package-file-unpacker)：只能解包不能封包。
- 根据 [ypf ファイル差し替え展開方法](https://wikiwiki.jp/mozanashi/ypfファイル差し替え展開方法)，将 pack 的 ypf 文件命名为 `update2.ypf` 放到 pac 里，提示 xxx.ogg 冲突。但是如果只保留 `update2.ypf` 而不保留原先的 `vo.ypf`，则又无法启动。
- [fuwanovel 论坛中的一篇帖子](https://forums.fuwanovel.moe/topic/24704-a-complete-guide-to-unpack-and-repack-yu-ris-engine-files/)提到使用官方的 YSPac 进行打包。该软件虽然用 LE 可以运行，但是拖动文件夹到其中是无响应的，因为 LE 并不能自动转译文件地址。

受不了了，直接（用 LLM）读 GARbro 源码，找到它猜测密钥的方法，然后让 LLM 写一个同功能脚本：

```py
import struct
import sys


def guess_ypf_info(file_path):
    with open(file_path, "rb") as f:
        # 读取文件头
        magic = f.read(4)
        if magic != b"YPF\x00":
            if magic == b"MZ\x90\x00":
                # 这里简化处理，实际应该像C#代码一样查找YSER
                print("这是一个EXE文件，需要查找内部的YPF数据")
                return None
            print("不是有效的YPF文件")
            return None

        # 读取版本号和文件数量
        version = struct.unpack("<I", f.read(4))[0]
        count = struct.unpack("<i", f.read(4))[0]
        dir_size = struct.unpack("<I", f.read(4))[0]

        print(f"YPF版本: {version}")

        if count <= 0 or dir_size < count * 0x17:
            print("无效的文件数量或目录大小")
            return None

        # 跳到目录开始位置(0x20)
        f.seek(0x20)

        # 读取第一个文件项
        name_hash = struct.unpack("<I", f.read(4))[0]
        name_length = (~struct.unpack("B", f.read(1))[0]) & 0xFF

        if name_length < 4:
            print("文件名长度过短，无法猜测密钥")
            return None

        # 读取加密的文件名
        encrypted_name = f.read(name_length)

        # 查找倒数第四个字节（应该是加密后的点号位置）
        encrypted_dot = encrypted_name[-4]

        # 计算密钥：加密的点号字节与实际的点号字符异或
        key = encrypted_dot ^ ord(".")

        print(f"猜测到的YPF密钥: 0x{key:02X}")

        # 尝试解密第一个文件名来验证
        decrypted_name = bytes(b ^ key for b in encrypted_name)
        try:
            decoded_name = decrypted_name.decode("cp932")
            print(f"第一个文件名: {decoded_name}")
        except:
            print("警告: 文件名解码失败，密钥可能不正确")

        return version, key


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"用法: python {sys.argv[0]} <ypf文件路径>")
        sys.exit(1)

    guess_ypf_info(sys.argv[1])
```

得到密钥为 `0xC9`，version 为 500。使用 GARbro 指定密钥（“8 位密钥” 处要写 `C9`）与版本进行打包，放入游戏，报错。然后用 fengberd/YuRISTools 一读，好家伙，version 变成了 1280。我真觉得莫名其妙，什么傻逼打包啊。([然后提了个 issue，是我最后的仁慈](https://github.com/crskycode/GARbro/issues/79))

继续找打包工具，找到 [crskycode/YPF_Tool](https://github.com/crskycode/YPF_Tool)，免密钥打包，放到游戏，能正常运行。人家的也是 C# 写的怎么爆杀你 GARbro 啊。

结果发现 `vo.ypf` 文件能正常读取，但是没法播放。。尝试了下 `update2.ypf` 也不行。搞不懂 YU-RIS 了，我猜每个语音文件或者整个 `.ypf` 在其他地方还有放校验。

过程中的其他发现：

- 如果 pac 文件夹里含有额外没用上的 `.ypf` 文件，游戏会无法启动。游戏根目录下的 .ypf 也会被读，影响游戏本体。
- 在游戏根目录找到一个 `ysfchk.ini` 文件，里面记录着每个 ypf 对应的 CRC-32 校验 hash。该文件对运行游戏没有影响，但是如果用 `ファイル破損チェック.exe` 验证，本质上就是用这里的 hash 进行验证。
- python-YU-RIS-package-file-unpacker 给了 ypf 的文件定义，但是没有解释说明。用 LLM 写的逆向 packer 的输出和源文件不同，每个 file_entry 的 body_ofs 四个字节都错了。

后来我又[装了个日版 windows](./windows_setting.md#日版-windows-10)，尝试了一下最后的希望，也就是用 YSPac 封包。结果 <http://yu-ris.net/> 的都测过一遍，要么 gal 崩溃要么无声。打开 ypf 版本一看，YU-RIS β4.8 2025/04/30 打出来的 ypf 版本还是 492，还没有本游戏的 500 高。而这游戏已经是三年前的了。属实是活全家引擎。

所以，要么再等几年等 YU-RIS 发新包，要么就直接 quit 下桌不玩。

### update1

下载猫忍之心，也是 ypf 引擎，打印出版本也是 500，心已经凉了一半。不死心，再次尝试封 ypf，找到一篇 [flamecho 的文章](https://www.flamecho.top/posts/47.html)介绍了两个 ypf 工具，其中一个是 YPF_Manager_Tool，源码貌似是 [Xorboth/YPF-Manager](https://github.com/Xorboth/YPF-Manager) 的。抱着一丝微弱的希望尝试了一下，没想到啊没想到，它居然真的能封出可用的包！！！千古（6 个月）难题迎刃而解，还是有点激动的。

```sh
# 假设把 YPF Manager 重命名为 y.exe
./y.exe -e vo.ypf
... # SPEED UP!
./y.exe -c vo -v 500
```

另一个程序好像是专门用于文本提取翻译的，这里不再尝试了。

然后我 [fork 了 YPF-Manager 的源码](https://github.com/lxl66566/YPF-Manager)，并且写了一个 github CI 来 build binary。

</template>
<template #escude>

escude 家的游戏是 bin 格式，GARbro 可解不可封。

工具尝试：

- [marcussacana/EscudeEditor](https://github.com/marcussacana/EscudeEditor)：可用。使用方法：
  1. 打开 GUI，右击空白处，选择 _Packget -> extract_，将 voc.bin 提取。（默认提取到同文件夹下）
  2. ffmpeg 批量语音加速
  3. _Packget -> repack_
- [cottony-vase-131 的工具](https://cottony-vase-131.notion.site/GameTools-7fea11732ecd4e398896414a31fef431)：专门处理脚本的工具，无法使用
- [TheVNConnoisseur/Bincude](https://github.com/TheVNConnoisseur/Bincude)：202508 才出的新工具，mark，未尝试

</template>
<template #unity>

尝试解包 _旭光のマリアージュ_。用 bandizip 打开 .dat 文件，显示是一个 zip 压缩包。文件名没有加密，可以看到语音（sound）在 `data_05.dat` 和 `data_06.dat` 里。解压，需要密码。找密码，在[别人的博客](https://blog.chenx221.cyou/2021/09/04/galgame-游戏解包记录/)找到密码为 `IrsysPack_CipherKey`。于是提取成功。

加速完（注意避开 se 和 bgm），准备封包，结果 bandizip 打出的 zip 用不了，开游戏有出场动画，但是进不去标题，黑屏。无论开不开压缩级别都是这样。

查看源 dat，随便开了个[格式识别](https://rivers.chaitin.cn/tools/file)，显示 _Zip archive data, at least v2.0 to extract, compression method=deflate_。然后我又用了 7z 命令行，指定了 `-tzip -mm=Deflate -pIrsysPack_CipherKey`，再次打包，也不行。尝试 zip command，也不行。于是我不得不打开 imhex，看看这两个打出来的 dat 有什么区别。一看，发现打包的 header 和文件顺序不同，为了打出尽可能相同的 dat，我提取了文件顺序并喂给 7z：

```py
import subprocess
import zipfile
from dataclasses import dataclass
from pathlib import Path


@dataclass
class Task:
    original_zipfile_name: str
    speedup_folder: str


process = [
    Task(
        "data_05.dat.bak",
        "data_05",
    ),
    Task(
        "data_06.dat.bak",
        "data_06",
    ),
]

for task in process:
    with zipfile.ZipFile(task.original_zipfile_name, "r") as zip_ref:
        Path("test.txt").write_text(
            "\n".join(map(lambda x: x.filename, zip_ref.infolist()))
        )

    subprocess.run(
        f"""7z a -tzip -mm=Deflate -pIrsysPack_CipherKey {task.speedup_folder}.dat @test.txt""",
        shell=True,
        check=True,
        cwd=task.speedup_folder,
    )

Path("test.txt").unlink()
```

然后就可以用了。

ps. 后来发现用 7-zip 的仅存储打出来也是可以用的，都怪 bandizip！😡

</template>
<template #bgi>

首先，用 GARbro 是可以解 arc 的。不过需要勾选将音频转为常见格式。我想找一个命令行自动化解包 arc 的工具：

- [exoozoarc](http://asmodean.reverse.net/pages/exoozoarc.html)：傻逼玩意，运行后显示 _This application has requested the Runtime to terminate it in an unusual way. Please contact the application's support team for more information._
- [AllanZyne/bgi_tools](https://github.com/AllanZyne/bgi_tools)：内置了一个 arc.dll，然后在 python 脚本里加载。但是这个 dll 无法在 win11 上跑，_OSError: cannot load library 'xxx/arc.dll': error 0xc1_。这货的 dll 说不定是 32 位的呢。
  - 然后我去重新编译它的 dll，又改 build.py（不要再用 `cl.exe` 了！），各种 malloc 没有 cast `void *` 又要帮他擦屁股。好不容易编完了 `arc.dll`，一启动，_不能识别该文件！_ 给我气笑了。
- [vn-tools/arc_unpacker](https://github.com/vn-tools/arc_unpacker/releases)：使用 `--dec=bgi/arc` 后，报错 `not recognized by any decoder`。不是哥们，你名字都叫 arc_unpacker，2016 年 release 的包连 2013 年的 arc 都解不了，有点丢人了吧。
- [galgametools 里的两个 BGI 工具](https://github.com/000ylop/galgametools/tree/master/BGI解包/BGI解包器)
  - fxckBGI：这玩意不是解 arc 的，是注入 `BGI.exe` 的，而且不是命令行，我不喜欢。
  - BGIunpack\*0.1.1.rar：是命令行，但是必须用 GUI 选择。然后 _打开 ARC 文件失败！_
- [soratane/BGIscript_V1.0](https://github.com/soratane/BGIscript_V1.0)：基本没有使用方法（README 我信你个鬼！），仓库里的几个 exe 运行没有输出。
- [galgametools/AnimED](https://github.com/000ylop/galgametools/tree/master/AnimED)：看不懂，不会用，没有说明。
- [minirop/arc-reader](https://github.com/minirop/arc-reader)：据称支持 arc2 的格式。由于我不想装 libpng12 折腾 C++ 那边的傻逼环境，我直接让 claude-3.7 写了一个 [rust 版本](https://github.com/lxl66566/arc-reader-rs)的，效果出奇地好！！非常好 AI，干烂了傻逼 C 的编译。

对 _千の刃涛、桃花染の皇姫_ 来说，只需要解包 `data04` 开头的 .arc file 就行了。其他的要么是 bgm 要么是 system effect，不用管。

至于封包，[AllanZyne/bgi_tools](https://github.com/AllanZyne/bgi_tools) 里有一个非常短小精悍的封包脚本，并且不依赖于任何 dll/C/C++ 代码，激起了我的尝试欲望。嗯，虽然打出来的包和原先的有一些差别，不过至少能给那些 ogg 自动加上 headers，可以说是看起来挺先进的。结果不出意外地失败了：播放第一句语音时，_指定されたファイル [ data04xxx.arc : sen010100010 ] の登録中に致命的なエラーが発生しました_。

然后我尝试用 GARbro 自带的封包，采用 ARC/WillV2 格式。当然，此时的 `.ogg` 文件并没有经过处理。再次进入游戏，这回是弹窗提示错误，而不是直接闪退，说明 GARbro 的封包功能很可能是正常的。现在距离成功只差如何处理 `.ogg` 的 headers 了。

一共 40 bytes 的 headers，在同一个 .arc 中对比了几个文件后，发现只有 00000000 \[08, 0F\] 的 bytes 是有变化的。跟原 .ogg 做对比，很容易看出 \[08, 09\] LE 刚好是 `.ogg` 文件的 bytes 数。\[0A, 0B\] 都是 00 暂且跳过，只有剩下的 00000000 \[0C, 0F\] 我完全不知道是啥意思。在求助了 grok3 后，它指出，\[0C, 0F\] LE 有可能是该音频的帧数（持续时间 \* 采样率 44100Hz）。不过这里的帧数普遍比实际帧数高一些，误差 < 0.01s。所以我又想，这有没有可能是 ogg 的什么跟时长/大小相关的特征。

继续了解，发现 ogg 的 Vorbis 编码并不是定长帧，而是一个个的不定长 packet 组成的。当我打印出一个 ogg 的所有 packet 的 length 之和以后，神奇的事情发生了，这个 sum 的值刚好就等于 \[0C, 0F\] LE 的值！于是 ogg 封包就这样破解了。

![.ogg headers 示意图](/images/articles/speedup/arc1.png)

然后后来又花了亿点点时间优化 [arc-reader-rs](https://github.com/lxl66566/arc-reader-rs) 的代码，添加封包功能，添加测试。最后再用脚本一跑，轻松秒杀。

抬头一看，怎么一天的时间已经过去了。。。

多 arc 加速代码示例：

```py
from pathlib import Path
from subprocess import run

arcs = Path("Z:/voices")

def rc(cmd):
    run(cmd, shell=True, check=True)

for arc in arcs.glob("*.arc"):
    print(arc)
    rc(f"arc-reader unpack {arc}")
    unpacked = arc.with_suffix("")
    rc(f"loudness-normalize --target-lufs=-14 {unpacked}")  # 这里指定 lufs 是为了跨音频文件也能音量均衡。-14 是针对某一个音频组算出来的。
    rc(f"abs -s 1.95 {unpacked}")
    rc(f"arc-reader pack {unpacked}")
    # 对于较老的游戏，例如 AUGUST 的 大图书馆的牧羊人1 及更早的游戏，需要使用 arc-reader pack {unpacked} -v 1 标识
```

</template>
<template #silky>

### きまぐれテンプテーション

- GARbro：可解不可封
- [TesterTesterov/SilkyArcTool](https://github.com/TesterTesterov/SilkyArcTool)：首先我用 GUI 选文件（夹）无效，报 _ValueError: path is on mount 'Z:', start on mount 'C:'_。手动输入路径，可解可封，打开游戏不崩溃，但是播放语音时无声。还说 _Tested on Kimagure Temptation 18+ Patch_……我信你个鬼。
  - 比较好笑的是 pack compress 比不 compress 还要大，这 lzss 什么垃圾算法。
  - 这我怎么忍得了，直接 Claude 3.5 sonnet 重写为 rust！但是逻辑相同，不能用的还是不能用。
- 同作者的 [AI6WINArcTool](https://github.com/TesterTesterov/AI6WINArcTool) 也是同样的问题。

忍不了了，由于 SilkyArcTool 的解包是好的，我重新用 _Gemini 2.5 Pro Preview 03-25_ 写了解包代码 [lxl66566/SilkyArcTool-rs](https://github.com/lxl66566/SilkyArcTool-rs)，并让它根据解包代码反推封包代码，不要按原样写。结果真的能用！！于是结束了。

不过注意，pack 语音时不能用 compress flag，否则在对应语音会 `return error[ogg_sync_pageout()]`。并且语音 pack 产物无法在 GARbro 里打开。

### Butterfly Seeker

解 arc 也是非常顺利，加速均衡一气呵成，结果封包回去进入游戏发现并不能播放语音。

排查程序，对比同一个 `voice.arc` unpack + pack 结果，发现我的 lxl66566/SilkyArcTool-rs v0.2.0 有一个 bug，`metadata_block_size` 计算错误多了 4。于是修了。

进入游戏发现还是没法播放语音。然后注意到我的音量均衡 v0.1.2 会把大写 `.OGG` 变成小写。于是改完大小写就行了。

所以 Silky’s engine 对 header 还是蛮宽容的，即使值偏差了 4 也可以正常进游戏，导致玩了好久都没发现这个 bug，吐了。

### ふゆから、くるる。

已经研究出 [dll wrapper v1](#dll-wrapper-v1) 了，本来已经没有必要解封包；但是这一作的语音音量非常不均衡，只好再拆开进行一次 loudness normalize。好在我写的工具没有再出问题，一遍过。

封完包，惊讶地发现 voice.arc 的大小从 2.13 GB 减小到 807 MB，但是我并没有改变任何速度。喂！你的 ogg 到底是怎么编码的啊！

</template>
<template #softpal>

网上有[一篇文章](https://www.bilibili.com/read/cv25442292)讲了 softpal `.pac` 的格式探索，非常不错。

可知 softpal 引擎优先读取文件夹，所以实际上无需封包。softpal 是目前为止 speed up 最简单的格式，只需要用 GARbro 将 `voice.pac` 提到同名文件夹，加速即可。全程只需两步。

</template>
<template #npa>

- [exnpa](http://asmodean.reverse.net/pages/exnpa.html)：需要再下载一个 32 位的 zlib1.dll 才能用。这个工具只能解包，不能封包。
- [FuckGalEngine](https://github.com/Inori/FuckGalEngine/tree/master/Nitro+) 的工具集：
  - `exsgnpa` 没法使用。
  - `S;G解包封包工具.7z` 里有 pksgnpa.cpp 源码（有些编译错误需要修复），编译后在测试的含有单文件的文件夹里可以打包 npa，但在我的音频文件夹上会 `failed(-1073741819)`。
    - LLM 重写为 rust，可打包，但是打的包不能用。一看 hex，好家伙，全错。鉴于 exsgnpa 的源码也没法用，估计这个包只能用于 Steins;Gate 的解封包。
- [nipa](https://github.com/Wilhansen/nipa)：可解可封，非常好用。

然后老的 `voice.npa` 要记得改后缀，不然会被读到。

</template>
<template #AKABEiSOFT3>

没有汉化只有机翻补丁，GARbro 打不开，网上搜不到任何信息。无解，除非去做整套 crack 流程。

然后尝试了下 [GARbro Mod](https://github.com/crskycode/GARbro/releases/tag/GARbro-Mod-1.0.1.6)，能打开并且能正常提取音频。按照惯例，procmon 看下能不能免封包，很遗憾，不能。接下来只要解决封包即可。

AKABEiSOFT3 官网没有给出任何工具下载；GARbro Mod 里有创建 `DAT/EGO/1` 格式的选项，但是打出来扫一眼格式明显不对，这里的 DAT 肯定是其他引擎的封包格式，肯定是指望不上了。[Hikarinagi 的一篇帖子](https://www.hikarinagi.xyz/p/14857)提到是 2dfan 里的大佬帮他封包，然而 2dfan 做的垃圾导致帖子可见范围非常小，许多帖子被删除且无法搜索。后来发现该游戏（_空色イノセント_）也是引擎检测不通过，具体看后文。。

Github 搜关键词，有效的只搜到一个 [akabeisoft3Danshi 汉化.md](https://github.com/beef-potato/beefpotatoBlog/blob/595e062579ff416784afedd5b0476664fbbc48de/docs/akabeisoft3Danshi汉化.md)，里面说到 _手垢塗れの堕天使_ 使用的引擎是 krkrz。。emmm，确实，虽然同为 AKABEiSOFT3 但是它们的引擎确实是不一样的，参考 vndb，让我白高兴一场。

既然 AKABEiSOFT3 引擎各种各样，那就不能用它做关键词。使用 yaneurao 搜索，定位到其当前官网，这是一个开源引擎，并且提供了[工具下载](https://bm98.yaneu.com/infoseek/yaneSDK2nd/)。尝试下载了 yanePack101 和 yanePackEx102 用来打包，首先它的输入只能是文件而不是文件夹，其次打出来的包跟游戏里的 voice.dat 也不太像啊，一堆 80 都没有出现。

</template>
<template #LCSE>

工具：[cqjjjzr/LCSELocalizationTools](https://github.com/cqjjjzr/LCSELocalizationTools)

```sh
# unpack
java -jar LCSEPackageUtility-rv4.jar --unpack -l SoundPackSEVo.lst --package SoundPackSEVo -o -d "./extracted" --key 02
# pack
java -jar LCSEPackageUtility-rv4.jar --patch -l SoundPackSEVo.lst --package SoundPackSEVo -o -d "./patched" --patch-dir "./extracted" --key 02
```

能用，不过吐槽一下，这个 patch 而不是 pack 的形式非常慢，1w5 的音频跑了几十分钟（

</template>
<template #krkr_xp3_enc>

加密的 xp3 就没法直接用 [xp3-pack-unpack](https://github.com/lxl66566/xp3-pack-unpack) 解封包了。不过 GARbro 可以解封加密的 xp3，只要游戏有被收录到密钥列表里就行，这里列举的游戏都属于此类。

GARbro 打 xp3 有不同版本（1，2，Z），如果没声的话建议多试试。还有路径压缩就没必要开了，~~只会影响我试错的速度~~。

<!-- prettier-ignore -->
| 游戏 | xp3 版本 |
| ---- | -------- |
| Deep One | Z |

</template>
<template #CatSystem2>

`.int` 类型的封包。直接放到 GARbro 里还需要给出压缩文件参数，密码 + 密钥，可以通过 exe 路径提取。

### 白昼夢の青写真

我尝试使用原版 `白昼夢の青写真.exe` 提取参数，失败；使用 `cs2.exe` 或 `cs2_cn.exe` 提取成功，密钥为 `D9A3FB64`。成功解包后，前 105 个文件是 `.ogg`，后面有各种后缀的文件，例如 phh 等，但是二进制都以 `OggS` 开头，所以文件名像是还套了一层凯撒密码。这倒是无所谓，我的音量均衡是靠抓二进制的 header 判断文件类型的，而加速也可以自定义各种后缀，要匹配上都是没问题的。

问题出在 GARbro 没法封包 int 类型存档：_尚不支持创建加密压缩文件。_ 因此最好还是另寻出路。

#### [CatSystem2-Simple-Translating-Tools](https://github.com/Wolverator/CatSystem2-Simple-Translating-Tools)

这玩意属于是把饭喂到嘴边，专为翻译人准备的，python 脚本解包也只是把文本提取出来，中间产物全部删掉，或者不解（pcm_xxx.int 都跳过了）。但是我不是为了翻译，因此还是需要读源码。

解包很简单，它使用 `exkifint_v3.exe` 直接解包 `.int`，效果比 GARbro 解包的效果还要好，可以全部都解成 .ogg。（也可以用 [FuckGalEngine](https://github.com/Inori/FuckGalEngine/blob/master/CatSystem2/exkifint.zip) 的）（还有，这货解压是把一堆文件塞到和 `.int` 的同级目录下，我红温了）。

但是这玩意的封包用了一个 `mc.exe`，这玩意称为 Message Compiler for CatSystem2，一眼就不是用来正常打包的，它甚至都没有接受密钥。因此现在还需要另行寻找封包方法。

#### [TriggersTools.CatSystem2](https://github.com/trigger-segfault/TriggersTools.CatSystem2)

看起来像是一个资源统合站，并且有一个比较详细的 wiki，介绍了 [MakeInt.exe](https://github.com/trigger-segfault/TriggersTools.CatSystem2/wiki/Tool:-MakeInt.exe) 工具和 [KIF Archive（也就是 .int）封包的格式](https://github.com/trigger-segfault/TriggersTools.CatSystem2/wiki/KIF-Archive)。KIF Archive 的介绍等于是个兜底，即使最后没找到现成工具也大致可以照猫画虎搞一个出来。

在给出的[CatSystem2 首页](https://cs2.suki.jp/download)下载了开发包后，进入 cs2_core_v401/マスター作成，执行 `MakeInt.exe output.int xxx/*.ogg`，可以看到所有的 .ogg 确实被打包了。虽然没有密钥，GARbro 可以直接认出来。

总之最重要的是先试一试，搞个脚本把所有音频解包后重新封进去：

```py
import shutil
import subprocess
from pathlib import Path

# exkifint_v3.exe 的完整路径
EXKIFINT_EXE_PATH = Path(r"./exkifint_v3.exe")

# 游戏主程序的完整路径
GAME_EXE_PATH = Path(r"C:\game\galgame\白日梦的构想图\cs2.exe")

# 存放 .int 文件的目标文件夹
TARGET_FOLDER = Path(r"Z:/test")

# extracted 文件夹的路径
EXTRACTED_DIR = Path("./extracted")
EXTRACTED_DIR.mkdir(exist_ok=True)

assert (
    EXKIFINT_EXE_PATH.is_file() and GAME_EXE_PATH.is_file() and TARGET_FOLDER.is_dir()
)

# --- 1. 搜索文件夹下的所有 .int 文件 ---
int_files = list(TARGET_FOLDER.glob("*.int"))
assert int_files, "在目标文件夹中没有找到 .int 文件，脚本结束。"
print(f"Found {len(int_files)} .int file(s)")

def unpack_int_to(int_file_path: Path, dest_dir: Path):
    exkifint_in_extracted = dest_dir / EXKIFINT_EXE_PATH.name
    try:
        # 复制工具到文件夹
        shutil.copy(EXKIFINT_EXE_PATH, exkifint_in_extracted)
        int_filename = int_file_path.name
        print(f"Processing {int_filename}...")

        # 移动 .int 文件到目录
        dest_int_path = dest_dir / int_filename
        shutil.move(int_file_path, dest_int_path)

        # 命令格式: exkifint_v3.exe xxx.int 游戏.exe
        # 使用 shell=False 时，命令应为列表形式
        command = [
            str(exkifint_in_extracted),
            str(dest_int_path.name),  # 在 extracted 目录中执行，所以用相对文件名
            str(GAME_EXE_PATH),
        ]
        # 在 extracted 目录中执行命令，这样工具更容易找到文件
        # check=True 会在命令返回非零退出码时抛出异常
        subprocess.run(
            command,
            shell=False,
            check=True,
            cwd=dest_dir,
        )
    except Exception as e:
        print(f"\n发生错误: {e}")
    finally:
        # 将所有 .int 文件移回原位
        # 再次搜索 extracted 目录以防万一
        processed_int_files = list(dest_dir.glob("*.int"))
        if processed_int_files:
            print("Moving .int files back to original location...")
            for int_file in processed_int_files:
                original_path = TARGET_FOLDER / int_file.name
                shutil.move(int_file, original_path)

        # 删除复制的 exkifint_v3.exe
        if exkifint_in_extracted.exists():
            exkifint_in_extracted.unlink()  # unlink 用于删除文件
            print(f"Deleted temporary tool: {exkifint_in_extracted}")

for int_file_path in int_files:
    unpack_int_to(int_file_path, EXTRACTED_DIR)
```

然后祈祷 CatSystem2 引擎可以识别不加密的 `.int` 了。由于懒的拆 `pcm_xxx`，因此尝试直接把所有音频都封成一个 `update04.int`（因为 update 数字越大优先级越高），然后很华丽地失败了：_找不到游戏所需的文件。请将游戏光碟放入光驱并重新启动。_ 因此只好按照原路径封回去：

```sh
# 使用该脚本的前提是 ogg 音频和 pcm 文件名有对应关系。
set -euxo pipefail

mkdir -p output
makeint="Z:/cs2_core_v401_1280x720/マスター作成/MakeInt.exe"
extracted="Z:/test/extracted"

# 循环从 a 到 z 的所有小写字母
for letter in {a..z}; do
    # ${letter} 是小写字母 (例如: a)
    # ${letter^^} 是将其转换为大写 (例如: A)
    "$makeint" "output/pcm_${letter}.int" "${extracted}/${letter^^}_*.ogg"
done

$makeint output/pcm_xx.int "$extracted/XX_*.ogg"
$makeint output/pcm_yy.int "$extracted/YY_*.ogg"
$makeint output/pcm_tag.int "$extracted/*.tag"
```

怀着忐忑的心打开游戏，成功！CatSystem2 引擎可以识别不加密的 `.int`！那么 CatSystem2 引擎的语音加速就算是完成了。

这个游戏还有一堆 update0x.int 也需要解包。

> 后面的 [ISLAND](#island) 语音加速实践中陈述了一个更简单的封包方法。

### ISLAND

同样一套流程，但是 ISLAND 的 `pcm_?.int` 和其中的 ogg 没有对应关系，所以还是改改程序，把每个 pcm 封包的音频都隔离开来比较好。

**吗？** CatSystem2 启动会检测各种 `pcm_?.int`，并不意味着 `updatexx.int` 就不能用啊。于是我在保留 pcm 的前提下将所有加速后语音打成了 `updatexx.int`，打开游戏，语音成功加速了！这样编程的难度又降低了。

</template>
<template #QLIE>

### FilePackVer3.0

包含的游戏：

- 美少女万华镜 1-2

解美少女万华镜 1。尝试：

- [hz86/filepack](https://github.com/hz86/filepack)，无法使用，输出到 unpack file end 但是未解压任何东西。看了下好像只适用于 FilePackVer3.1。
- [Aobanana-chan/UnpackQlie](https://github.com/Aobanana-chan/UnpackQlie)，没有 README，这玩意太扭曲了文件名要从 stdin 输入……最后无法使用，FilePackVer 签名验证失败，也是只适用于 FilePackVer3.1 的。
- GARbro：如果点 _将音频转换为常规格式_ 则会报错 _无法读取音频格式。_ 如果不点，解出来的 .ogg 也都是加密的，无法直接读取。而且 GARbro 没有提供 QLIE 封包功能。
- [arc_conv](https://github.com/amayra/arc_conv)：也没有 readme，在[某论坛看到用法](https://www.ai2.moe/topic/32383-请问大佬qlie较古早的版本怎么封包/)，试了下解封包都没有任何反应。

不过在尝试过程中，用 Process Monitor 监视发现进程会去读游戏目录下的一些文件夹的 ogg，于是猜想该游戏可以免打包读取音频。尝试将 ogg 扔到 Voice 下发现可以读取并播放，验证了免封包的猜想。因此只剩下了最后一个难关：将 ogg 解密，即可实现加速。

搜索引擎上经常被 [超详细!解包某知名 Galgame(万华镜 5)引擎——Galgame 汉化中的逆向#Qlie 引擎](https://www.52pojie.cn/thread-1500700-1-1.html) 这篇文章刷屏，是上面 Github 的 Aobanana-chan 写的，看着是挺详细的，实际上对我解包没有贡献什么信息。我又去读了他的源码，一堆 mmx 指令集也不具备可读性。正如 [Dir-A 对此文的评价](https://github.com/Dir-A/Dir-A_Essays_MD/blob/eb87f07ee39e1d026901867169df7d7d43113ee3/Reverse/[QLIE]%20文件系统分析/[QLIE]%20文件系统分析%20[P1准备].md)，不对胃口。

imhex 打开拉到末尾发现格式是 `FilePackVer3.0`。通过这个搜出关键词 `exfp3`，直接在 github 搜 `path:exfp3.cpp` 找到 [FuckGalEngine](https://github.com/Inori/FuckGalEngine) 及其 forks。FuckGalEngine 没有给出二进制，只好研究下源码，发现也是一堆 mmx 指令集。将 mmx 指令集用 LLM 移除后，c++17 以上编译又会报一堆错误。好不容易编译出来了，如果还开着默认的 `#define FP3_FLAVOR 31` 就 `Can't find key from exe file`；如果使用 `#define FP3_FLAVOR 3` 开关会多需要一个 `key.fkey`，这个玩意在 DLL 目录下。执行文件后会在当前文件夹提取出两个图片乱码文件夹和一个坏的 `pack_keyfile_kfueheish15538fa9or.key`。

为了排除 LLM 移除 mmx 指令集把代码逻辑搞坏的影响，我又去网上找编译好的二进制。在 [asmodean-tools](https://github.com/hiroshil/asmodean-tools/blob/main/exfp3/exfp3_v3.exe) archive 里找到了预编译的 `exfp3_v3.exe`，测试后可用。于是终于可以愉快加速了。

#### 美少女万华镜 3

_美少女万华镜 3_ 也是 FilePackVer3.0，然而 `exfp3_v3.exe` 解它的时候失败了，`Could not open ??剀犰殂鞍氨珑 (Invalid argument)`，更换日文环境也不行（日文环境下报错乱码不同，很可能是编码问题，但是 chcp 无法解决，跟当前终端代码页无关）。从官方 iso 里搞出来的 data2.pack 和 fkey 也是一样的报错。

网上一搜，发现[也有人](https://forums.fuwanovel.moe/profile/13945-awvnx/)遇到相同的问题，而且下面的音频补档链接已经没了，fuck you mediafire。

继续喵源码，发现 [FuckGalEngine](https://github.com/Inori/FuckGalEngine) 给出的源码完全是错误的，比如开了 `#define FP3_FLAVOR 3` 以后就会有逻辑上的错误，例如使用了未定义的变量等，不知道从哪里搞的源码。asmodean-tools 的源码看起来质量不错，而且没有 mmx 指令集，但是非常遗憾，compile 以后，还是甚至没法在 _美少女万华镜 1_ 上使用。

继续网上冲浪，看到 [乜都讲 D 的博客](https://blog.ztjal.info/acg/acg-data/galgame-unpack-record-2015-sangatsu-shigatsu) 提到了关键信息 `exfp3_update_v3.1.4.7z`，据传是国人改的。那么这个玩意要怎么搞呢？废物 google 搜不到东西，Github 搜 `exfp3_update_v3.1.4` 出来一些论坛 archive，[其中一篇](https://github.com/silas1037/clip/blob/539b4fd2e55254ef05310a815319ab0bad3d135e/汉化破解研讨室/2019-10-14-1570983566/index.html#L295)就是该代码的作者福音佬的 post。果然这些解包方法都是佬们早就讨论过的东西。虽然在工位不好逛 galgame 论坛，但是几年前的度盘链接居然还能用。于是下载完毕，试用完毕，福音时代乱杀了。

[`exfp3_update_v3.1.4.7z` 备用下载地址](https://t.me/absolutexsresource/82)

### FilePackVer3.1

这个就简单了，GARbro 可以直接解出音频来，上述的 hz86/filepack 估计也可以用吧，懒的试了。

#### 美少女万华镜 5

不知道为什么，5 不能免封包读取音频，会弹报错。

```
[script error]
thread:system
[load]GameData\Data9\script\log\main.s(47line)@@!voice
[now ]GameData\Data9\script\log\main.s(167line)@@!voiceplay
[ERROR]:加载文件失败。
[ERROR]:script:\l,f
[ERROR]:param:"ボイス\kare0001.ogg"
 ※使用ctrl + c将内容复制到剪贴板。
```

但是 FilePackVer3.1 工具多，直接封回去就好了。

#### 美少女万華鏡異聞 雪おんな

这一作封包也是 FilePackVer3.1，但是 GARbro 和 hz86/filepack 是解不了的，估计又是哪里做了小改动。挺莫名其妙的，为啥网上某些博客搜出来都说 GARbro 可用。。

尝试下 Dir-A 贡献过的 [RxQLIE](https://github.com/ZQF-ReVN/RxQLIE)，Release 里的 dll 太早了而且试了下不可用（随便输入一个 Sequence 会直接崩溃）。想自己编译。虽说看到 xmake.lua 感觉非常亲切，以为这次编译不用花太多功夫了，结果直接 xmake 还是报错，找不到已存在的某个 .h。即使添加了 `add_includedirs("src/Core")`，最后又会报找不到 `ZxMem/ZxMem.h`。它的 CmakeLists.txt 也是一坨，没有声明 C++ 版本导致编译失败，需要手动加一下 `set(CMAKE_CXX_STANDARD 23)` 才能编成功。xmake + C++23 的仓库这个质量，确实让我感觉怪怪的。

但是编出来的产物里并没有任何 version.dll，我也不知道他 release 里的 dll 是哪来的。

</template>
<template #LiLiM>

LiLiM DARKNESS 社的引擎，资料有点少。

GARbro 可解，procmon 扫一遍不能免封，于是需要找封包工具。

- [vn-tools/arc_unpacker](https://github.com/vn-tools/arc_unpacker) 的 Release 里看到了对 LiLiM DARKNESS 一些游戏的支持，下载下来用用，果然能解。但是 arc_unpacker 明确说了不支持封包。
- [google archive - aos-tools](https://code.google.com/archive/p/aos-tools/source/default/source)：虽然有 pack 和 unpack，但是看起来不像是这个 aos 格式，好像是 Archive Operating System 啊草。
- [000ylop/galgametools](https://github.com/000ylop/galgametools/tree/master/asmodean/asmodean%20tools/exaos) 的 `exaosv2.exe` 可解包（又是解在当前文件夹下啊啊啊把桌面渲染炸了）。虽然它没有封包功能，但是它有给出源码啊！直接~~逆向~~反向操作。

看了下，这个 aos 的封包格式是真的简单。。实际上只要随便用 imhex 打开看看就能发现一大堆的裸 ogg 文件名和 `OggS` 头，我之前怎么没搞呢。于是 LLM RIIR 瞬秒了。

当然事情并不会如此顺利，在 exaosv2.cpp 里对 5 - 8 字节是直接当废弃字节跳过的。结果封包回去并不能正常运行游戏，在语音处会弹窗报错。所以我猜这四个字节也是有用的。跟上次 BGI 的封包一样寻找蛛丝马迹，盲猜和文件数量有关（懒得去拉所有 ogg 的 frame 总和，先猜个数量再说），还真猜对了，这四个字节就是 _文件头大小_ + _目录表总大小_ = 273 + 文件数 \* 40。于是瞬秒，打开游戏测试，语音加速正常。

仓库地址：<https://github.com/lxl66566/aos_up>

</template>
<template #AVG32>

AIR 的音频没有封包，是 wav 格式，mpv 可以正常播放，见到的第一眼我就觉得我要秒杀了。然后就被狠狠打脸，这个 .wav 容器根本不是 PCM 编码，imhex 看二进制更像是 mp3；但是它又不是一个正常的 mp3，至少 ffmpeg 重编码会报错：

```
[mp3float @ 000001de063ff5c0] Header missing
[aist#0:0/mp3 @ 000001de063da780] [dec:mp3float @ 000001de063fee00] Error submitting packet to decoder: Invalid data found when processing input
[mp3float @ 000001de063ff5c0] Header missing
[aist#0:0/mp3 @ 000001de063da780] [dec:mp3float @ 000001de063fee00] Error submitting packet to decoder: Invalid data found when processing input
```

我的 loudness-normalize 用的 symphonia 更是会直接 panic。

但是 ffmpeg 重编码是可以编出一个正常的结果的。于是尝试 batch 重编码，还[踩了一个 python multiprocessing 的坑](https://t.me/withabsolutex/2494)。最后在 cmd 里用 fd 跑了一遍：`fd -e wav -j 32 -x ffmpeg -hide_banner -loglevel error -err_detect ignore_err -i {} {.}_tmp.wav && move /Y {.}_tmp.wav {}`。

跑出来就不是 mp3 类似物而是真正的 wav 了，共计 4.88GB 是真没绷住。先不管啥编码，捞到游戏里跑一遍再说，还真能播放。于是加速结束。

后来从 [inmm](https://cryo.jp/_inmm/avg32tools_readme.php) 处了解到，这些 wav 应该是 KOE 格式。文章还说可以用 koeunpac.exe 转为 wav 格式，但是我尝试了发现并没有什么卵用，会报错 _レジストリ Software\KEY\AIR を開けません。_ 感觉又要用日文系统才能进行格式转换了；而且我这也不是光盘版的，这个路径看起来得在符合 CD 的文件夹路径里才能进行转换吧。

感慨一下，在那个音频编码没有统一标准，mp3 要收费的时代，搞点游戏音频确实不太容易。虽然 KOE 这玩意吧看起来就跟 mp3 差不多，有可能就是为了避免专利费而进行的小改造……

### 其他问题

1. 这样进行加速后的某些音频在开始时可能会有一个爆音……因为我使用 ffmpeg 硬转 wav，刚开始还以为有一些 metadata 也被当成音频数据放进去了。多听一下，发现应该是一小段音频被切掉了……那这也没啥办法，就这样吧，又不是不能听。
2. 因为程序 bug，无法调节各个部分的音量。于是我想着能不能直接用 loudness-normalize 调整其 LUFS，结果发现调整后的音频再进游戏就无法播放了…… rust hound 编码器也是个 jb。我又懒得再多过一遍 ffmpeg 重编码。然后想到，如果我不把人声调大，那我把 BGM 调小不就行了。BGM 里倒还真都是正常的 WAV，直接
   ```sh
   for f in *.wav; do
     ffmpeg -i "$f" -af "volume=-7dB" "temp-$f" && mv "temp-$f" "$f"
   done
   ```
   即可。

</template>
<template #TyranoScript>

没想到真的有用 electron 做的 galgame，让我感动了一秒钟。

直接解 resources/app.asar：`asar extract app.asar app`，然后加速后，将 app 文件夹整个放到 resources 里，免封即可。

多看了一眼，传述之魔女用的其实是 [TyranoScript](https://github.com/ShikemokuMK/tyranoscript)，这个引擎是基于 electron 的。

虽然用的 electron，但是程序写得很烂。

</template>
<template #unity2>

- 使用 [UABEA](https://github.com/nesrak1/UABEA)，它可以把一个 .bundle 拆成两部分，一部分是元数据，另一部分是 .resource 真实数据文件。但是我没有找到它的进一步功能，即继续解包 .resource。
- 由于 .bundle 也有很多，我更倾向于使用脚本进行解封包操作。尝试使用 [UnityPy](https://github.com/K0lb3/UnityPy) 编写脚本，成功将 wav 音频导出。但是 README 中并没有音频保存并封包的示例，只能硬着头皮试试了。

```py
import shutil
import subprocess
from pathlib import Path

import UnityPy
from UnityPy.classes.generated import AudioClip

OUTPUT_DIR = Path("output")
OUTPUT_DIR.mkdir(exist_ok=True)


def deal_bundle(bundle: Path | str):
    bundle = Path(bundle)
    tmp_dir = Path("tmp")
    tmp_dir.mkdir(exist_ok=True)

    print(f"extracting {bundle}...")
    env = UnityPy.load(str(bundle.absolute()))
    for obj in env.objects:
        if obj.type.name != "AudioClip":
            continue
        clip: AudioClip = obj.read()
        for name, data in clip.samples.items():
            with open(tmp_dir / name, "wb") as f:
                f.write(data)
    subprocess.run(
        f"loudness-normalize {tmp_dir.absolute()} --target-lufs=-16",
        check=True,
        shell=True,
    )
    subprocess.run(
        f"abs -s 1.7 {tmp_dir.absolute()}",
        check=True,
        shell=True,
    )
    print("changing samples to speeduped...")
    for obj in env.objects:
        if obj.type.name != "AudioClip":
            continue
        clip: AudioClip = obj.read()
        for name, _ in clip.samples.items():
            with open(tmp_dir / name, "rb") as f:
                data = f.read()
            clip.samples[name] = data
        clip.save()
    print(f"saving bundle to {OUTPUT_DIR}...")
    (OUTPUT_DIR / bundle.name).write_bytes(env.file.save())
    # env.save(pack="lz4", out_path=str(OUTPUT_DIR))
    shutil.rmtree(tmp_dir)


for bundle in Path("Z:/test").glob("*.bundle"):
    deal_bundle(bundle)
```

然而并没有什么卵用。再看看源码，clip.samples 只是一个 `AudioClip.samples = property(_AudioClip_samples)`，直接修改确实没有好果子吃。进一步地，即使为 AudioClip 添加 setter，在保存时也无法将音频封回 bundle，因为音频处理那块调用了 fmod-toolkit 的 raw_to_wav，这个库本身也不具备 PCM 编码的能力。（顺带吐槽一下这个库无法在没有音频驱动的系统上使用，我解个二进制跟 tm 音频驱动扯上啥关系了还）

继续：

- 尝试使用 [UnityAssetReplacer](https://github.com/Skyluker4/UnityAssetReplacer)，这玩意教程做得挺唬人，几个视频一套一套的，结果一实操 `ERROR: Could not open the asset bundle!`。如果再用其他方法尝试就完全爆炸，直接打 C# stacktrace。
- [AssetRipper](https://github.com/AssetRipper/AssetRipper) 更新挺勤快，但是同样只支持在线查看 bundle 功能，没有替换，甚至导出还不是免费功能。
- [unity-asset](https://crates.io/crates/unity-asset)：一个新 rust 库，质量相当的高，但是 _Emphasis on parsing and data extraction rather than manipulation_，其本身就没有实现 UnityObject 的 serialize 等方法。
- _魔法少女的魔女审判_ 用的是 il2cpp 后端，使用 [Il2CppDumper](https://github.com/Perfare/Il2CppDumper/releases) 会报 _Can't use auto mode to process file, try manual mode._
  - il2cpp 也不像 mono 后端可以比较方便地注入改 pitch。

折腾了好久都没搞出来，后面用 dll 注入实现加速了。

</template>
<template #lucasystem>

GARbro 直解，看二进制能看到 `OggS`，感觉解封包不难。

看了下 [LuckSystem](https://github.com/wetor/LuckSystem)，感觉文档有点简略。而且只能替换不能解封包的设计感觉很屎啊。

看源码不复杂，直接让 gemini 帮我 vibe 一个 RIIR 版本抽奖。vibe 出来的加速完，满怀期待地打开游戏，结果语音全部乱序，之后数轮修改还会让问题扩大化，尝试了许久遂放弃。

老实用 LuckSystem 吧：

```sh
./l.exe pak extract -i VOICE0.PAK -o test.txt --all VOICE0
# 这里还踩了一个坑，必须使用 -i test.txt 传入的 manifest，否则直接用 ./l.exe pak replace -s VOICE0.PAK -o test.pak -i VOICE0 打包会 panic 爆炸。
./l.exe pak replace -s VOICE0.PAK -o test.pak -i test.txt --list
```

打开游戏，确实可以实现加速，已老实。

但是不得不吐槽，这种 replace 写得就是很屎啊，我加速后音频大小只有 1/3，但是 replace 后还是一样大小，合着根本不改数据块 offset 啊。而且实际游玩时偶尔也有几句语音没法播放，这玩意写得还是有点问题。我尝试用大序号（voice2.pak）覆盖掉原有语音，想着对这些加速失败的语音能不能走到 fallback，结果也是不行。

</template>
</SpeedupList>

### 二试封包总结

二试封包的成功确实给我带来了许多喜悦之情与实用价值。但是仍有一批引擎无法简单地通过这种方式进行加速。在面对它们使尽浑身解数仍无法战胜时，我内心里总有一股深深的无力感。因此我认为 _拆包-加速-封包_ 只是旁门左道，只有注入才是正道。

不过由于能力不足，在接近一年的时间内，我的研究重心全部放在了解封包上。毕竟这对目前的我来说是唯一能实现语音加速的方法。

## 音频 API hook

公司某些傻逼软件促使我去 hook 它们，这次 hook 经验便成为了此次尝试的契机。

重新回到 [pyaudio](#pyaudio) 章节，当前面临的最主要问题就是没法控制游戏本身往音频缓冲区里写入的速度。那我就想了，如果我使用 hook 注入音频 API，人为调整音频 API 的播放速率（可以通过调整播放 sample rate 达到目的），再用软件处理音高，这不就能实现音频加速了？

于是立刻开整。由于我 hook 公司软件，使用 rust retour 测试有点问题（字符串的问题），于是我这次使用了 C++。首先 vibe 了一个用 detours 的音频 API 注入 dll，然后再搞一个 injector。过程中发现 xmake 引三方包真的太好用了，之前编译 detours 那些指令可以全部扬掉，直接在 xmake 里 require 就行。于是又用 ftxui 给 injector vibe 了一个 TUI 界面方便选进程。repo: [AudioSpeedHack(inject)](https://github.com/lxl66566/AudioSpeedHack-inject)。

但是回到家测试，实测并不能成功注入音频 API，我也不清楚为啥。我后来又自己搞了一个 debugger，注入音频 API 专门打日志用的，也没有任何输出，不管是游戏还是手写的调 dsound 播放音频的小脚本，都没有打出信息，也就是没有成功 hook 到。感觉还是不熟注入和过于依赖 vibe coding 的锅，但是目前的我也没有这方面的能力。

关于其他 hook lib：

- [PolyHook2](https://github.com/stevemk14ebr/PolyHook_2_0)：这货基本没有文档，蒜鸟蒜鸟。

## dll wrapper V0

沿用之前思路。如果不好 hook 音频，那么就直接改源码，编出一个 dsound wrapper 用会怎么样呢？

这些音频 API 都是闭源的，但是有一些开源第三方实现可以使用。

### dsound.dll

当前有这些常见 dsound wrapper：

- [dsoal](https://github.com/kcat/dsoal)
- [IndirectSound](https://www.indirectsound.com/)
- Creative ALchemy

它们主要是用来强制开启 windows 环绕声和其他音效的。其中只有 dsoal 是开源的，因此只能选择改它。

[fork 了一个 dsoal](https://github.com/lxl66566/dsoal)，[改了两个 frequency 值](https://github.com/lxl66566/dsoal/commit/3d378aab9bc797e73eae043e1431f11ee2a99bb2?diff=split)，然后把 `dsound.dll` 编译出来。项目质量也确实不错，一次编译过，少有的不需要折腾构建的 C++ 项目。

可能还需要用 [DSWRP](https://github.com/ThreeDeeJay/DSWRP/blob/main/DirectSound%20Wrapper%20Registry%20Patcher.cmd)（改注册表的脚本）让游戏可以从同目录加载 `dsound.dll`。不设可能也行，可以先尝试一下。

找了一些明确加载 dsound.dll 的游戏，按照 dsoal README 尝试，并没有什么卵用：游戏优先找 `C:\Windows\SysWOW64\dsound.dll`，强制其优先加载本地（同目录下） dsound.dll 需要把系统的 dll 改名。加载本地 dll 后游戏无法播放音频，也没有观察到 DSOAL_LOGFILE 的创建。

怀疑是编出来的 dll 有问题，用 dsoul 的 CI 编译了一下，看到出来 Win32 和 Win64 的两个产物，怀疑是游戏调的不是 64 位的 dll 的问题。把 Win32 产物放到游戏文件夹下，打开游戏，发现音频可以播放，速度和音高变为之前的 2 倍！符合预期。

然后就是编写程序将音高降回去。我先在前文 [pyaudio](#pyaudio) 的基础上尝试，使用 librosa 降低音高：

```py
RATE = 44100
def callback(in_data, frame_count, time_info, status):
    audio_data = input_stream.read(frame_count, exception_on_overflow=False)
    audio_array = np.frombuffer(audio_data, dtype=np.int16)
    # i16 转 f32
    audio_float = audio_array.astype(np.float32) / 32768.0
    # 使用 librosa 降低一个八度（-12个半音）
    shifted_audio_float = librosa.effects.pitch_shift(
        y=audio_float,
        sr=RATE,
        n_steps=-12,  # 负数表示降低音调，-12个半音即一个八度
    )
    # f32 转回 int16
    shifted_audio_int16 = (shifted_audio_float * 32767).astype(np.int16)
    # 转换回字节流
    out_data = shifted_audio_int16.tobytes()
    return (out_data, pyaudio.paContinue)
```

音高确实降回去了，加速是完全可行的！！但是在 chunk 之间还是有许多割裂的部分（无声或噪音部分），对于 galgame 游玩体验的影响很大。我也尝试过缓冲区，但是仍然会出现割裂，只能归结于 librosa 降调后的数据点有问题，要么就是性能不够。

尝试 vibe 调研 + 抽奖一个 RIIR 版本，抽了几次抽到了一个使用 [pitch_shift](https://github.com/NathanRoyer/pitch_shift/blob/main/src/lib.rs) 实现的音调降低、没有任何割裂的 rust 版本。这个版本还有一些小问题，比如音频有点失真，但是比起初版音频割裂要好太多了，至少是个能玩的水平了。然后就是调参，我把 pitch_shift 的 `WINDOW_DURATION_MS: usize` 从 50 调成 18，失真也减缓了很多，这个音质我感觉已经可以接受了。很高兴，去楼下买了手撕鸡吃（午饭 + 晚饭），回来[发了一篇频道](https://t.me/withabsolutex/2522)庆祝。

然后就是漫长的程序优化了。

- 我希望这个程序是傻瓜式的，可以帮人自动判断游戏是否调用了 dsound.dll，但是……尝试了下发现挺困难的，静态分析基本没辙，好多汉化组的 patch 可是会 spawn 其他 galgame 进程的。至于动态分析那又是 windows api on rust 那一套，感觉我能写一年，这个优化先放着。
- 为了同时支持不同的倍速，我可以提前编好一堆 dll，然后根据用户的选择释放出某一个。这要求这些 dll 在我的二进制里是整体压缩的，否则这个大小我无法接受。当然使用 [include_assets](https://docs.rs/include_assets/latest/include_assets/) 是可以，这玩意强调了它是唯一一个做了 solid 压缩并且还支持 zstd 的。但是我又不想把所有 dll 存在 git 里，否则这个 git 仓库的大小我又不能接受；而且 include_assets 也说了它的缺陷是运行时会全部解压到内存……想来想去还是直接全程用 zip 比较好，这样仓库也不会太大，运行时也不需要全部解压。
  - 然而 deflate 字典太小，压缩率实在是太差，被 zstd 和 lzma 爆杀了。想了想，还是用 include_assets 吧。
- 程序同时支持 cli 和 tui，tui 的话我有思考过要不要用 ratatui 做，后面想想这个可以慢慢来，先用 terminal-menu 糊一个。
  - 糊出来发现还挺好用的，这玩意有对 Vec<&str> 专门做过优化，用起来还不错。

最终糊出了初版的 [AudioSpeedHack v0.1.0](https://github.com/lxl66566/AudioSpeedHack/releases/tag/v0.1.0)。不过实际测下来问题还是挺多，详见 issue 与 TODO。

### MMDevAPI.dll

于是我把目光投向了 unity 使用的 MMDevAPI.dll 上。这是因为 unity 目前还没有办法通过脚本封包，无法进行 SPEEDUP；而使用 unity 引擎制作的《魔法少女的魔女审判》是我一直很想推的 galgame。

微软实在是可恶，这个 dll 不像 dsound 有 dsoal，xaudio 有 faudio，它没有现成的 wrapper 源码。经过一番搜索，我决定参考 wine 的 MMDevAPI 进行修改。wine 的源码虽然不能直接编译成 windows x64/x86 dll 无缝替换，但是我可以丢给 LLM 参考和抽奖。我尝试使用 [wrap_dll](https://github.com/mavenlin/wrap_dll) 导出 dll wrapper，然后将更改后的源码、所有导出的内容一起喂给 LLM，几轮对话通过编译。

编出的 dll 拿来测试，但是 unity 始终不会加载同目录下的 MMDevAPI.dll，估计是有什么安全机制。尝试把系统 System32 里的 MMDevAPI.dll 替换掉，打开游戏，成功观察到音频加速！再打开我的音高处理软件，就可以愉快游玩 SPEEDUP 版《魔法少女的魔女审判》了！！

这对我来说又是一次鼓舞：因为我之前折腾 [unity 封包](#二试封包)一直受挫，在深刻体会到解封包的局限性和无力感后，能找到一个可行的方向，实在是……意义党逢意义。

### 遇到的问题

在开发 dll wrapper 的时候也遇到了许多问题，这里记录一下。

#### 音质下降问题

实际测试发现，AudioSpeedHack 每运行 20 分钟左右音质都会大幅下降，人声都带上了“钢管音”，需要重启。

一开始我想直接一步到位，因为 dll wrapper 的可行性已经确定，而之前阻碍我的一直是 hook 失败而不是加速算法有问题。然后我就尝试 vibe 了一个使用 soundtouch 直接对音频数据进行加速的 dll wrapper，可惜的是其无法正常使用。

dll wrapper 修改的逻辑不多，应该不是那里面的问题，那就只可能是我的音高降低程序的问题了。审查发现是 pitch_shift 库里的 f32 精度丢失问题，[打了个 patch](https://github.com/NathanRoyer/pitch_shift/pull/3)。

#### MMDevAPI.dll 加载问题

这个也是老大难了，MMDevAPI 有 windows 系统保护，不会加载当前目录的 dll。

本来我以为保护在 `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\KnownDLLs` 里，但是这里面并没有找到。然后我尝试写了一个 hook，hook 掉程序的 LoadLibraryA/W，但是也没用，所以这个 dll 的系统保护涉及到更底层的机制。

注册表里搜 mmdevapi，搜出几个结果，然后我尝试把它们修改后搬到 HKEY_CURRENT_USER 表里，然后就可以用了。

#### dsound 在 2 倍速以上循环播放

使用 dsoal 修改而来的 dsound 会出现 2 倍速以上语音重复播放的问题，某一段 buffer 的语音会被重放，而且倍速越高，重放的频率越大，这几乎肯定是应用的音频数据填充 buffer 的速率不足的原因。查看 OpenAL 代码发现 AL_PITCH 有一个硬性限制：

```c
/**
 * Source pitch.
 * Type:    ALfloat
 * Range:   [0.5 - 2.0]
 * Default: 1.0
 *
 * A multiplier for the sample rate of the source's buffer.
 */
#define AL_PITCH                                 0x1003
```

emmm，难道要我再改 OpenAL 代码吗？

后来不再基于 OpenAL，直接 hook dsound，结果还是发现有这个问题，原来这是 dsound 本身的限制啊。

有试过手动降采样，直接硬去掉一半数据点肯定不行，有混叠；用 speex 库做降采样吧，然后发现降采样后程序给的音频数据仍然是以 2.0 速率给出，说明这是一个比直接操作 buffer 还要更底层的限制。那我真没辙了。

#### MMDevAPI 特定倍速无声

最初版的 MMDevAPI 在 1.5 和 2.0 倍速下可以正常工作，但是 1.7 或 1.8 倍速就无声了。

LLM 提出应该是一些小数计算导致采样率没对上。然后增加了四舍五入机制，1.7、1.8 倍速就可以使用了；但是仍然有一些倍速，例如 2.3 倍速仍然无声，可能是程序还有一些问题。

暂时先放着了，现在全身心投入到 V1 的开发中。

## dll wrapper V1

V0 已经勉强能用了，比如我用 V0 推完了魔裁，但是问题还是比较大的。

最大的问题还是音质，即使修了[音质下降](#音质下降问题)问题，pitch_shift 还是难担加速重任，其使用的经典相位声码器比较初级，在处理人声时效果较差，表现就是钢管音，我推 gal 基本都无法开外放，只能戴耳机，隔绝环境音拯救一下音质。

于是我又一次（已经数不清是第几次）将目光投向了 SoundTouch 上。如果我直接拿到 buffer 数据然后用 ST 对原始数据进行不变调加速呢？WSOLA 的效果还是相当值得信任的，毕竟天天解封包然后 ffmpeg 加速也是用的 WSOLA。

恰逢 Gemini 出了 3 pro，我便乘着 LLM 升级的西风开始了 V1 的迁移工作。

### dsound.dll

由于有了 V0 的 code base，我不必从 0 开始让 LLM 生成，直接把 V0 code 和需求喂给它即可。经过几轮 review 和性能优化，直接成功加速。顺带分析了一下 APP 可能调用的函数，增大 hook 覆盖面，解决掉了 [issue #3](https://github.com/lxl66566/AudioSpeedHack/issues/3)。Gemini 3 pro，神！

### MMDevAPI.dll

首先将 dsound.dll 里使用的 SoundTouch 提取成一个单独的 AudioProcessor.h，方便复用。然后如法炮制。但是这次则没有 dsound.dll 那么好的运气了，这样写出的 dll 有两个问题：

1. 魔裁的背景音乐没问题，但是人声断续
2. 在 _恋狱～月狂病～_/_ふゆから、くるる。_ 上均有不同程度的卡顿、音量飘忽不定或静音问题。

第一个问题好解决，随便尝试了下，给 ST 到声卡加了个缓冲区就解决了，甚至没有正经排查过。（根据后续日志，可以认为原因是 ST 会攒一定数据才会跑一次加速，默认参数 ST 的单次输出数据量可能超出声卡缓冲区大小。）

第二个问题就太棘手了，搞了好几天都查不出问题；即使给出 log，LLM 也会在几个错误解法上反复横跳。我尝试了很多方向：

- 双缓冲，input 侧也放了一个 RingBuf。（后来发现完全没用，SoundTouch 内部已经有缓冲区了，自己会攒一定数据才进行一次加速。）
- 修改 input 缓冲的驱动数据量。（也没用，理由同上）
- 发现这个问题有点复杂，做个 logger 吧，把 APP 喂音频时，缓冲区状态和声卡状态都打出来。后续还加了更多打印的日志，比如 ST 每次处理的输入和输出量（然后才发现 ST 的工作逻辑）。
- Backpressure 策略，GetCurrentPadding 不能进入“长时间一直返回 0”的循环，否则应用会快速输出数据顶爆 RingBuf。目前的策略是根据 output RingBuf 做二值化。
- 当前架构是专门开一个 Worker 线程，其一个职责是把输出缓冲区的数据喂给声卡。Worker 线程处理完数据后，因为系统调度原因实际 sleep 得比较久，硬件缓冲区就会见底导致卡顿。本来 Worker 线程是靠 sleep 处理的，这个精度太差了，16ms 够声卡爆炸好几次了。先优化成 timeBeginPeriod(1)，后来直接改成靠声卡的 event 驱动。
- 给 ST 的 output 加了一个写数据到 WAV 的过程用于调试。这时候的音频是连续非卡顿的，但也有高糊、音量不定问题。

然而所有这些修改都没有解决问题。

直到我把 ST 的 input 也打到 WAV 里，发现从 input 开始音频就已经不对劲，然后才定位到问题根因：初始化 IAudioClient 时如果使用的是 `WAVEFORMATEXTENSIBLE` 而非 `WAVEFORMATEX`，则真正的格式信息存储在扩展部分的 SubFormat 中。当前 AudioProcessor 的格式处理错了，然后跟 ST 对异常响度处理的内部机制混在一起，导致问题不明显。

问题解决后，再做一下 dsound 兼容、调参平衡延迟和稳定性，就可以投入使用了。~~立刻开打《ふゆから、くるる。》！不对我怎么还要上班 T_T~~

回家一测试，AudioSpeedHack 在我硬盘上的所有 18 个 galgame 的加速成功率是 **100%**。然后我还发现新版的 MMDevAPI 真的非常牛逼，只 MMDevAPI.dll 一个就实现了 100% 覆盖率，它就是 WASAPI 的化身。dsound 可有可无，不过可以作为叠加加速的工具，还是有用武之地的。

## 番外篇：galgame 语音不中断

做完 SPEEDUP，虽然我个人比较激动，然而发到 B 站和两个 gal 群没啥太大反响（当然也有非常喜欢的，同道中人说是）。gal 群复读道：_我更需要语音不中断_。于是尝试研究一下。

MMDevAPI 基本是无法完成这个需求的，因为 MMDevAPI 拿到的一般是游戏软件混音完毕后的音频，无法区分不同段的人声/BGM。而 dsound 时代一般会把混音交给 API，于是我可以在 dsound 内部拿到不同的 buffer，自然也可以区分人声和 BGM 了。

于是就从 dsound 入手。在开发（vibe）过程随便记录一点：

- 基本架构就是把所有音频数据暂存到一个 FIFO 缓冲区里，每个时刻只允许一段音频播放。然后再实现一个 feeder 线程负责把音频喂给声卡。这个没啥问题。
- 区分人声和语音：
  - 无法通过 DSBPLAY_LOOPING 判断人声，有的引擎会偷懒把所有音频都标上 DSBPLAY_LOOPING。
  - 无法通过 buffer size 判断人声。有的引擎不管是啥音频都会申请一段固定长度的 buffer。
    - 不过可以通过长度筛掉一部分 SE，SE 太短了。
  - 后来直接通过[音频处理里的人声特征判定](../coding/audio.md#人声判定)去做了。反正 galgame BGM 一般也是舒缓纯音乐偏多，这种音乐跟人声特征差距还是比较大的。
- 如何判断同一语音：每次 Play 判定语音并入队。一般 buffer 可以被 Lock 很多次，但是 Play 一般每段语音只有一次。
- 欺骗游戏速度：这个是我的突发奇想，我完全可以套用之前 SPEEDUP 的成果，欺骗游戏语音播放的进度，让它飞速填满此段语音的缓冲 buffer。这样可以将后一句语音对前一句的影响降低至最小。

经过一些测试，可以在 _ジュエリー・ハーツ・アカデミア_ 上正常运行了。

<script setup lang="ts">
import SpeedupList from "@SpeedupList";
</script>
