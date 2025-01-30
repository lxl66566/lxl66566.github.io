---
date: 2024-07-27
icon: gamepad
category:
  - 教程
tag:
  - Windows
---

# SPEED UP！

我打 [galgame](../hobbies/galgame.md) 已经有几年了，不过也只接触了几部能够语音加速的游戏：紫社全套和 _GINKA_。游玩这几部作品让我非常兴奋：使用二倍速播放音频，我就能节省一半的游戏时间，~~相当于延长了一倍的生命~~。经历过加速后，再次玩其他语音速度极低的 galgame （真红真红真？）让我感觉像是在浪费生命。因此我尝试寻找能够让我节省时间的游戏语音加速方式。

之后的文章按照时间顺序排布。

## 常见音频处理软件

音频处理领域很多软件都是商业非自由软件。并且我在其中找不到能做到音频加速的软件。（不过写在这里的只是一部分，之前试过的没记）

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

## [Speed Gear](https://www.softking.com.tw/dl/17892/Speed%20Gear%207.2.html)

一个简单点点点就能加速窗口的软件，比较电脑小白向。最高支持数千倍加速（还是拉线性条，你们 UI 设计者.jpg），体验还不错，但是跟 CE 一样，也**不支持音频加速**。

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

### 直面原理

音频处理其实并不算太复杂，说到底也是信号与系统那一套。最基础的就是把 trunk 加速打出去那一套，属于 _变速变调_。更高级一点的主要是 _变调不变速_ 和 _变速不变调_ 两种，有了这两种就可以组合出各种想要的效果了。实际使用中也可以只用一种，通过升降采样先 _变速变调_，对齐一个量，再通过一种算法改变另一个量即可。在这里我们当然关注 _变速不变调_。

行业泛用的是 wsola (Waveform Similarity and Overlap Add)，例如 soundtouch 就用的这个。除此之外还有 PLOSA (Time-Domain Pitch-Synchronous Overlap and Add)，及其变体 TD-PSOLA 等。这一类的最大特点是需要找峰值，并保留峰值。

现成的 crates 里，_wsola_ 是个脑残占名字的没有内容，而 [_tdpsola_ 有一个可用实现](https://codeberg.org/PieterPenninckx/tdpsola)。把仓库拉下来，example 里带了 wav 支持，不需要手动转 raw。然后试了一下，确实能够实现加速！让我非常开心。虽然只支持单声道 wav，我还需要手动转一次，但是没有什么难度。并且作者在 README 里给出了一个 documentation，里面的视频把 TD-PSOLA 原理讲得非常透彻。

### 打击

此时我终于读懂了 Hourglass-Resurrection 的代码是自己写 DirectSound 的驱动，并且也发现操作 tick 并不能实现真正的音频加速，最终的道路一定是 buffer。于是我陷入了消沉：做一个音频加速的复杂度已经远超出了我的想象，即使知晓了音频加速原理，也很难面对一大坨 windows sound api。我目前摸索的这些知识在脑子里并不能合到一起。

## 二试封包

转眼过了半年来到 2025，我在推 _空に刻んだパラレログラム_ 时看到 xp3 格式的文件，又忍不住想起了拆包封包的思路。由于 xp3 是老牌（20+years）的广泛使用的格式，网上的资料非常多，可谓是帮了大忙。我先尝试用 GARbro 拆包，接着用[网上找的脚本](https://github.com/awaken1ng/krkr-xp3)封回去。封完的包比原先的大了十多 MB，心里还是有一些不安的。打开游戏，发现居然可行！！游戏可以读到音频文件！

于是我激动得立刻开始 LLM 写脚本，用 ffmpeg 加速音频。写完运行，发现脚本解包有问题。我怀疑是这个 krkr-xp3 只支持 xp3 v1，而 galgame 用了 v2 打包。不过无伤大雅，我只需要封包能力即可，所以我利用 GARbro 解包后，[改一下脚本](https://github.com/lxl66566/krkr-xp3)，将包封回 xp3 即可。实测可以正常游玩。

上述操作让我可以倍速语音游玩所有具有 krkr 移植的 galgame，简直不要太爽。

尝到甜头后，我又开始审视起我仓库中的其他 galgame。下面的表格记录了我的游戏语音加速尝试与心得（时间顺序），可以点击对应条目查看详细内容。

<SpeedupList>
<template #krkr_xp3>

使用我的 [fork repo](https://github.com/lxl66566/krkr-xp3)。脚本可能无法解包，需要使用 GARbro 解包后，再使用脚本进行音频加速与封包。

</template>
<template #Artemis>

解包樱之刻，我一搜 Artemis Engine，出来[一篇文章](https://www.bilibili.com/opus/568495301662731170)告诉我其实这个引擎不需要封包……实测了一下，果然如此。只需要用 GARbro 解出来，批量加速后放到 exe 所在文件夹即可。又解决了一个！

不过不封包会导致 translator 的 hook 失效，估计是不封包就直接读 .ast 文本，不会再经过 hooked 函数了。

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

尝试解包/封包一个 YU-RIS 引擎的游戏，这玩意也是个老牌引擎了。

GARbro 打开 .ypf 时会提示猜测密钥，能够顺利解包。但是不得不骂，GARbro 并不会告诉我猜到的密钥是啥，并且封包的时候要求必须提供 8 位密钥。

尝试其他工具：

- [fengberd/YuRISTools](https://github.com/fengberd/YuRISTools) / [pre compiled](https://drive.google.com/file/d/1fDa4RaUz2oJUKO6cTLfSEqaAawNSQd3m/view) / [src](https://forums.fuwanovel.moe/topic/24704-a-complete-guide-to-unpack-and-repack-yu-ris-engine-files/)：能够免密钥打包，但是打出的结果不同，并且运行会爆炸。
  - 如果我直接 unpack `vo.ypf` 会得到 `Unsupported YPF engine version: 500`，因此我得到了 engine version。但使用该 version 进行 pack 也是无效的。
- [python-YU-RIS-package-file-unpacker](https://github.com/mwzzhang/python-YU-RIS-package-file-unpacker)：只能解包不能封包，而且在 RAMDisk 上运行会爆炸。
- 根据 [ypf ファイル差し替え展開方法](https://wikiwiki.jp/mozanashi/ypfファイル差し替え展開方法)，将 pack 的 ypf 文件命名为 `update2.ypf` 放到 pac 里，提示 xxx.ogg 冲突。但是如果只保留 `update2.ypf` 而不保留原先的 `vo.ypf`，则又无法启动。

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
        print("用法: python script.py <ypf文件路径>")
        sys.exit(1)

    guess_ypf_info(sys.argv[1])
```

得到密钥为 `0xC9`，version 为 500。使用 GARbro 指定密钥（“8 位密钥” 处要写 `C9`）与版本进行打包，放入游戏，报错。然后用 fengberd/YuRISTools 一读，好家伙，version 变成了 1280。我真觉得莫名其妙，什么傻逼打包啊。([然后提了个 issue，是我最后的仁慈](https://github.com/crskycode/GARbro/issues/79))

继续找打包工具，找到 [crskycode/YPF_Tool](https://github.com/crskycode/YPF_Tool)，免密钥打包，放到游戏，能正常运行。人家的也是 C# 写的怎么爆杀你 GARbro 啊。

结果发现 `vo.ypf` 文件能正常读取，但是没法播放。。尝试了下 `update2.ypf` 也不行。搞不懂 YU-RIS 了，我猜每个语音文件或者整个 `.ypf` 在其他地方还有放校验。

过程中的其他发现：

- 如果 pac 文件夹里含有额外没用上的 `.ypf` 文件，游戏会无法启动。游戏根目录下的 .ypf 也会被读，影响游戏本体。
- 在游戏根目录找到一个 `ysfchk.ini` 文件，里面记录着每个 ypf 对应的 CRC-32 校验 hash。该文件对运行游戏没有影响，但是如果用 `ファイル破損チェック.exe` 验证，本质上就是用这里的 hash 进行验证。

</template>
</SpeedupList>

### 二试封包总结

二试封包的成功确实给我带来了许多喜悦之情与实用价值。但是仍有一批引擎无法简单地通过这种方式进行加速。在面对它们使尽浑身解数仍无法战胜时，我内心里总有一股深深的无力感。因此我认为 _拆包-加速-封包_ 只是旁门左道，只有注入才是正道。

## external

这里存一些可能用得上的资料。

- [Windows 上的音频采集技术 - 思考的轨迹](https://shanewfx.github.io/blog/2013/08/14/caprure-audio-on-windows/)

<script setup lang="ts">
import SpeedupList from "@SpeedupList";
</script>
