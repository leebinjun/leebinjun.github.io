---
title: 空间博弈与matplotlib绘制gif动图
date: 2019-11-11 20:57:06
toc: true
tags:
  - 数模
---

<img src="数模：空间博弈与matplotlib绘制gif动图\03.gif">

```python
# 独立窗口显示
%matplotlib qt5 
# %matplotlib inline # 取消matplotlib的独立窗口显示
```
<!-- more -->
<The rest of contents | 余下全文>

## Python实现元胞自动机
* 详解Python 实现元胞自动机中的生命游戏(Game of life)_python_脚本之家  
https://www.jb51.net/article/133807.htm

问题重述
* 个体位于L*L网络上，网络无周期边界。  
* 每个格子一个个体，有0或1两种状态，0为死亡，1为存活。  
* 依据Moore邻居的状态决定个体下一时刻的状态：如果相邻方格活着的细胞数量过多，这个细胞会因为资源匮乏而在下一个时刻死去；相反，如果周围活细胞过少，这个细胞会因太孤单而死去。  
* 每个个体的状态更新是同步进行的。


```python
"""
元胞自动机 Python 实现
"""
import numpy as np
import matplotlib.pyplot as plt
 

class GameOfLife(object):
 
    def __init__(self, cells_shape):
        """
        Parameters
        ----------
        cells_shape : 一个元组，表示画布的大小。

        Examples
        --------
        建立一个高20，宽30的画布
        game = GameOfLife((20, 30))

        """

        # 矩阵的四周不参与运算
        self.cells = np.zeros(cells_shape)

        real_width = cells_shape[0] - 2
        real_height = cells_shape[1] - 2

        self.cells[1:-1, 1:-1] = np.random.randint(2, size=(real_width, real_height))
        self.timer = 0
        self.mask = np.ones(9)
        self.mask[4] = 0

    def update_state(self):
        """更新一次状态"""
        buf = np.zeros(self.cells.shape)
        cells = self.cells
        for i in range(1, cells.shape[0] - 1):
            for j in range(1, cells.shape[0] - 1):
                # 计算该细胞周围的存活细胞数
                neighbor = cells[i-1:i+2, j-1:j+2].reshape((-1, ))
                neighbor_num = np.convolve(self.mask, neighbor, 'valid')[0]
                if neighbor_num == 3:
                    buf[i, j] = 1
                elif neighbor_num == 2:
                    buf[i, j] = cells[i, j]
                else:
                    buf[i, j] = 0
        self.cells = buf
        self.timer += 1
   
    def plot_state(self):
        """画出当前的状态"""
        plt.title('Iter :{}'.format(self.timer))
        plt.imshow(self.cells)
        plt.show()
 
    def update_and_plot(self, n_iter):
        """更新状态并画图
        Parameters
        ----------
        n_iter : 更新的轮数
        """
        plt.ion()
        for _ in range(n_iter):
            plt.title('Iter :{}'.format(self.timer))
            plt.imshow(self.cells)
            self.update_state()
            plt.pause(0.2)
        plt.ioff()
           

if __name__ == '__main__':
    game = GameOfLife(cells_shape=(60, 60))
    game.update_and_plot(5)

```
<img src="数模：空间博弈与matplotlib绘制gif动图\01.png">

生命游戏中的图形
* Category:Animated images - LifeWiki  
https://www.conwaylife.com/wiki/Category:Animated_images


## 基于元胞自动机的空间博弈

问题重述
* 个体位于L*L网络上，网络无周期边界。  
* 每个格子一个个体，有0或1两种状态，0为背叛，1为合作。  
* 每一时刻，个体和其Moore邻居进行博弈，依据Nowak的单参数收益矩阵，得到每个个体的收益，下一时刻个体的策略以此为基础，即选择自身及邻居中收益值最高的那个个体的策略，作为该个体下一时刻的策略。
* 个体策略更新是同步进行的。

单参数收益矩阵( 1 < b < 2 )
|  | C | D |
| ------ | ------ | ------ |
| C | 1 | 0 |
| D | b | 0 |


```python
"""
基于元胞自动机的空间博弈演化
"""
import numpy as np
import matplotlib.pyplot as plt
 

class GameOfLife(object):
 
    def __init__(self, cells_shape):
        """
        Parameters
        ----------
        cells_shape : 一个元组，表示画布的大小。

        Examples
        --------
        建立一个高20，宽30的画布
        game = GameOfLife((20, 30))

        """

        # 矩阵的四周不参与运算
        self.cells_strategic = np.ones(cells_shape)
        self.cells_benefits = np.zeros(cells_shape)
        self.cells_statechange = np.zeros(cells_shape)
        
        self.state_change = {(1,1):0, (1,0):1, (0,0):2, (0,1):3} 

        real_width = cells_shape[0] - 2
        real_height = cells_shape[1] - 2

        # self.cells_strategic[1:-1, 1:-1] = np.random.randint(2, size=(real_width, real_height)) # 随机策略
        self.cells_strategic[int(real_width/2)+1, int(real_height/2)+1] = 0  # 1：合作  0：背叛
        
        self.B = 1.97 # 背叛诱惑
        self.timer = 0
   
    def update_state(self):
        """更新一次状态"""
        
        buf_b = np.zeros(self.cells_strategic.shape)
        buf_s = np.zeros(self.cells_strategic.shape)
        buf_c = np.zeros(self.cells_strategic.shape)

        cells = self.cells_strategic
        # 更新收益矩阵
        for i in range(1, cells.shape[0] - 1):
            for j in range(1, cells.shape[0] - 1):
                # 计算该细胞周围的合作者数量
                neighbor = cells[i-1:i+2, j-1:j+2]
                neighbor_num = np.sum(neighbor) # 邻居中合作者的数量
                # 计算该细胞收益
                if cells[i, j] == 1: # 计算合作者的收益
                    buf_b[i, j] = neighbor_num * 1.0
                else:
                    buf_b[i, j] = neighbor_num * self.B
        # print(buf_b)
        self.cells_benefits = buf_b
        
        # 更新状态矩阵和状态转移矩阵
        for i in range(1, cells.shape[0] - 1):
            for j in range(1, cells.shape[0] - 1):
                # 找到该细胞及其邻居收益最大值者的策略
                neighbor = self.cells_benefits[i-1:i+2, j-1:j+2]
                index = int(neighbor.argmax())
                # x, y= int(index / 3), index % 3
                (x, y) = np.unravel_index(neighbor.argmax(), neighbor.shape)
                buf_s[i, j] = cells[i-1+x, j-1+y]
                # 更新状态转移矩阵
                last_stratage, new_stratage = cells[i, j], buf_s[i, j] 
                buf_c[i, j] = self.state_change[(last_stratage, new_stratage)]
        # print(buf_s)
        self.cells_strategic = buf_s
        self.cells_statechange = buf_c
        self.timer += 1

    def plot_state(self):
        """画出当前的状态"""
        plt.title('Iter :{}'.format(self.timer))
        plt.imshow(self.cells_strategic)
        plt.show()

    def update_and_plot(self, n_iter):
        """更新状态并画图
        Parameters
        ----------
        n_iter : 更新的轮数
        """
        plt.ion()
        for _ in range(n_iter):
            plt.title('Iter :{}'.format(self.timer))
            # plt.imshow(self.cells_strategic)    # 策略
            plt.imshow(self.cells_statechange)  # 策略变化
            self.update_state()
            plt.pause(0.00001)
        plt.ioff()
           

if __name__ == '__main__':
    game = GameOfLife(cells_shape=(101, 101))
    game.update_and_plot(n_iter=50)
```

## matplotlab绘制动图及保存gif图片
* 如何通过 Matplotlib 绘制动画及保存 GIF 图片？ - frank 的专栏 - CSDN博客  
https://blog.csdn.net/briblue/article/details/84940997

FuncAnimation 的构造方法
``` python
def __init__(self, fig, func, frames=None, init_func=None, fargs=None,
                 save_count=None, **kwargs):
```
* **fig** 自然是 matplotlib 中的 figure 对象。  
* **func** 是每一次更新时所调用的方法,它是回调函数。因此，我们可以在这个方法中更新 figure 当中的 axes 中的 line2d 对象，它是动态更新 figure 的根本。  
* **frames** 代表了整个动画过程中帧的取值范围，而本质上是一个数据发生器。
* **init_func** 是初始函数，用来初始 figure 的画面。  
* **fargs** 是每次附加给 func 回调函数的参数，可以为 None  
* **save_count** 是缓存的数量  
除此之外，还有一些可选的参数，它们分别是  
* **interval** 是每 2 个 frame 发生的时间间隔,单位是 ms，默认值是 200.  
* **repeat_delay**  取值是数值，如果 animation 是重复播放的话，这个值就是每次播放之间的延迟时间，单位是 ms。  
* **repeat**  bool 型可选参数，默认为 True，代表动画是否会重复执行  
* **blit** bool 型可选参数，控制绘制的优化。默认是 False。  

保存
``` python
anim.save('cells_animation.gif',writer='imagemagick')
```


```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

fig, ax = plt.subplots()
xdata, ydata = [], []
ln, = plt.plot([], [], 'ro',animated=True)

def init():
    ax.set_xlim(-np.pi,np.pi)
    ax.set_ylim(-1, 1)
    return ln,

def update(frame):
    xdata.append(frame)
    ydata.append(np.sin(frame))
    ln.set_data(xdata, ydata)
    return ln,

def data_gen():
    frame = -np.pi
    step = 2 * np.pi / 90
    while frame < np.pi:
        frame += step
        yield frame

# anim = animation.FuncAnimation(fig, update, frames=np.linspace(-np.pi,np.pi, 360),interval=10,
#                     init_func=init,blit=True)
anim = animation.FuncAnimation(fig, update, frames=data_gen,interval=10,
                    init_func=init,blit=True)

plt.show()
```
<img src="数模：空间博弈与matplotlib绘制gif动图\02.gif">


```python
import matplotlib.pyplot as plt
import matplotlib.animation as animation

"""
基于元胞自动机的空间博弈演化
"""

game = GameOfLife(cells_shape=(101, 101))
data = game.cells_statechange        
fig, ax = plt.subplots()
ax = plt.imshow(data)

def init():
    return ax,

def update(data):
    game.update_state()
    data = game.cells_statechange
    ax = plt.imshow(data)
    return ax,

anim = animation.FuncAnimation(fig=fig, func=update, frames=10, init_func=init, interval=1, blit=True)

plt.show()

# 保存
anim.save('cells_animation.gif',writer='imagemagick')
```


<img src="数模：空间博弈与matplotlib绘制gif动图\03.gif">




