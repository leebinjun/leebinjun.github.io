---
title: 'C#学习笔记'
date: 2019-11-07 16:30:22
tags:
---

* C#教程：C#入门经典教程，值得收藏  

http://c.biancheng.net/csharp/

<!-- more -->
<The rest of contents | 余下全文>

## C#语言特性

* C# 语言是一种安全的、稳定的、简单的、面向对象的编程语言， 它不仅去掉了 C++ 和 Java 语言中的一些复杂特性，还提供了可视化工具，能够高效地编写程序。

* 简单、安全  

在 C# 语言中已经不再使用指针，而且不允许直接读取内存等不安全的操作。
它比 C、C++、Java 提供了更多的数据类型，并且每个数据类型都是固定大小的。
此外还提供了命名空间来管理 C# 文件，命名空间 相当于一个文件夹，在创建程序时，允许在一个命名空间中创建一个或多个类，方便调用和重用。

* 面向对象  

与其他面向对象语言一样，C# 语言也具有面向对象语言的基本特征，即封装、继承、多态。

* 支持跨平台  

C# 6.0 版本已经能在多个操作系统上使用，例如在 Mac、Linux 等。此外，还能将其应用到手机、PDA 等设备上。

* 开发多种类型的程序  

使用 C# 语言不仅能开发在控制台下运行的应用程序，也能开发 Windows 窗体应用程序、网站、手机应用等多种应用程序，并且其提供的 Visual Studio 2015 开发工具中也支持多种类型的程序，让开发人员能快速地构建 C# 应用程序。

## C#类和对象

类定义的具体语法形式

``` txt
类的访问修饰符    修饰符    类名
{
    类的成员
}
```

其中：

* 类的访问修饰符：用于设定对类的访问限制，包括 public、internal 或者不写，用 internal 或者不写时代表只能在当前项目中访问类；public 则代表可以在任何项目中访问类。
* 修饰符：修饰符是对类本身特点的描述，包括 abstract、sealed 和 static。abstract 是抽象的意思，使用它修饰符的类不能被实例化；sealed 修饰的类是密封类，不能 被继承；static 修饰的类是静态类，不能被实例化。
* 类名：类名用于描述类的功能，因此在定义类名时最好是具有实际意义，这样方便用户理解类中描述的内容。在同一个命名空间下类名必须是唯一的。
* 类的成员：在类中能定义的元素，主要包括字段、属性、方法。

### C#访问修饰符、修饰符

类的访问修饰符主要有 2 个，即 internal 和 public, 如果省略了访问修饰符，即为 internal。

类中成员的访问修饰符有 4 个，具体用法如下。

* public  

成员可以被任何代码访问。

* private  

成员仅能被同一个类中的代码访问，如果在类成员前未使用任何访问修饰 符，则默认为private。

* internal  

成员仅能被同一个项目中的代码访问。

* protected  

成员只能由类或派生类中的代码访问。

在修饰字段时通常用两个修饰符，即readonly （只读）和static （静态的）。

* 使用 readonly 修饰字段意味着只能读取该字段的值而不能给字段赋值。
* 使用 static 修饰的字段是静态字段，可以直接通过类名访问该字段。  

需要注意的是常量不能使用 static 修饰符修饰。

定义字段的语法形式

``` txt
访问修饰符    修饰符    数据类型    字段名；
```

``` c#
namespace code_1
{

    class Test
    {
        private int id;                         //定义私有的整型字段 id
        public readonly string name;            //定义公有的只读字符串类型字段 name
        internal static int age;                //定义内部的静态的整型字段 age
        private const string major = "计算机";  //定义私有的字符串类型常量 major

    }

}

``` 

定义方法的语法形式如下。
访问修饰符    修饰符    返回值类型    方法名(参数列表)
{
    语句块;
}
其中：
1) 访问修饰符

所有类成员访问修饰符都可以使用，如果省略访问修饰符，默认是 private。
2) 修饰符

在定义方法时修饰符包括 virtual（虚拟的）、abstract（抽象的）、override（重写的）、static（静态的）、sealed（密封的）。override 是在类之间继承时使用的。
3) 返回值类型

用于在调用方法后得到返回结果，返回值可以是任意的数据类型，如果指定了返回值类型，必须使用 return 关键字返回一个与之类型匹配的值。如果没有指定返回值类型，必须使用 void 关键字表示没有返回值。
4) 方法名

对方法所实现功能的描述。方法名的命名是以 Pascal 命名法为规范的。
5)参数列表

在方法中允许有 0 到多个参数，如果没有指定参数也要保留参数列表的小括号。参数的定义形式是“数据类型参数名”，如果使用多个参数，多个参数之间需要用逗号隔开。

属性经常与字段连用，并提供了 get 访问器和 set 访问器，分别用于获取或设置字段的值。

get 访问器和 set 访问器的使用与方法非常类似，可以在操作字段时根据一些规则和条件来设置或获取字段的值。

此外，为了保证字段的安全性，还能选择省去 get 访问器或 set 访问器。

定义属性的语法形式如下。
public    数据类型    属性名
{
    get
    {
        获取属性的语句块;
        return 值;
    }
    set
    {
        设置属性得到语句块;
    }
}
其中：
1) get{}

get 访问器，用于获取属性的值，需要在 get 语句最后使用 return 关键字返回一个与属性数据类型相兼容的值。

若在属性定义中省略了该访问器，则不能在其他类中获取私有类型的字段值，因此也称为只写属性。
2) set{}

set 访问器用于设置字段的值，这里需要使用一个特殊的值 value，它就是给字段赋的值。

在 set 访问器省略后无法在其他类中给字段赋值，因此也称为只读属性。

通常属性名的命名使用的是 Pascal 命名法，单词的首字母大写，如果是由多个单词构成，每个单词的首字母大写。

由于属性都是针对某个字段赋值的，因此属性的名称通常是将字段中每个单词的首字母大写。例如定义了一个名为 name 的字段，属性名则为 Name。

C#构造函数（构造方法）

构造方法的定义语法形式如下。
访问修饰符  类名 (参数列表)
{
    语句块；
}
这里构造方法的访问修饰符通常是public类型的，这样在其他类中都可以创建该类的对象。

如果将访问修饰符设置成private类型的，则无法创建该类的对象。构造方法中的参数与其他方法一样，都是 0 到多个参数。

此外，构造方法是在创建类的对象时被调用的。通常会将一些对类中成员初始化的操作放到构造方法中去完成。

C#析构函数（方法）

析构方法的定义语法形式如下。
~类名()
{
    语句块；
}
在析构方法中不带任何参数，它实际上是保证在程序中会调用垃圾回收方法 Finalize()。

C#方法重载（函数重载）

在调用重载的方法时系统是根据所传 递参数的不同判断调用的是哪个方法。

C#方法的参数（实参和形参）

方法中的参数分为实际参数和形式参数，实际参数被称为实参，是在调用方法时传递的参数；形式参数被称为形参，是在方法定义中所写的参数。

在 C# 语言中，方法中的参数除了定义数据类型外，还可以定义引用参数和输出参数。引用参数使用 ref 关键字定义，输出参数使用 out 关键字定义。

引用参数在方法中使用时必须为其值，并且必须是由变量赋予的值，不能是常量或表达式。

如果需要将方法中的每一个参数都设置为 ref 类型参数，则需要在每一个参数前面加上 ref 关键字修饰。

``` c#
class RefClass
{
    public bool Judge(ref int num)
    {
        if (num % 5 == 0)
        {
            return true;
        }
        return false;
    }
}

class Program
{
    static void Main(string[] args)
    {
        RefClass refClass = new RefClass();
        int a = 10;
        bool result = refCalss.Judge(ref a);
        Console.WriteLine("result is " + result);
    }
}
```

引用参数与我们平时使用的参数有些类似，但输出参数不同，输出参数相当于返回值, 即在方法调用完成后可以将返回的结果存放到输出参数中。

输出参数多用于一个方法需要返回多个值的情况。需要注意的是，在使用输出参数时，必须在方法调用完成前为输出参数赋值。

``` c#
class RefClass
{

    public bool Judge(int num, out bool result)
    {
        if (num % 5 == 0)
        {
            result =  true;
        }
        result =  false;

    }

}

class Program
{

    static void Main(string[] args)
    {
        RefClass refClass = new RefClass();
        bool rst;
        refCalss.Judge(10, out rst);
        Console.WriteLine("result is " + rst);

    }

}

``` 

## unity学习笔记

### 下载

https://unity3d.com/cn/get-unity/download

* Unity Hub  

是一个用于管理Unity项目、简化下载、查找、卸载以及安装管理多个Unity版本的工具。

#### 问题记录：sentinel key not found (h0007) Unity

1.删除文件 C:\ProgramData\SafeNet Sentinel
2.在Unity.exe的Editor目录下打开命令行工具cmd，输入

``` shell
hasp_update.exe u unity-sl.v2c
```

### test

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
            cross. GetComent<Tranform>().position.x, 
            cross. GetComent<Tranform>().position.y, 
            cross. GetComent<Tranform>().position.z + 0.1f); 
        
        cross. GetComent<Tranform>().position = i; 

    }

}

```
