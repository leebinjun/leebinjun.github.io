---
title: 读研期间花销系统一：vscode连接mysql并进行查询
date: 2020-04-24 23:31:11
tags:
---

## mysql

初始化数据库，执行后会输出root用户的初始默认密码，如下j!9!KsxXstfL就是初始密码
``` bash
C:\Users\win10>D:\mysql-8.0.19-winx64\bin\mysqld.exe --initialize --console
2020-04-22T04:29:54.223007Z 5 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: j!9!KsxXstfL
```

安装
``` bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysqld.exe install
Service successfully installed.
```

登录MySQL，密码是初始化的默认密码
``` bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysql.exe -u root -p
```

修改密码
``` bash
C:\WINDOWS\system32>D:\mysql-8.0.19-winx64\bin\mysqladmin.exe -u root -p password
Enter password:   //这里输入上面的v:gNXSw5FTkw
New password:    //重新输入新密码
Confirm new password: //重新输入新密码
```

## 使用 Visual Studio Code 链接 MySql 数据库并进行查询

VScode 安装插件：
* MySQL
* MySQL Syntax

在文件菜单可以添加数据库连接。


右键数据库，可创建sql脚本

<img src="vscode连接mysql并进行查询\01.png">


右键可执行  
<img src="vscode连接mysql并进行查询\02.png">

<img src="vscode连接mysql并进行查询\03.png">




### 问题1：mysql由于找不到vcruntime140.dll，无法继续执行代码

不要相信光下载一个dll放到system32文件夹然后注册一下就能搞定的这种办法，下载安装微软常用运行库合集。  

* MySQL:由于找不到VCRUNTIME140_1.dll，无法继续执行代码。重新安装程序可能会解决此问题_数据库_Read by heart-CSDN博客  
https://blog.csdn.net/weixin_42545675/article/details/104108216

### 问题2：vscode 链接 mysql，报错MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol

* MYSQL：ER_NOT_SUPPORTED_AUTH_MODE:Client does not support authentication protocol - 今晚打老虎i2016 - 博客园  
https://www.cnblogs.com/Jiangchuanwei/p/10238958.html

原因：登录数据库的客户端跟mysql8.0不兼容了，mysql8.0密码认证采用了新的密码格式

解决办法：在系统mysql终端输入下面命令
```
//password 是你的数据库账户密码，root和host也是
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```



## SQL语句

查看前1000个数据
``` sql
SELECT * FROM `my_bill`.`dailybill_dailybill` LIMIT 1000;
```

将表1数据复制到表2
* Mysql复制表结构、表数据的方法_Mysql_脚本之家  
https://www.jb51.net/article/73187.htm

``` sql
insert into dailybill_dailybill(id,
                                date,
                                breakfast,
                                lunch    ,
                                dinner   ,
                                fruit    ,
                                drink    ,
                                snack    ,
                                wash     ,
                                phone    ,
                                text )
    select  td.id,
            td.date,
            td.breakfast,
            td.lunch   ,
            td.dinner  ,
            td.fruit   ,
            td.drink   ,
            td.snack   ,
            td.wash    ,
            td.phone   ,
            "l"
    from tb_daily as td where td.id < 1080;
```

查找包含switch的数据
``` sql
SELECT * FROM `my_bill`.`consumebill_consumebill` where goods like "%switch%";
```


按日期排序
``` sql
SELECT * FROM `my_bill`.`consumebill_consumebill` ORDER BY date;
```
降序
``` sql
SELECT * FROM `my_bill`.`consumebill_consumebill` ORDER BY date DESC;
```