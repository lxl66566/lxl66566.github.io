---
date: 2024-07-27
icon: gamepad
category:
  - 教程
tag:
  - Windows
---

# SPEED UP！

我打 [galgame](../hobbies/galgame.md) 已经有好几年了，共计接触了两部能够语音加速的游戏：_天津罪_ 和 _GINKA_。游玩这两部作品让我非常兴奋：使用二倍速播放音频，我就能节省一半的游戏时间，相当于 galgame 游玩量变为了 2 倍。经历过加速后，再次玩其他语音速度极低的 galgame 让我感觉像是在浪费生命。因此我尝试寻找能够让我节省时间的游戏加速方式。

## CE

Cheat Engine 想必大家都不陌生，我也会使用 CE 进行 RPG galgame 的加速（兰斯系列）。CE 中有一个变速精灵的功能非常好用，用鼠标点几次即可加速游戏。但是 CE 不能加速游戏音频，这也是它的最大败笔。因此我需要另寻出路。

## 解包与封包

20240720 我尝试了一个想法：将 galgame 音频文件解包，加速后再封包回去。由于我不会逆向，因此使用的是 GARbro，这是一个非常泛用的，多目标 galgame 资源提取器。我使用 いろとりどりのセカイ HD 尝试，这个游戏把 `voice.bin` 单文件放在根目录下，非常明显，我很轻易地就提取出了游戏的所有 ogg 格式的语音。

那么我要如何将加速后的 ogg 封装回一个 `voice.bin` 呢？我被卡在了这一步下。GARbro 根据预设的解包规则检测出格式并解了包，但是却**不告诉我这个包用的究竟是什么格式**。Asuka Minato 也提醒：解包容易，但封包可能非常困难。因此我打消了这个想法。

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
    return 0, 6


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

首先我尝试了 libTAS，这是一个泛目标开源 tas 库+软件，许多其他 TAS 生态是建立在 libTAS 上的。libTAS 只能使用 linux。libTAS 在 NixOS 上的打包不算太好，低了一个版本，也缺失了 libtas32.so 库导致没法运行 32 位 exe，需要手动用 `LIBTAS_SO_PATH` 拉；然后 libTAS 运行时会去找 libalsa，NixOS 的 dynamic link 管理又是混沌与邪恶的，因此我还需要大费周章手动用 `LD_LIBRARY_PATH` 把运行库拉进来。

这一切做好以后，游戏还是打不开，显示 _HD 不是一个有效的 binary_… （HD 是游戏路径上的一个词）我怀疑它 parse 参数出了问题，但是我没有证据，它也不输出它用的启动指令。

后来我自己打了 1.4.6 的 libTAS 包，然后自己打了一串超级长的启动指令：

```sh
LD_LIBRARY_PATH=/tmp:/nix/store/1ry2s2jgqbl3w7w54b8biylwqdxy52zw-steam-fhs/usr/lib32/:LD_LIBRARY_PATH LIBTAS_SO_PATH=/tmp/libtas.so WINEPREFIX=/home/absx/.local/share/wineprefixes/origin libTAS
```

嗯，steam-fhs 还是好用的。现在我的游戏已经起来了，但是我发现我不会用 libTAS，无法调速。。反正 README 说的快捷键，TAB 和 V 这些都是用不了的。

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
- Hourglass-Resurrection：一个 hourglass fork，但是也已经停更了。没有提供二进制，我尝试自己构建也失败了。（VS 除了点构建运行就啥也不会干了）
