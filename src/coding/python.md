---
date: 2022-05-04
icon: python
category:
  - 编程
tag:
  - 编程语言
---

# Python

python 易学易用，使用广泛，生态完善，除了性能外没啥缺点。

在经历了 bash 地狱般的折磨[^2]后，我选择 python 作为脚本语言。

[^2]: [喜欢我 `"${arr[@]}"` 吗？](https://t.me/withabsolutex/1374)

## 安装

python 本身的安装应该不用我多说，windows [scoop](../farraginous/recommend_packages.md#scoop) / archlinux pacman 一行结束。不过注意，没有启用虚拟环境时，电脑中**最好只有一个 python**。

## 开发环境

关于开发，我直接无脑 all in [vscode](./vscode.md)。

### vscode 扩展

开发 python 前，强烈建议安装以下扩展：

- **Python** - Microsoft
- **Ruff** - Charlie Marsh：linter + formatter + highlighter
  - [配置技巧](https://stackoverflow.com/questions/75639719/decrease-mistake-severity-for-ruff-python-linter-in-vscode-extension)
  - ruff 的 formatter [几乎与 black 兼容](https://docs.astral.sh/ruff/faq/#is-the-ruff-linter-compatible-with-black)，因此可以放心用。
    - python 的代码风格非常统一，是一件好事。（反观隔壁 `.clang-format` 行数）
  - ruff 的 highlighter 以白色居多，可能会让人误以为没有 highlighter。（pylance 用多了是这样(笑)）
- (optional) **isort** - Microsoft：提供 import 排序，formatter
- (optional) **Black Formatter** - Microsoft：formatter

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

这里是[官方教程](https://python-poetry.org/docs/#installation)。poetry 在 windows 上的 install script 可谓傻逼[^1]，开代理不能装，关代理不能装，scoop 用的也是官方 install script。只好使用 pip。

```sh
pip install poetry -i https://pypi.tuna.tsinghua.edu.cn/simple
```

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
  - 激活：`poetry shell`（或在虚拟环境目录执行 `call activate.bat`）
- 运行：`poetry run python <filename>.py`

#### 换源

参考[文档](https://python-poetry.org/docs/repositories#project-configuration)。

```toml
[[tool.poetry.source]]
name = "tsinghua-pypi"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
priority = "default"
```

#### 缓存

poetry 默认把虚拟环境和包都装在 C 盘。若空间不足，可以考虑改缓存位置：`poetry config cache-dir D:\\poetry_enev`

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

关于包管理器，除了 _poetry_ 和 _conda_ 外，还有例如 [_pdm_](https://github.com/pdm-project/pdm) 可以尝试使用。

如果不使用现代包管理器（如果用 pip），需要在项目下导出一个 `requirements.txt` 用于声明项目依赖。可以用 pip 导出，也可以自己写模块。可以不写版本，只写每行一个模块名。

## 语言相关

### 基本概念

- python 函数传参跟其他语言很像，基本类型是值传递，object, list, dict 是引用传递。
  - 深拷贝和浅拷贝，这个应该是编程基本概念而不是语言基本概念。
- python 的类型标注只会报警告，运行时不检查。
- 每个目录 / `.py` 文件都被视作一个模块。
  - `import ./xxx` 是当前目录模块，不加 `./` 是顶层模块。
- python 不支持重载。

### assert

> 都写 py 了，性能已经不敏感了，不如多做点防御性编程。

```py
assert need_be_true(), "error message"
```

assert 的 error message 不是 & 不能改红色，让我很不爽。

### 解耦

```py
def printa(a, b, c):
    print(a, b, c)

l = {
    "a": 1,
    "b": 2,
    "c": 3,
}
printa(**l)
```

但是要注意，使用条件很严格，参数不能多也不能少。我没有找到一个比较好的设置 default 的方法。

`*` 是解 list，`**` 是解 dict。

## 语法糖

### map

```py
a = [1, 2, 3]
b = [i**2 for i in a]
# b = [1, 4, 9]
```

### supress

“抑制”

```py
from contextlib import suppress
with suppress(Exception):
    something_could_go_wrong()
# 能少写两行。等价于
# try:
#     something_could_go_wrong()
# except Exception:
#     pass
```

### [walrus operator](https://www.freecodecamp.org/chinese/news/introduction-to-the-walrus-operator-in-python/)

`if` 和 `while` 里创建临时变量用的。简单清晰，容易控制生命周期。

## 自带模块

这里的模块都不需要额外安装。python 自带。

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

pretty-print，打印嵌套数据结构比较好看。**pprint 不能打印 object 信息。**

```py
from pprint import pprint
pprint({"a": 1, "b": 2})  # {'a': 1, 'b': 2}
pprint(an_obj)  # <__main__.o object at 0x00000234DC0FAF60>
```

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

### [subprocess](https://docs.python.org/zh-cn/3/library/subprocess.html)

写脚本必不可少的东西，可以向终端发出信息。代替 `os.system()`。

```py
from subprocess import run  # 官方建议使用 run 代替所有其他低阶函数
run("ls", "-al", check=True)  # check=True 表示遇到错误则发出异常，= run(..).check_returncode()
run("ls | grep py", shell=True) # shell=True 无需拆分命令，如果碰到管道或复杂指令还是不要难为自己
a = run("ls", "-al", capture_output=True) # 获取输出
```

### pathlib

也是写脚本必不可少的东西。操作文件。

```py
from pathlib import Path
Path("a.py").read_text(s: str, encoding="utf-8")  # 读取
Path("a.py").write_text(s: str, encoding="utf-8") # 写入
Path("a.py").unlink()  # 删除
```

### timeit

benchmark.

```py
from timeit import timeit
def a():
    pass
print(timeit(a,number=10000))
```

### pickle

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

## 常用外部包

### pandas

读 xlsx/csv 神器，爆杀 openpyxl。

```py
import pandas as pd
file = pd.ExcelFile("a.xlsx")
for name in file.sheet_names:
    sheet = pd.read_excel(file, sheet_name=name)
    for _, row in sheet.iterrows():
        print(row["姓名"])
```

## GUI

一些 GUI 框架。（我都没用过）

- [nicegui](https://github.com/zauberzeug/nicegui)：基于 web 的
- [Flet](https://github.com/flet-dev/flet)：跨平台 Flutter 应用
- [Tkinter-Designer](https://github.com/ParthJadhav/Tkinter-Designer)
- [CustomTkinter](https://github.com/TomSchimansky/CustomTkinter)

### CustomTkinter

用过，文档没搜索功能，该有回调的地方不给回调，关联变量只能 get 不能 set。。。

系统需要有 tkinter，例如 archlinux 需要安装 `tk`。

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

## django

django 能够快速搭建一个网站。

django 的前后端是深度耦合的，前端大概只能使用传统三件套（但是据说可以用 GraphQL 做中间层与框架式前端进行交互，没试过），后端自然就是 python 了。

### 数据库

> 由于我平常接触的不是 django 开发而是运维，所以这里主要讲讲数据库内容。

django 做了 ORM。django 官方支持[这些数据库](https://docs.djangoproject.com/en/4.2/ref/databases/#databases)。

首先进行数据库操作前需要选择 model（可以理解为选表）。具体看 `models.py` 的实现。

```py
from Djangoxxx.models import <module_name>
```

然后根据需求选出 object 或者 queryset.

```py
qs = <module_name>.objects.all()
obj = <module_name>.objects.get(id='xxx')
qs = <module_name>.objects.filter(FinishTime__range=[datetime(2023, 1, 1, 00, 00),datetime(2023, 11, 5, 00, 00)])  # 区间筛选 datetime
```

再进行进一步处理。

```py
c = qs.values_list('price', flat=True)  # 获取某一列(colume)
print(c[0])             # 然后类似 list 形式操作取值
obj = qs.get(id='xxx')  # 可以从 queryset 中取 object
print(obj.id)           # 然后从 object 中取值
```

取了值就可以爱干啥干啥了。我不太习惯高层次的抽象，因此类似求和啥的虽然 django 也提供了 `django.db.models.Sum`，但有查文档的功夫早都写好了，还是自己做吧。

## 打包

一些工具

- [nuitka](https://nuitka.net/)
- [cx_Freeze](https://cx-freeze.readthedocs.io/en/latest/installation.html)

### nuitka

这玩意文档只能说一般，甚至没有 `--help` 好用。

- 安装（[poetry](#poetry)）：`poetry install --group dev nuitka`
- 我使用的打包指令：
  ```sh
  nuitka3 --run --follow-imports --prefer-source-code --clang --disable-console --noinclude-pytest-mode=nofollow --noinclude-setuptools-mode=nofollow --plugin-enable=upx main.py
  ```
  - `--clang` 是选择 C 编译器，不用 clang 的话就不指定。
  - `--disable-console`，因为我打包的是 GUI 程序。
  - `--plugin-enable=upx` 使用 [upx](../articles/minimize_exe.md) 插件能够压缩程序大小。需要已安装 upx。
- 其他命令：自行 `nuitka3 --help` 查看

### Pyinstaller

简单粗暴的传统打包工具。

::: details 不再使用
Pyinstaller 会打包当前环境的所有模块，一般需要隔离出虚拟环境进行打包，参考 [poetry](#poetry) / [miniconda](#miniconda)。

并且若需要减小打包体积，则需要考虑创建纯净环境。

#### 安装

`pip install pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple`

#### 命令

在.py 目录下，所需环境内执行`pyinstaller -D xxxx.py`

参数解释：

- `-D` 打包为目录文件
- `-F` 打包为单个 exe 文件
- `-w` 运行时不显示命令窗口
- `-i <icon.ico>` 设置图标

:::

## [代码混淆](https://pyob.oxyry.com/)

## 一些问题

### 为什么不该使用 pipx

在一次迁移 python 的过程后，我再次使用 pipx 及其安装的软件，报错 _python not found_（指向我原先的 python 位置）。

我纳闷了，我直接 `python` 能用，也把所有环境变量全改成了新 python 的位置，检查了好几次，为啥还是不能用？

然后重装 pipx：

```sh
pip install --upgrade --force-reinstall pipx -i https://pypi.tuna.tsinghua.edu.cn/simple
```

仍然不行。后来在 `~/.local/pipx/shared/pyvenv.cfg` 找到了没改过的 python 路径。

原来你重装是不动配置文件的啊，卸了卸了。

实际上对于全局用 pip，虚拟环境开 poetry 的我来说，pipx 确实是一个没必要存在的东西。

### 找不到 pip

执行 `python -m pip install --upgrade pip` 后报错：

> ERROR: Could not install packages due to an OSError: [WinError 5] 拒绝访问。: 'c:\\python310\\scripts\\pip.exe'

之后再使用 `pip` 命令时，就会不断报错，找不到 pip。我觉得很怪。`C:\Python310\Scripts` 路径下也能找得到 pip.exe，环境变量也没改。我在当前路径下打开 cmd ，执行 pip，然而还是不能正常使用。 ~~（忘了报什么错了）~~ 鼓捣了一会儿，试图使用离线安装，提示找不到 wheel.exe.

最终解决方法：在[此页面](https://pypi.org/project/pip/#files)下载`.tar.gz`,解压后在目录下执行 `setup.py build` 与 `python -m pip install --upgrade pip --user`。

## external

1. [The Right Way to Run Shell Commands From Python](https://martinheinz.dev/blog/98)
2. [Python 小整数与大整数的处理机制以及整体解释与逐行解释的区别](https://tryanswer.github.io/2018/05/17/py-int-confusing/)
