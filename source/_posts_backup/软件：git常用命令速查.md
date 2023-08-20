---
title: git常用命令速查
date: 2019-08-20 16:01:02
tags:
  - git
---

* 521xueweihan/git-tips: Git的奇技淫巧  
https://github.com/521xueweihan/git-tips

* 程序员必备工具 – SadAngel的小屋  
http://www.sadangel.cn/category/%e7%a8%8b%e5%ba%8f%e5%91%98%e5%bf%85%e5%a4%87%e5%b7%a5%e5%85%b7/

<!-- more -->
<The rest of contents | 余下全文>

## GitKraken——git的UI界面

* gitkranken官网  
https://www.gitkraken.com/

<img src="打磨工具的日常\001.png">

### 登录
### 授权
### 使用

## 命令查询

已经有一个远程的Git版本库，只需要在本地克隆一份
``` shell
git clone xxx.git 
```

当本地创建了一个工作目录，可以进入这个目录，使用'git init'命令进行初始化
``` shell
git init
```

Git以后就会对该目录下的文件进行版本控制，这时候如果需要将它放到远程服务器上，可以在远程服务器上创建一个目录，并把可访问的URL记录下来，此时可以利用'git remote add'命令来增加一个远程服务器端
``` shell
git remote add origin xxx.git
```

从其他的版本库（既可以是远程的也可以是本地的）将代码更新到本地，例如：'git pull origin master'就是将origin这个版本库的代码更新到本地的master主枝
``` shell
git pull origin master
```

将当前更改或者新增的文件加入到Git的索引中，加入到Git的索引中就表示记入了版本历史中，这也是提交之前所需要执行的一步，例如'git add app/model/user.rb'就会增加app/model/user.rb文件到Git的索引中
``` shell
git add .
```

提交当前工作空间的修改内容，提交的时候必须用-m来输入一条提交信息  
``` shell
git commit -m d
```

将本地commit的代码更新到远程版本库中，例如'git push origin master'就会将本地当前代码更新到远程仓库orgin的master分支上  
``` shell
git push origin master
```

回滚到特定版本  
查看近三次提交日志
``` shell
git log -3
```
回滚到特定版本
``` shell
git reset --hard e8027d79c3e3a4b30196d3b35d456abfa9acd99e8
```
强制提交  
``` shell
git push -f origin master
```


## 利用.gitignore文件忽略指定文件

* 新建.gitignore文件输入要忽略的文件
* 清本地缓存，再提交
``` bash
git rm -r --cached .
git add .
git commit -m '×××××'
```

``` bash
.gitignore文件实例：
   *.a       # 忽略所有 .a 结尾的文件  
   !lib.a    # 但 lib.a 除外  
   /TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO  
   build/    # 忽略 build/ 目录下的所有文件  
   doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt  
```


## 解决git冲突：please move or remove them before you can merge

先将冲突的代码备份一下，删除本地修改，解决冲突后再还原，最后push代码。

``` shell
git clean -d -fx 
git pull origin master
```


## Git底层原理

* GIT底层原理（一）  
https://blog.csdn.net/qq360694660/article/details/80256367 

* 深入理解Git的实现原理  
https://www.cnblogs.com/mamingqian/p/9711975.html

Git的核心是它的对象数据库，其中保存着git的对象，其中最重要的是blob、tree和commit对象，blob对象实现了对文件内容的记录，tree对象实现了对文件名、文件目录结构的记录，commit对象实现了对版本提交时间、版本作者、版本序列、版本说明等附加信息的记录。这三类对象，完美实现了git的基础功能：对版本状态的记录。
 
Git引用是指向git对象hash键值的类似指针的文件。通过Git引用，我们可以更加方便的定位到某一版本的提交。Git分支、tags等功能都是基于Git引用实现的。
 
 
### 流程
* 创建工作目录，对文件进行修改
* git add .  
    * git hash-object -w 文件名  
    * git update-index ...  
* git commit -m "注释"  
    * git write-tree   
    * git commit-tree  



