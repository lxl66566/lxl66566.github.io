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

然后就可以用了。实在是太神奇了。

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

解美少女万华镜 1。尝试：

- [hz86/filepack](https://github.com/hz86/filepack)，无法使用，成功退出但是未解压任何东西。
- [Aobanana-chan/UnpackQlie](https://github.com/Aobanana-chan/UnpackQlie)，这玩意太扭曲了文件名要从 stdin 输入……最后无法使用，FilePackVer 签名验证失败。
- GARbro：如果点 _将音频转换为常规格式_ 则会报错 _无法读取音频格式。_ 如果不点，解出来的 .ogg 也都是加密的，无法直接读取。而且 GARbro 没有提供 QLIE 封包功能。

感觉还是得研究其原理。

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
