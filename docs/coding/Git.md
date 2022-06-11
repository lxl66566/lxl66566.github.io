# Git
## 是什么
Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. ——[Git官网](https://git-scm.com/)

说人话：代码管理（包括备份，归档，分支等常用功能）

## 如何使用

下载安装git后，在任意文件夹右击即可看到Git Bash Here （命令行界面）和 Git GUI Here （图形界面）。本文仅介绍Git Bash用法。

当然，git安装时会将自身安装目录添加到环境变量，因此你也可以在cmd或Powershell中使用git命令。

## 常用命令
### 创建仓库
```
git init
```
创建仓库后，目录下出现`.git`隐藏文件夹，即为仓库本体。

因此若要删除仓库，最快捷的方法就是直接删除`.git`文件夹。
### 添加文件
```
git add filename.xxx    #添加文件
git add dirname         #添加文件夹
git add -A              #添加目录下所有文件与文件夹
git add *.py            #添加所有后缀为.py的文件
```
关于“添加所有文件”不同方法的差异，请看[这里](https://www.jb51.net/article/191458.htm)

该方法用于将文件添加到暂存区。

### 打包
添加文件后需要将暂存区的文件打包到仓库内。
```
git commit -m '注释'
```
你可以任意填写对文件的注释。请注意，使用此命令的一次commit会将所有变化的文件添加同一个注释。若需要对不同文件添加不同注释，你可以：

1. 分批add，并每次commit不同的注释
2. 一次性add，并每次使用`git commit file1.xxx file2.xxx`命令打包。使用命令后，bash会打开文本编辑器(Vim)，你需要对Vim拥有最基本的了解才能添加注释。

### 查看仓库文件
```
git ls-files
```
### 上传
将你的仓库上传到github等平台。
#### http

连接远程仓库
```
git remote add origin https://github.com/yourgithubID/gitRepo.git
```
上传
```
git push origin main
```
#### ssh

首次使用ssh需要先配置ssh证书。
```
cd ~            #进入根目录，若已进入请忽略
ssh-keygen -t rsa -C "youremail@example.com"
                #然后一路回车
cat ~/.ssh/id_rsa.pub
                #复制出现的全部内容
                #进入github-Settings-SSH and GPG keys，新建你的ssh key并粘贴内容
ssh -T git@github.com       #你可输入该命令验证是否成功
```
连接远程仓库
```
git remote add origin git@github.com:yourgithubID/gitRepo.git
```
上传
```
git push origin main
```
#### 注意

上述代码默认分支名为`main`（github的默认分支名），你可以将`main`替换为任意自己想要的分支。同时用户名`origin`也可自由更改。

你也可以在`push`命令后加入`-u`参数，代表将当前分支设为默认。

#### 删除已连接的远程仓库

```
git remote remove origin
```

### 更改分支
```
git branch -m BranchName
```
若需要将分支改名：
```
git branch -m OldBranchName NewBranchName
```

### 删除文件
* 仅删除仓库内文件（不删除本地文件）
```
git rm --cached filename.xxx
```
* 同时删除仓库内文件与本地文件
```
git rm filename.xxx
```
### 从仓库内恢复文件
```
git checkout -- filename
```
`--`与`filename`之间有空格。
### 更新远程仓库到本地
```
git fetch origin main
```
若还需要从仓库中释放分支：
```
git merge origin/main
```
### 修改注释
~~原则上，不应该更改注释~~

git提供了修改最近一次注释的方法：
```
git commit --amend
```
注：需要使用Vim。


[^1]:按`i`或`a`进入insert模式，编辑完后按esc进入normal模式，输入`:wq`保存并退出。更多命令请看[这里](https://yianwillis.github.io/vimcdoc/doc/quickref.html#quickref)或者[这里](https://coolshell.cn/articles/5426.html)。