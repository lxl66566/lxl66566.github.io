# csgo游戏配置
* **本文提供一些csgo的非常规设置方案**

## 启用控制台
![控制台](/images/csgo_settings_1.png)

控制台是对csgo进行高级操作的基础。现在你可以按`~`键呼出控制台。
## 切换国服
### 如何切换
国服游玩csgo的优点是：
* 无需加速器，延迟低
* 匹配国人队友

不过切换国服也有缺点，比如防沉迷认证等。请自行决定是否切换。你可以选择一下**一项**：

1.下载安装[完美世界竞技平台](https://pvp.wanmei.com/)软件。之后每次启动csgo时就会让你选择游玩哪个服务器。

<div style="text-align: center; ">
<img alt="开始界面" src="/images/csgo_settings_2.png"  width="43%" height="43%"/>
</div>

2.在steam库中右击csgo，点击`属性`，在`通用-启动选项`中加入`-perfectworld`
### 切换后的设置
由于切换国服后csgo的语音会变成中文，若需要切换回英文语音请：
```
进入Steam安装目录下的Steam\steamapps\common\Counter-Strike Global Offensive\csgo文件夹
删除所有名称带有 audiochinese 的.vpk文件与全部三个名称带有 perfectworld 的.vpk文件
```

## 调整纵横比

游戏默认比例16:9，但调整成4:3有如下好处：
* 更容易爆头
* 分辨率更低，提高帧率（性能过剩的话当我没说）

调整纵横比后，还需要将画面拉长以充分适应电脑屏幕。（调整后的玩家头身比例会让你觉得奇怪，需要一段时间的适应）

画面拉长的常规方法是进入NVIDIA控制面板进行设置。此处给出一种非常规的解决方案：
```
Win+R 键进入运行
输入 regedit 打开注册表
依次点击 HKEY_LOCAL_MACHINE..SYSTEM..ControlSet001..Control..GraphicsDrivers..Configuration 
（此时每个目录下仅有一个文件夹，一直点到最后）
在右侧找到 Scaling 并双击，更改数值为3
```
<div style="text-align: center; ">
<img alt="注册表" src="/images/csgo_settings_4.png"  width="100%" height="100%"/>
</div>

::: danger 警告
对注册表进行直接操作前请务必事先备份！

<img alt="注册表备份" src="/images/csgo_settings_3.png"  width="40%" height="40%"/>
:::

## 显示FPS
在控制台中输入`net_graph 1`

该命令还能显示ping值，丢包率，tick等。

## 显示回合伤害
每回合结束后在左上角显示本回合伤害数据：

```
进入Steam安装目录下的Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg文件夹
新建文本文档，复制粘贴以下代码：
```
```
developer 1;
con_filter_enable 2;
con_filter_text_out "player:";
con_filter_text "damage";
```
```
保存关闭后重命名为”damage.cfg”
在steam库中右击csgo，点击`属性`，在`通用-启动选项`中加入 +exec damage
```