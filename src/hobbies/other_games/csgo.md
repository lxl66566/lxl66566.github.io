---
date: 2022-05-04
icon: hot
category:
  - 爱好
tag:
  - 游戏
---

# CS:GO

CS:GO（或 CS2） 确实是一款吸引我的游戏。CS 能够带来短时大量的多巴胺。这样是不好的。我打 CS 会有负罪感，因此需要时不时戒一段时间。

<dtls alt="点击展开戒断区间">

- 20220527 - 20220528
- 20220720 - 20220801
- 20220913 - 20220918
- 20221004 - 20221011
- 20221120（于 20230128 卸载，~~不卸载的话效果不好~~ ）- 20230927（CS2 回坑）
- 20231202 - 20231228?
- 20240120 - ?

</dtls>

## 设置方案（CS2）

绝大部分控制台指令在 CS2 中都无法使用。我简述一下我的设置。

1. 将画面设为 4:3。CS2 原生提供了 4:3 的拉伸（必需使用全屏模式）。
2. 在设置里可以直接改小地图缩放，无需通过控制台。我直接拉到了最低。
3. 帧率显示：通过控制台显示帧率比较丑，建议用 steam 提供的接口：_Steam - 设置 - 游戏中 - 开启帧率显示 与高对比度_
4. 绑定跳投指令：`steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg` 中新建 `<name>.cfg`，写入：
   ```
   +jump
   -attack
   -attack2
   -jump
   ```
   然后在游戏控制台 `bind <key> "exec <name>"` 即可。一次绑定即可永久使用。
5. `cl_crosshairsize <length>` 可以调整准心长度（突破设置页调整上限）

## 设置方案（CS:GO）

:::: details 过时信息，cs2 可能不适用

### 启用控制台

![控制台](/images/hobbies/other_games/csgo/csgo_settings_1.png)

控制台是对 csgo 进行高级操作的基础。现在你可以按`~`键呼出控制台。

### 切换国服

#### 如何切换

国服游玩 csgo 的优点是：

- 无需加速器，延迟低
- 匹配国人队友

不过切换国服也有缺点，比如需要防沉迷认证，无法跟外服联机等。请自行决定是否切换。你可以选择以下**一项**：

- 下载安装[完美世界竞技平台](https://pvp.wanmei.com/)软件。之后每次启动 csgo 时就会让你选择游玩哪个服务器。

<div style="text-align: center;">
<img alt="开始界面" src="/images/hobbies/other_games/csgo/csgo_settings_2.png"  width="43%" height="43%"/>
</div>

- 在 steam 库中右击 csgo，点击`属性`，在`通用-启动选项`中加入`-perfectworld`

#### 切换后的设置

由于切换国服后 csgo 的语音会变成中文，若需要切换回英文语音请：

1. 进入 Steam 安装目录下的 Steam\steamapps\common\Counter-Strike Global Offensive\csgo 文件夹
2. 删除所有名称带有 audiochinese 的.vpk 文件与全部三个名称带有 perfectworld 的.vpk 文件 _（后者与语音无关，但建议删除）_

:::tip 提示
若更新后出现**文件缺失提醒**、**素材加载失败**或**语音变回中文**情况，请再次进入目录删除。
:::

### 调整纵横比

游戏默认比例 16:9，但调整成 4:3 有如下好处：

- 更容易爆头
- 分辨率更低，提高帧率（性能过剩的话当我没说）

调整纵横比后，还需要将画面拉长以充分适应电脑屏幕。但是画面拉长有如下缺点：

- 调整后的玩家头身比例会让你觉得奇怪，需要一段时间的适应
- 游戏开始时会改变已打开窗口的纵横比
- 鼠标的水平移动速率与垂直移动速率将不相等

画面拉长的常规方法是进入 NVIDIA 控制面板进行设置。此处给出一种非常规的解决方案：

1. Win+R 键进入运行，输入 regedit 打开注册表
2. 依次点击 HKEY_LOCAL_MACHINE..SYSTEM..ControlSet001..Control..GraphicsDrivers..Configuration
   （此时每个目录下仅有一个文件夹，一直点到最后），在右侧找到 Scaling 并双击，更改数值为 3

<div style="text-align: center; ">
<img alt="注册表" src="/images/hobbies/other_games/csgo/csgo_settings_4.png"  width="100%" height="100%"/>
</div>

::: danger 警告
对注册表进行直接操作前请务必事先备份！
<br/><img alt="注册表备份" src="/images/hobbies/other_games/csgo/csgo_settings_3.png"  width="40%" height="40%"/>
:::

### 显示 FPS

在控制台中输入`net_graph 1`

该命令还能显示 ping 值，丢包率，tick 等。

### 显示回合伤害

每回合结束后在左上角显示本回合伤害数据：

1. 进入 Steam 安装目录下的 _Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg_ 文件夹，新建文本文档，复制粘贴以下代码：

```
developer 1;
con_filter_enable 2;
con_filter_text_out "player:";
con_filter_text "damage";
```

2. 保存关闭后重命名为”damage.cfg”
3. 在 steam 库中右击 csgo，点击`属性`，在`通用-启动选项`中加入 +exec damage

### 一键跳投

比起手动跳投，一键跳投拥有更高的精确度。（理论上绝对精确）

在控制台输入：

```
alias +jumpthrow"+jump;-attack;-attack2"
alias -jumpthrow -jump
bind "t" "+jumpthrow"
```

之后拉开投掷物后按`t`即可一键跳投。其中`t`也可更换为其他不冲突的按键。

### 清除血迹

`bind "shift" "+speed;r_cleardecals"` 或者 `bind f "+lookatweapon;r_cleardecals"`

### 一键大跳

```
alias +cjump "+jump; +duck"
alias -cjump "-jump; -duck"
bind "mouse5" "+cjump"
```

### 缩小雷达图

`cl_radar_scale 0.3`可以使雷达图包含的信息更多。

### 快速切指定道具

`bind "6" "use weapon_smokegrenade"`

- 闪光弹 weapon_flashbang
- 烟雾弹 weapon_smokegrenade
- 诱饵弹 weapon_decoy
- 手雷 weapon_hegrenade
- 燃烧弹 weapon_incgrenade

### 静步加快

`bind "c"+moveup` 按`c`即可快速无声走路。仅适用于内格夫，开镜的 SG 553 和 AUG。

## 常用指令

多用于自定义服务器（创意工坊）。

<!-- prettier-ignore -->
|用途|指令|
| :-: | :-: |
|设置出生金钱|`mp_startmoney 16000`|
|设置最高金钱|`mp_maxmoney 16000`|
|设置局时|`mp_roundtime 60`<br/>`mp_roundtime_defuse 60`|
|设置最大局数|`mp_maxrounds 30`|
|取消购买时空限制|`mp_buytime 99999`<br/>`mp_buy_anywhere 1`|
|设置开始时原地冻结时间|`mp_buytime`|
|设置友伤|`mp_friendlyfire 0/1`|
|设置可加入双方|`mp_humanteam any`|
|设置时间流速|`host_timescale 20`|
|无限弹药|`sv_infinite_ammo 1`|
|显示着弹点|`sv_showimpacts 1`|
|显示投掷物轨迹|`sv_grenade_trajectory 1`|

## 问题解决

无法连接到服务器可以尝试：
cmd 中执行

```batch
netsh winsock reset
ipconfig /flushdns
```

有时候有用。
::::

## external

1. [A decade long Steam issue, is everyone just too fast for Valve?](https://blog.freudenjmp.com/posts/no-user-logon/)
