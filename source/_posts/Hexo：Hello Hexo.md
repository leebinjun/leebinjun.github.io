---
title: Hexo：Hello Hexo
date: 2019-04-19 22:30:18
tags:
  - hexo
---
** {{ title }} ** <Excerpt in index | 首页摘要>
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
#### npm install 慢的话
``` bash
显示当前的镜像网址
$ npm get registry 
https://registry.npmjs.org/
使用淘宝的镜像网址
$ npm config set registry http://registry.npm.taobao.org
```

### 静态博客搭建
``` bash
$ hexo init blog
$ cd blog
$ npm install
$ hexo s
```
浏览器访问：http://localhost:4000/ 
按Ctrl+C停止  


### 配置到GitHub

在github上创建仓库，仓库名称为：用户名.github.io
配置blog\\_config.yml中的deploy

``` yml
deploy:
  type: git
  repo: git@github.com:your_github_user_name/your_github_user_name.github.io.git
  branch: master
```

生成 ssh key
``` bash
$ ssh-keygen -t rsa -C xxx@qq.com(your_email)
$ 连按三次Enter
```
其中ssh-keygen.exe在.\Git\usr\bin文件夹中  
根据路径提示找到id_rsa.pub文件，拷贝公钥  
进入github账户设置，在ssh and GPG keys中新增一个ssh key  
把刚刚拷贝出来的公钥粘贴到key中，title放空就好  

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
``` yml
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

``` yml
post_asset_folder: true
```
安装插件
``` bash
npm install hexo-asset-image --save
```

html语法
``` html
<div align=center>
<img alt="title" src = "path to xxx.png" width=999 height=999>
</div>
```