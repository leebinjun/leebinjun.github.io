---
title: Hello Hexo
---
** {{ title }}：** <Excerpt in index | 首页摘要>
Welcome to [Hexo](https://hexo.io/)! This is your very first post. Check [documentation](https://hexo.io/docs/) for more info. If you get any problems when using Hexo, you can find the answer in [troubleshooting](https://hexo.io/docs/troubleshooting.html) or you can ask me on [GitHub](https://github.com/hexojs/hexo/issues).
<!-- more -->
<The rest of contents | 余下全文>

## 准备

### 所需软件

* git: http://git-scm.com/
* node.js：http://nodejs.org/

查看是否安装成功

``` bash
$ git --version
$ npm -v
```

### Hexo 相关命令
``` bash
$ hexo new page"pageName"     新建页面
$ cls                         清屏
$ hexo clean                  清理项目
$ hexo g(generate)            生成静态页面至public目录
$ hexo s(server)              开启预览访问端口
$ hexo d(deploy)              将.deploy目录部署到GitHub
$ hexo help                   查看帮助
$ hexo version                查看Hexo的版本
```

## 部署

### 安装hexo

``` bash
$ npm install hexo-cli -g
```

安装hexo-deployer-git工具
``` bash
$ npm install hexo-deployer-git --save
```

### 静态博客搭建
``` bash
$ hexo init blog
$ cd blog
$ npm install
$ hexo s
```
浏览器访问：http://localhost:4000/ 
按Ctrl+C停止</br> 

### 配置到GitHub

在github上创建仓库，仓库名称为：用户名.github.io
配置blog\\_config.yml中的deploy

``` bash
deploy:
  type: git
  repo:git@github.com:your_github_user_name/your_github_user_name.github.io.git
  branch: master
```

生成 ssh key
``` bash
$ ssh-keygen -t rsa -C xxx@qq.com(your_email)
```
ssh-keygen.exe在.\Git\usr\bin文件夹中
根据提示找到id_rsa.pub文件拷贝公钥
进入github账户设置，在ssh and GPG keys中新增一个ssh key
把刚刚拷贝出来的公钥粘贴到key中，title放空就好</br>

验证ssh key
``` bash
$ ssh -T git@github.com
```

在本地hexo init生成的文件夹中初始化git仓库
``` bash
$ git init
```
将本地仓库和远程仓库连接
``` bash
$ git remote add origin git@github.com:your_github_user_name/your_github_user_name.github.io.git
```

## Quick Start

### Create a new post

``` bash
$ hexo new "My New Post"
```

More info: [Writing](https://hexo.io/docs/writing.html)

### Run server

``` bash
$ hexo server
```

More info: [Server](https://hexo.io/docs/server.html)

### Generate static files

``` bash
$ hexo generate
```

More info: [Generating](https://hexo.io/docs/generating.html)

### Deploy to remote sites

``` bash
$ hexo deploy
```

More info: [Deployment](https://hexo.io/docs/deployment.html)


## 网站部署

``` bash
$ hexo clean  //清除缓存文件db.json和已生成的静态文件public
$ hexo g      //生成网站静态文件到默认设置的public文件夹
$ hexo s      //开启服务器预览网址
$ hexo d      //部署网站到设定的仓库
```



## 主题

### 挑选主题
* Themes | Hexo https://hexo.io/themes/
* Themes · hexojs/hexo Wiki https://github.com/hexojs/hexo/wiki/Themes

## 添加主题
复制主题到themes目录下
``` bash
cd themes && git clone https://github.com/maochunguang/black-blue(主题地址)
```

配置blog\\_config.yml，修改对应主题目录名
``` bash
theme: 主题名称
```

重新生成静态页面
``` bash
hexo g
```
启动本地服务，重新访问：http://localhost:4000/ ，查看新主题的效果
``` bash
hexo s
```
确认后上传到github，通过 用户名.github.io 访问查看最终效果
``` bash
hexo d
```

## 插入图片

### 设置
配置blog\\_config.yml

``` bash
post_asset_folder: true
```
安装插件
``` bash
npm install hexo-asset-image --save
```

## 使用dev分支管理站点、源文件，多地同步
5点钟被蚊子吵醒了，dong还在睡觉于是跑来310用zb的电脑玩耍，突然想用zb的键盘写博客。  

https://www.jianshu.com/p/4bcf2848b3fc
```bash
hexo d
```
hexo的部署命令会自动生成站点文件进行git commit，将修改push到指定的remote branch一般是master中。  
根据Hexo建站完成部署，其实我们的本地源文件都没有同步在github上。我在我的xxx.github.io仓库中创建了一个dev分支，用于管理源文件。  
使用vscode注意修改.git文件夹中的config文件就可以了  
``` bash
[core]
	repositoryformatversion = 0
	filemode = false
	bare = false
	logallrefupdates = true
	symlinks = false
	ignorecase = true
[remote "origin"]
	url = https://github.com/leebinjun/leebinjun.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "dev"]
	remote = origin
	merge = refs/heads/dev
```
来到zb的电脑上，偷偷建一个文件夹  
clone博客代码到本地，发现是网页那一堆，没有源文件  
``` bash
git clone xxx.git
```
与远程仓库建立连接
``` bash
git remote add origin xxx.git
```
查看本地是否具有dev分支
``` bash
git branch  
```
没有dev分支,则从远端获取最新到本地，不会自动merge
``` bash
git fetch origin dev
```
在本地创建分支dev并切换到该分支  
``` bash
git checkout -b dev origin/dev   
```
拉取dev分支上的内容到本地了
``` bash
git pull origin dev             
```
然后就可以愉快地开始写博客了。  
推送时会有remote: Permission to A denied to B地问题，原因是系统已经记住了zb的密码，每次push操作都会读取zb的信息。查了一下解放方案，决定还是不删他账号也不重新生成密钥了。  
敲完这些，发现他的电脑还没hexo，于是我把他的键盘和U盘一起拿走了。  