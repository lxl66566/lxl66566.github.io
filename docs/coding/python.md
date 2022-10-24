---
sidebar: 'auto'
---
# Python
和[C++](./Cpp.md)页面一样杂乱，想到什么写什么。
## 导出全部环境依赖
`python -m pip freeze > requirements.txt`该命令导出全部环境使用的依赖包为`requirements.txt`。
## 从网站获取图片
```py
import requests
from PIL import Image
from io import BytesIO
response = requests.get(src)
image = Image.open(BytesIO(response.content))
image.show()
```
## 多图片转pdf
```py
import img2pdf
temp = [BytesIO(...), BytesIO(...)]
# temp 也可以是字符串数组，包含本地图片路径
with open('第二册答案.pdf', "wb") as f:
    write_content = img2pdf.convert(temp)
    f.write(write_content)
```
## miniconda
提供python包管理与虚拟环境。

对我来说则是打包工具。由于pyinstaller的打包会将环境内所有的工具包都整合到一起，因此使用conda的虚拟环境隔离出运行所需环境，可以减小打包体积。

Anaconda体积过于庞大（6G+），**强烈建议[安装miniconda](https://docs.conda.io/en/latest/miniconda.html)**。<span class="heimu" title="你知道的太多了">Anaconda捆绑祸害了多少编程新人！（包括我）</span>
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
### 在vscode中启用虚拟环境
创建虚拟环境并引入依赖后，代码仍会收到vscode的报错：

![set_vscode_environment](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/python/set_vscode_environment1.png)

解决方法：
1. `Ctrl + Shift + P`打开命令面板，搜索`Python: Select Interpreter`
2. 选中你的虚拟环境
## Pyinstaller
### 安装
`pip install pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple`
### 命令
在.py目录下，所需环境内执行`pyinstaller -D xxxx.py`

参数解释：
* `-D` 打包为目录文件
* `-F` 打包为单个exe文件
* `-w` 运行时不显示命令窗口