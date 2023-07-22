---
date: 2022-05-04
icon: python
category:
    - 编程
tag:
    - 编程语言
---
# Python
和[C++](./Cpp.md)页面一样杂乱，想到什么写什么。
## 开发准备（vscode）
windows 上建议直接无脑 all in vscode。
### 扩展
开发 python 前，强烈建议安装以下扩展：
* **Python** - Microsoft
* **Black Formatter** - Microsoft：提供格式化
* **Ruff** - Charlie Marsh：提供语法分析

选装：
* isort - Microsoft：提供 import 排序

其他就见仁见智了。
### 我的配置
全局 `settings.json`:
```json
"[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.formatOnType": true,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": true,
        "source.organizeImports": true
    }
},
```
该配置在保存时自动格式化，自动纠正语法。
### 启用虚拟环境
创建虚拟环境并引入依赖后，代码仍会收到vscode的报错：

![set_vscode_environment](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/python/set_vscode_environment1.png)

解决方法：
1. `Ctrl + Shift + P`打开命令面板，搜索`Python: Select Interpreter`
2. 选中你的虚拟环境
## 导出全部环境依赖
`python -m pip freeze > requirements.txt`该命令导出全部环境使用的依赖包为`requirements.txt`。
## [walrus operator](https://www.freecodecamp.org/chinese/news/introduction-to-the-walrus-operator-in-python/)
## [logging](https://docs.python.org/zh-cn/3/howto/logging.html)
## 图像相关
### 从网站获取图片
```python
import requests
from PIL import Image
from io import BytesIO
response = requests.get(src)
image = Image.open(BytesIO(response.content))
image.show()
```
### 截屏
```python
from PIL import ImageGrab
img = ImageGrab.grab(bbox=(0, 0, 1920, 1080))   # 注意改为你需要截屏的分辨率
```
### 多图片转pdf
```py
import img2pdf
temp = [BytesIO(...), BytesIO(...)]
# temp 也可以是字符串数组，包含本地图片路径
with open('第二册答案.pdf', "wb") as f:
    write_content = img2pdf.convert(temp)
    f.write(write_content)
```
### Image对象转为bytes
有时候需要对图片对象转为字节码以在不同函数间流通。（不统一对象的坏处）
```python
import io
def img2Byte(img:Image) -> bytes:
    imgByte=io.BytesIO()
    img.save(imgByte,format='JPEG')
    byte_res=imgByte.getvalue()
    return byte_res
```
### 高斯模糊
::: warning
请不要试图使用 cv2 对 Image 对象进行操作。(fuck cv2)
:::
```python
from PIL import Image,ImageFilter
img = img.filter(ImageFilter.GaussianBlur(radius=1.5))
```

使用此内置函数进行高斯模糊将无法改变 sigma 的值。
## 使用 poetry 进行包管理
这是一种更为现代的 python 包管理措施，个人认为确实比 pip 优秀，但门槛较高。[关于安装](https://python-poetry.org/docs/#installation)；记得按照安装提示添加环境变量。

以下记录一些基本命令：
* 新建项目：`poetry new <package name>`
    * 创建 .toml 文件：`poetry init`，然后跟着提示填入信息
* 包管理
    * 添加包：`poetry add <package name>`
    * 移除包：`poetry remove <package name>`
    * 列出可用包：`poetry show`
* 安装所需环境（使用者）：`poetry install`，其会自动为您新建虚拟环境
* 虚拟环境
    * 查询：`poetry env info`
    * 激活：`poetry shell`；或者在虚拟环境下的 Scripts 文件夹中打开命令行，输入 `call activate.bat`.
* 运行：`poetry run <filename>.py`
### 换源
为了方便没有梯子的其他使用者安装环境，可在 .toml 文件中添加：
```
[[tool.poetry.source]]
name = "tsinghua-pypi"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true
```
以指定源。
## 序列化
序列化是指将对象转换成字节流，从而存储对象或将对象传输到内存、数据库或文件的过程。——[MS](https://learn.microsoft.com/zh-cn/dotnet/visual-basic/programming-guide/concepts/serialization/)

python 自带了 json 包进行 .json 序列化。也可以使用 configparser 进行 .ini 序列化。
```py
class my_config:
    def __init__(self):
        self.config = ConfigParser()
        self.config.read(DIR / "config.ini")
    def get(self, section, option) -> str:
        return self.config.get(section, option, fallback="")
    def set(self, section, option, value):
        self.config[section][option] = value
    def write_to_file(self):
        with open(DIR / "config.ini", "w") as configfile:
            self.config.write(configfile)
```
## miniconda
提供 python 包管理与虚拟环境。

由于 pyinstaller 的打包会将环境内所有的工具包都整合到一起，因此使用 conda 的虚拟环境隔离出运行所需环境，可以减小打包体积。

Anaconda 体积过于庞大（6G+），**强烈建议[安装miniconda](https://docs.conda.io/en/latest/miniconda.html)**。<span class="heimu" title="你知道的太多了">Anaconda 捆绑祸害了多少编程新人！（包括我）</span>

### 基本命令
#### 创建环境
`conda create -n Name python=3.9`
* `Name`为你需要的环境名称，下同。`Python=3.9`则指定了python的版本。你可改为任意需要的版本。
#### 迁移环境
`conda create -n Name --clone FromEnvName`
* `FromEnvName`为需要克隆的环境名称。
#### 查看环境
`conda info -e`
#### 唤醒环境
`conda activate Name`
#### 关闭环境
`conda deactivate`
#### 删除环境
`conda remove -n Name --all`
* 也可进入conda安装目录下的`/envs/`删除对应文件夹。
#### 查看环境内工具包
`conda list`
### 高级技巧
#### bat文件中调用conda指令
调用前加入`call activate.bat`指令
#### 创建纯净环境
我们使用[上述指令](#创建环境)创建环境后：

<img alt="anaconda_list" src="https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/python/anaconda_1.png"  width="65%" height="65%"/>

可以看到，conda帮我们预装了很多实际上没什么用的包，这无疑会让打包出的程序增加不必要的体积。

这里给出一个解决方法：

1. 在任意目录下新建txt文档，输入
```batch
@EXPLICIT
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64/python-3.9.7-h6244533_1.tar.bz2
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64/pip-21.2.4-py39haa95532_0.tar.bz2
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64/setuptools-58.0.4-py39haa95532_0.tar.bz2
```
并保存为`env.txt`（名字不重要）

2. 该目录下执行`conda create --name Name --file env.txt`

![anaconda_pureenv](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/python/anaconda_2.png)

这样，一个纯净环境就创建好了，你可以[安装Pyinstaller](#安装)进行打包前的准备。

## Pyinstaller
### 安装
`pip install pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple`
### 命令
在.py目录下，所需环境内执行`pyinstaller -D xxxx.py`

参数解释：
* `-D` 打包为目录文件
* `-F` 打包为单个exe文件
* `-w` 运行时不显示命令窗口
* `-i <icon.ico>` 设置图标
## Python代码混淆
[这里](https://pyob.oxyry.com/)是一个网站，可以在线混淆您的 python 代码。

## 一些问题
### 找不到pip
执行 `python -m pip install --upgrade pip` 后报错：
> ERROR: Could not install packages due to an OSError: [WinError 5] 拒绝访问。: 'c:\\python310\\scripts\\pip.exe'

之后再使用 `pip` 命令时，就会不断报错，找不到 pip。我觉得很怪。`C:\Python310\Scripts` 路径下也能找得到 pip.exe，环境变量也没改。我在当前路径下打开 cmd ，执行 pip，然而还是不能正常使用。 ~~（忘了报什么错了）~~ 鼓捣了一会儿，试图使用离线安装，提示找不到 wheel.exe.

最终解决方法：在[此页面](https://pypi.org/project/pip/#files)下载`.tar.gz`,解压后在目录下执行 `setup.py build` 与 `python -m pip install --upgrade pip --user`。
## external
1. [The Right Way to Run Shell Commands From Python](https://martinheinz.dev/blog/98)