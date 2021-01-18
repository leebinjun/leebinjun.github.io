---
title: unity学习笔记
date: 2019-11-01 19:18:29
tags:
---

## 下载

https://unity3d.com/cn/get-unity/download

<!-- more -->
<The rest of contents | 余下全文>

* Unity Hub  
是一个用于管理Unity项目、简化下载、查找、卸载以及安装管理多个Unity版本的工具。

### 问题记录：sentinel key not found (h0007) Unity
1.删除文件 C:\ProgramData\SafeNet Sentinel
2.在Unity.exe的Editor目录下打开命令行工具cmd，输入
``` shell
hasp_update.exe u unity-sl.v2c
```



## test

``` c#
public class TestCross : MonoBehaviour
{
    public Gameobject cross;

    void Start()
    {

    }


    void Update()
    {
        // Vector3 i = new Vector3(1.0f, 1.0f, 1.0f);
        Vector3 i = new Vector3(
            cross.GetComent<Tranform>().position.x,
            cross.GetComent<Tranform>().position.y,
            cross.GetComent<Tranform>().position.z + 0.1f);
        
        cross.GetComent<Tranform>().position = i;
    }
}

```





