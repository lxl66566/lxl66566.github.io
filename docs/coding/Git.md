---
sidebar: 'auto'
---
# Git
## 是什么
Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. ——[Git官网](https://git-scm.com/)

说人话：代码管理（包括备份，归档，分支等常用功能）

## 如何使用

下载安装git后，在任意目录右击即可看到Git Bash Here （命令行界面）和 Git GUI Here （图形界面）。本文仅介绍Git Bash用法。

当然，git安装时会将自身安装目录添加到环境变量，因此你也可以在cmd或Powershell中使用git命令。

## 常用命令
### 创建仓库
```sh
git init
```
创建仓库后，目录下出现`.git`隐藏文件夹，即为仓库本体。

因此若要删除仓库，最快捷的方法就是直接删除`.git`文件夹。
### 添加文件
```sh
git add filename.xxx    #添加文件
git add dirname         #添加文件夹
git add -A              #添加目录下所有文件与文件夹
git add *.py            #添加所有后缀为.py的文件
```
关于“添加所有文件”不同方法的差异，请看[这里](https://www.jb51.net/article/191458.htm)

该方法用于将文件添加到暂存区。

### 打包
添加文件后需要将暂存区的文件打包到仓库内。
```sh
git commit -m '注释'
```
你可以任意填写对文件的注释。请注意，使用此命令的一次commit会将所有变化的文件添加同一个注释。若需要对不同文件添加不同注释，你可以：

1. 分批add，并每次commit不同的注释
2. 一次性add，并每次使用`sh commit file1.xxx file2.xxx`命令打包。使用命令后，bash会打开文本编辑器(Vim)，你需要对Vim拥有最基本的了解才能添加注释。

*（注：ssh密钥生成后首次添加注释可能会出现额外提醒，请根据提醒照做）*
### 远程仓库
将你的仓库上传到github等平台。
#### 连接远程仓库
:::: code-group
::: code-group-item SSH
```sh
git remote add origin git@github.com:yourgithubID/gitRepo.git
```
:::
::: code-group-item HTTPS
```sh
git remote add origin https://github.com/yourgithubID/gitRepo.git
```
:::
::::
::: tip
注：首次使用ssh连接需要先配置ssh证书。
```sh
cd ~        # 进入根目录，若已进入请忽略
ssh-keygen -t rsa -C "youremail@example.com"
            # 然后一路回车
clip < ~/.ssh/id_rsa.pub    # 复制密钥至剪切板
            # 点击github右上角头像，进入Settings-SSH and GPG keys，新建你的ssh key并粘贴内容，标题可不写
ssh -T git@github.com       #你可输入该命令验证是否成功
```
:::

若你遇到`ssh: connect to host github.com port 22: Connection refused` / `bash: clip: command not found`错误，可以参考[疑难解答](#疑难解答)。
#### 上传到远程仓库
请确保已连接远程仓库。
```sh
git push origin main
```

上述代码默认分支名为`main`（github的默认分支名），你可以将`main`替换为任意自己想要的分支。同时用户名`origin`也可自由更改。

你也可以在`push`命令后加入`-u`参数，代表将当前分支设为默认。`-f`参数代表强制推送，即不比对远程仓库直接覆盖上传。

#### 删除已连接的远程仓库

```sh
git remote remove origin
```

:::tip 提示
至此，你已经可以完成github等平台的文件上传了。

接下来是一些其他命令
:::
### 查看仓库文件
```sh
git ls-files
```
### 更改分支
```sh
git branch -m BranchName
```
若需要将分支改名：
```sh
git branch -m OldBranchName NewBranchName
```

### 删除文件
* 仅删除仓库内文件（不删除本地文件）
```sh
git rm --cached filename.xxx
```
* 同时删除仓库内文件与本地文件
```sh
git rm filename.xxx
```
* 删除仓库内**文件夹**：添加`-r`参数。；例如：`git rm -r --cached dirname`

### 从仓库内恢复文件
```sh
git checkout -- filename
```
`--`与`filename`之间有空格。
### 更新远程仓库到本地
```sh
git fetch origin main
```
若还需要从仓库中释放分支：
```sh
git merge origin/main
```
### 修改注释
~~原则上，不应该更改注释~~

git提供了修改最近一次注释的方法：
```sh
git commit --amend
```
注：需要使用Vim[^1]。
### 删除远程tag
如果在github上新建了一个release后，代码又发生了改变，此时release中的source code将不会自动更新。我们可以通过删除原tag再添加tag的方法更新source code。（release信息会被保留，状态更改为draft）

仅删除远程tag：
```sh
git push origin :refs/tags/TAGNAME
```

## 高级技巧
### 忽略文件(夹)
1. 在仓库所在根目录下新建文本文档，输入你需要忽略的文件或文件夹（文件需带有后缀），以回车键隔开。
2. 保存并重命名为`.gitignore`。
### 自动化脚本
1. 新建文本文档，输入你需要的所有指令语句，以回车键隔开。
2. 保存并将该文本文档后缀改为`.sh`。
3. 双击运行即可。

::: tip
脚本执行完成后将自动关闭窗口。若需使之不自动关闭，请添加`exec /bin/bash`指令至末行。
:::
### 将注释设为当前时间
```sh
git commit -m $(date "+%Y%m%d-%H:%M:%S")
```
例：注释为`20220613-11:34:59`。可根据个人习惯修改格式。
### 取消目录安全提示
自己是搞小破玩意的，没必要一直被安全提示烦（笑
```sh
git config --global --add safe.directory '*'
```
## 疑难解答
* ssh密钥添加后出现`ssh: connect to host github.com port 22: Connection refused`错误。
>
> 以下内容摘自[此文](https://segmentfault.com/a/1190000041909858)，可自行前往查看。
>
>尝试连接GitHub的443端口。
> ```sh
> vim ~/.ssh/config
> ```
> 然后在打开的vim编辑器内添加以下内容：
> ```
> Host github.com
>   Hostname ssh.github.com
>   Port 443
> ```
> 此时回到[这里](#连接远程仓库)进行实验。成功连接即解决问题。

* 复制密钥时遇到`bash: clip: command not found`错误。
> `clip.exe` should be in `C:\Windows\System32\` or `C:\Windows\SysWOW64\`. You can check if those folders are in your path by doing `echo $PATH`. If they aren't (which would surprise me), you can add them.
> 
> 不过这只是复制一个密钥的事，用不着那么麻烦。执行`cat ~/.ssh/id_rsa.pub`手动复制你的密钥即可。

[^1]:按`i`或`a`进入insert模式，编辑完后按esc进入normal模式，输入`:wq`保存并退出。更多命令请看[这里](https://yianwillis.github.io/vimcdoc/doc/quickref.html#quickref)或者[这里](https://coolshell.cn/articles/5426.html)。