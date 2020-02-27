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


提交当前工作空间的修改内容，例如'git commit -m story #3, add user model'，提交的时候必须用-m来输入一条提交信息
``` shell
git commit -m d
```

将本地commit的代码更新到远程版本库中，例如'git push origin'就会将本地的代码更新到名为orgin的远程版本库中
``` shell
git push origin master
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




