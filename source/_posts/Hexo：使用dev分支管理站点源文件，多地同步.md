---
title: 'Hexo: 使用dev分支管理站点源文件，多地同步'
date: 2019-06-16 00:14:49
tags:
  - hexo
---

## 使用dev分支管理站点、源文件，多地同步
5点钟被蚊子吵醒了，dong还在睡觉于是跑来310用zb的电脑玩耍，突然想用zb的键盘写博客。  

https://www.jianshu.com/p/4bcf2848b3fc
```bash
hexo d
```
hexo的部署命令会自动生成站点文件进行git commit，将修改push到指定的remote branch一般是master中。  
根据Hexo建站完成部署，其实我们的本地源文件都没有同步在github上。我在我的xxx.github.io仓库中创建了一个dev分支，用于管理源文件。  
使用vscode注意修改.git文件夹中的config文件就可以了  
``` conf
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
推送时会有remote: Permission to A denied to B地问题，原因是系统已经记住了zb的密码，每次push操作都会读取zb的信息。查了一下解决方案，决定还是不删他账号也不重新生成密钥了。  
敲完这些，发现他的电脑还没hexo，于是我把他的键盘和U盘一起拿走了。  