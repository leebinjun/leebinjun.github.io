---
title: 门禁python多进程练习
date: 2019-05-16 20:33:16
tags:
  - python
---


``` bash
import multiprocessing as mp

def task(a):
    pass

if __name__ == "__main__":
    p1 = mp.Process(target=task, args=(1,))
    p1.start()
    p1.join()
```












* [译]深度神经网络的多任务学习概览(An Overview of Multi-task Learning in Deep Neural Networks) - Shuzi_rank - 博客园 </br>https://www.cnblogs.com/shuzirank/p/7141017.html