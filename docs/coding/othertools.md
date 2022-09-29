---
sidebar: 'auto'
---
# 其他工具
## anaconda
提供python包管理与虚拟环境。

对我来说则是打包工具。由于pyinstaller的打包会将环境内所有的工具包都整合到一起，因此使用anaconda的虚拟环境隔离出运行所需环境，可以减小打包的体积。

Anaconda体积过于庞大（6G+），**强烈建议安装miniconda**。<span class="heimu" title="你知道的太多了">Anaconda捆绑祸害了多少编程新人！</span>
### 基本命令
#### 创建环境
```batch
conda create -n Name python=3.9
```

`Name`为你需要的环境名称，下同。`Python=3.9`则指定了python的版本。你可改为任意需要的版本。
#### 迁移环境
```batch
conda create -n Name --clone FromEnvName
```

`FromEnvName`为需要克隆的环境名称。

#### 查看环境
```batch
conda info -e
```
#### 唤醒环境
```batch
conda activate Name
```
#### 关闭环境
```batch
conda deactivate
```
#### 删除环境
```batch
conda remove -n Name --all
```

（注：也可进入anaconda安装目录下的`/envs/`删除对应文件夹）
#### 查看环境内工具包
```batch
conda list
```
### 高级技巧
#### bat文件中调用conda指令
调用前加入指令：
```batch
call activate.bat
```
#### 创建纯净环境
我们使用[上述指令](#创建环境)创建环境后：

<img alt="anaconda_list" src="https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/anaconda_1.png"  width="65%" height="65%"/>

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

2. 该目录下打开conda命令行，执行
```batch
conda create --name Name --file env.txt
```

或者将`env.txt`输入为绝对路径以便在任意目录执行。

执行结果：

![anaconda_pureenv](https://cdn.staticaly.com/gh/lxl66566/lxl66566.github.io/images/coding/anaconda_2.png)

这样，一个纯净环境就创建好了，你可以[安装Pyinstaller](#安装)进行打包前的准备。

## Pyinstaller
### 安装
```batch
pip install pyinstaller -i https://pypi.tuna.tsinghua.edu.cn/simple
```
### 命令
在.py目录下的所需环境内执行
```batch
pyinstaller -D xxxx.py
```
参数解释：
* `-D` 打包为目录文件
* `-F` 打包为单个exe文件
* `-w` 运行时不显示命令窗口
### 建议
打包前复制一份代码（或使用git备份）