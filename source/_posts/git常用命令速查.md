---
title: git常用命令速查
date: 2019-08-20 16:01:02
tags:
  - git
---

* 521xueweihan/git-tips: Git的奇技淫巧  
https://github.com/521xueweihan/git-tips

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






