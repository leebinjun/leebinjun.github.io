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






