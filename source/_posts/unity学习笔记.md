---
title: unity学习笔记
date: 2019-11-01 19:18:29
tags:
---

终于可以拿出刘洋学长的键盘敲代码了！！！哈哈哈哈2333333


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





