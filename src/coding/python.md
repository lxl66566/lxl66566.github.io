---
date: 2022-05-04
icon: python
category:
  - 编程
tag:
  - 编程语言
---

# Python

## 安装

python 本身的安装应该不用我多说，[scoop](../farraginous/recommend_packages.md#scoop) 一行结束。不过注意，没有启用虚拟环境时，电脑中**最好只有一个 python**。

## 开发环境

关于开发，我直接无脑 all in [vscode](./vscode.md)。

### vscode 扩展

开发 python 前，强烈建议安装以下扩展：

- **Python** - Microsoft
- **Black Formatter** - Microsoft：提供格式化
- **Ruff** - Charlie Marsh：提供语法分析
  - [配置技巧](https://stackoverflow.com/questions/75639719/decrease-mistake-severity-for-ruff-python-linter-in-vscode-extension)
- (optional) **isort** - Microsoft：提供 import 排序

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

该配置在保存时自动格式化。

### 启用虚拟环境

创建虚拟环境并引入依赖后，代码仍会收到 vscode 的报错：

![vscode 中未启用环境](/images/coding/python/set_vscode_environment1.png)

解决方法：

1. `Ctrl + Shift + P`打开命令面板，搜索`Python: Select Interpreter`
2. 选中你的虚拟环境

### poetry

这是一种更为现代的 python 包管理器，看起来像抄的 npm，爆杀 pip，略胜 miniconda。

#### 安装

这里是[官方教程](https://python-poetry.org/docs/#installation)。poetry 在 windows 上的 install script 可谓傻逼[^1]，开代理不能装，关代理不能装，scoop 用的也是官方 install script。只好使用 pipx。

```sh
pip install pipx -i https://pypi.tuna.tsinghua.edu.cn/simple
pipx install poetry -i https://pypi.tuna.tsinghua.edu.cn/simple
```

> pipx: 事实上，它使用 pip，但专注于安装和管理可直接作为应用程序从命令行运行的 Python 包。

[^1]: [不读系统代理，不能配置代理，不做错误处理，不具有可读性](https://t.me/withabsolutex/1304)

#### 基本命令

- 新建项目：`poetry new <package name>`
  - 创建 .toml 文件：`poetry init`，然后跟着提示填入信息
- 包管理
  - 添加包：`poetry add <package name>`
  - 移除包：`poetry remove <package name>`
  - 列出可用包：`poetry show`
- 安装依赖：`poetry install`，会自动新建虚拟环境
- 虚拟环境
  - 查询：`poetry env info`
  - 激活：`poetry shell`
    - 或者在虚拟环境下的 Scripts 文件夹中打开命令行，输入 `call activate.bat`.
- 运行：`poetry run <filename>.py`

#### 换源

参考[文档](https://python-poetry.org/docs/repositories#project-configuration)。

```toml
[[tool.poetry.source]]
name = "tsinghua-pypi"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
priority = "primary"
```

### miniconda

提供 python 包管理与虚拟环境。我已弃用 miniconda，转向 poetry。

::: details archived

Anaconda 体积过于庞大（6G+），**强烈建议[安装 miniconda](https://docs.conda.io/en/latest/miniconda.html)**。<span class="heimu" title="你知道的太多了">Anaconda 捆绑祸害了多少编程新人！（包括我）</span> windows 可以使用 [scoop](../farraginous/recommend_packages.md#scoop) 一行搞定。

### 基本命令

```sh
conda create -n <name> python=<version> # 创建环境
conda create -n <name> --clone <FromEnv<name>>    # 迁移环境
conda info -e   # 查看环境
conda activate <name> # 唤醒环境
conda deactivate    # 关闭环境
conda remove -n <name> --all  # 删除环境，也可进入 conda 安装目录下的 /envs/ 删除文件夹
conda list  # 查看环境内工具包
```

### 高级技巧

#### bat 文件中调用 conda 指令

调用前加入`call activate.bat`指令

#### 创建纯净环境

我们使用[上述指令](#创建环境)创建环境后：

<img alt="anaconda_list" src="/images/coding/python/anaconda_1.png"  width="65%" height="65%"/>

可以看到，conda 帮我们预装了很多实际上没什么用的包，这无疑会让打包出的程序增加不必要的体积。

这里给出一个解决方法：

1. 在任意目录下新建 txt 文档，输入

```batch
@EXPLICIT
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64/python-3.9.7-h6244533_1.tar.bz2
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64/pip-21.2.4-py39haa95532_0.tar.bz2
https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64/setuptools-58.0.4-py39haa95532_0.tar.bz2
```

并保存为`env.txt`（名字不重要）

2. 该目录下执行`conda create --name <name> --file env.txt`

![anaconda_pureenv](/images/coding/python/anaconda_2.png)

这样，一个纯净环境就创建好了，你可以[安装 Pyinstaller](#pyinstaller)进行打包前的准备。

:::

### 其他

如果不使用现代包管理器（如果用 pip），需要在项目下导出一个 `requirements.txt` 用于声明项目依赖。可以用 pip 导出，也可以自己写模块。可以不写版本，只写每行一个模块名。

## 语言相关

### [walrus operator](https://www.freecodecamp.org/chinese/news/introduction-to-the-walrus-operator-in-python/)

### 序列化

对象序列化极为简单无脑。弱类型语言的大优势。

```py
import pickle
...
soup = BeautifulSoup(response.content, "html.parser")
with open("soup.test", "wb") as f:
    pickle.dump(soup, f)    # serialize
with open("soup.test", "rb") as f:
    soup = pickle.load(f)   # deserialize
```

## 常用模块

### [logging](https://docs.python.org/zh-cn/3/howto/logging.html)

使用 logging（py 自带） 进行能够控制等级的输出。基本用法：

```py
import logging
logging.basicConfig(level=logging.INFO)
logging.info("nexturl: %s", nexturl)
# 如果要保存到文件：
logging.basicConfig(filename='...', encoding='utf-8')
```

### [pprint](https://docs.python.org/3/library/pprint.html)

pretty-print，打印对象比较好用。

### configparser

py 自带模块。configparser 做 config 对客户而言比较新手友好。如果对 config file 有很高兼容性要求可以用 json。

```py
from configparser import ConfigParser
config = ConfigParser()
config.read("config.ini")                   # 读
config.get(section, option, fallback="")    # 获取（带默认值）
config[section][option] = value             # 新增 / 修改
with open("config.ini", "w") as configfile:
  config.write(configfile)                  # 写
```

## GUI

一些 GUI 框架。（我都没用过）

- [nicegui](https://github.com/zauberzeug/nicegui)：基于 web 的
- [Flet](https://github.com/flet-dev/flet)：跨平台 Flutter 应用
- [Tkinter-Designer](https://github.com/ParthJadhav/Tkinter-Designer)
- [CustomTkinter](https://github.com/TomSchimansky/CustomTkinter)

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

### 多图片转 pdf

```py
import img2pdf
temp = [BytesIO(...), BytesIO(...)]
# temp 也可以是字符串数组，包含本地图片路径
with open('第二册答案.pdf', "wb") as f:
    write_content = img2pdf.convert(temp)
    f.write(write_content)
```

### Image 对象转为 bytes

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

## 打包

虽然我只使用过 [pyinstaller](#pyinstaller)，但是还有其他的打包工具，能够打出更小的体积与更高的性能：

- [nuitka](https://nuitka.net/)
- [cx_Freeze](https://cx-freeze.readthedocs.io/en/latest/installation.html)

### Pyinstaller

Pyinstaller 会打包当前环境的所有模块。需要隔离出虚拟环境进行打包，参考 [miniconda](#miniconda)。

#### 安装

`pip install pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple`

#### 命令

在.py 目录下，所需环境内执行`pyinstaller -D xxxx.py`

参数解释：

- `-D` 打包为目录文件
- `-F` 打包为单个 exe 文件
- `-w` 运行时不显示命令窗口
- `-i <icon.ico>` 设置图标

## [代码混淆](https://pyob.oxyry.com/)

## 一些问题

### 找不到 pip

执行 `python -m pip install --upgrade pip` 后报错：

> ERROR: Could not install packages due to an OSError: [WinError 5] 拒绝访问。: 'c:\\python310\\scripts\\pip.exe'

之后再使用 `pip` 命令时，就会不断报错，找不到 pip。我觉得很怪。`C:\Python310\Scripts` 路径下也能找得到 pip.exe，环境变量也没改。我在当前路径下打开 cmd ，执行 pip，然而还是不能正常使用。 ~~（忘了报什么错了）~~ 鼓捣了一会儿，试图使用离线安装，提示找不到 wheel.exe.

最终解决方法：在[此页面](https://pypi.org/project/pip/#files)下载`.tar.gz`,解压后在目录下执行 `setup.py build` 与 `python -m pip install --upgrade pip --user`。

## external

1. [The Right Way to Run Shell Commands From Python](https://martinheinz.dev/blog/98)
2. [Python 小整数与大整数的处理机制以及整体解释与逐行解释的区别](https://tryanswer.github.io/2018/05/17/py-int-confusing/)
