# Thinking in Systems with JavaScript [原文](https://dev.to/ecarriou/thinking-in-systems-with-javascript-3kd4)
# 用JavaScript进行系统思考

Everytime I have to fix a bug, I follow the same workflow: when someone at the QA team found a bug, she/he send me a bug report with the steps to reproduce (STR) the issue. And if I do not understand the STR, I generally come to see her/him so that she/he can show me the bug on her/his computer.

每次我需要修复一个bug，我都遵循相同的工作流程：当QA团队中的某个人发现了一个bug，她/他就会给我发送一个bug报告，其中包含了重现问题的步骤。如果我不懂STR，我通常会去找她/他，这样她/他就可以在她/他的电脑上给我看bug。

This workflow seems quite common in many companies and I often say to myself that it must have a better way to get the context of an application before a bug happened.

这种工作流在许多公司中似乎相当常见，我经常对自己说，在bug发生之前，它必须有更好的方法来获取应用程序的上下文。

## Dynamic Bundling
## 动态绑定

But what could be this better way? Ideally it could be great to make a snapshot of the application before the bug occured so that we could fix the issue from that state.

但这更好的方法是什么呢？理想情况下，在错误发生之前创建应用程序的快照是很好的，这样我们就可以从该状态修复问题。

For example let’s say that we have an application in the state we want and that we can save that application into a format that can be then loaded to restore that state. For sure the resolution of the fix would be faster and easier.

例如，假设有一个应用程序处于我们想要的状态，并且我们可以将该应用程序保存为一种格式，然后可以加载该格式来恢复该状态。将更快，更容易的确定解决方法。

In fact, the new worflow could be something like that:

事实上，新的数据流可能是这样的：
[视频地址](https://www.youtube.com/embed/EuU10hbW-Vo)

In this example we have a todo app (the basic TodoMVC app) in a specific context (with one task). We export the context of the application in a bundle (a stringified JSON object), open a new blank page and then install that bundle. Then we see our application running on the new page with the correct context. So we can start using the application from that context.

在本例中，我们有一个todo应用程序（基本的TodoMVC应用程序）在一个特定的上下文中（使用一个任务）。我们将应用程序的上下文导出到一个bundle中（一个字符串化的JSON对象），打开一个新的空白页面，然后安装这个bundle。然后我们看到我们的应用程序在新页面上运行，并且有正确的上下文。所以我们可以从这个上下文开始使用这个应用程序。

It means that, as a developper, I will have only to load a JSON that someone at the QA team send me to get the context of the application and fix that bug. Much simpler, does it?

这意味着，作为一个开发人员，我只需加载一个JSON，QA团队中的某个人就会指派给我去获取应用程序的上下文并修复这个错误。简单得多，不是吗？

## How does it work?
## 它是如何工作的？

In the video, we can export the state of this application and restore it at runtime because:
* the application was designed as a system and the application objects (components, methods, models) are stored at runtime in a tiny NoSQL Database.

在视频中，我们可以导出这个应用程序的状态并在运行时恢复它，因为：
* 应用程序被设计为一个系统，应用程序对象（组件、方法、模型）存储在一个很小的NoSQL数据库中。

## Your application is a system
## 你的应用程序是一个系统

When we create an application, we create in fact a system. A system is defined by a **model**, is composed by **components** and reacts to events with **behaviors**. As you see, these concepts are quite common with the applications we create every day.

当我们创建一个应用程序时，我们实际上创建了一个系统。系统由一个**模型**定义，由**组件**组成，并对带有**行为**的事件作出反应。正如你所看到的，这些概念在我们每天创建的应用程序中是相当常见的。

![xiaohuoni](\img\3ozjnukg8ybalm0355b7.png)

So what differ a system from an application ? With systems we focus first on the design before focusing on the code. How to do that ?
* First design the model of your system
* then find all the components that you will need to start your system 
* then create these components and implement its behaviors (with methods).

那么一个系统和一个应用程序有什么不同呢？对于系统，我们首先关注设计，然后才关注代码。怎么做呢？
* 首先设计你的系统模型
* 然后找到启动系统所需的所有组件
* 然后创建这些组件并实现其行为（使用方法）。

You need to make a complete disctinction between the design and the runtime of your system. Design must always be declarative and execution imperative. How to do that? Use UML to define your model and integrate it into your development workflow.

您需要在系统的设计和运行时之间进行完全的区分。设计必须始终是声明性的和执行命令性的。怎么做呢？使用[UML](https://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E5%BB%BA%E6%A8%A1%E8%AF%AD%E8%A8%80/3160571?fr=aladdin&fromid=446747&fromtitle=UML)定义您的模型并将其集成到您的开发工作流中。

## Everything is a document
## 一切都是文档

Once we have the system ready to be executed, we need to store it in a NoSQL Database. It is possible because **everything you have created can be managed as a document.** 

一旦系统准备好执行，我们需要将其存储在NoSQL数据库中。这是可能的，因为**你所创建的所有内容都可以作为文档来管理。**

Let’s say we want to store an object in a database, we need to serialize it in JSON, but if we only store its state this process will be easier.

假设我们想在数据库中存储一个对象，我们需要在JSON中序列化它，但是如果我们只存储它的状态，那么这个过程会更简单。

And it is what is done in the video. Models and behaviors are also serialized so that **the entire system is stored in a database**.

这就是在视频中所做的。模型和行为也被序列化，**以便整个系统存储在数据库中**。

And what about runtime? What if we update an object in the current application? 

那么运行时呢？如果我们在当前应用程序中更新一个对象怎么办？

Because all objects states are stored in a database, we have a complete **ODM** (Object-Document Mapper). It means that an update to an object of the system will **automatically update its state on the database**.

因为所有对象状态都存储在数据库中，所以我们有一个完整的**ODM**（Object-Document Mapper对象-文档映射器）。这意味着对系统对象的更新将**自动更新其在数据库中的状态**。

So now exporting the current state of the system is like making a dump of the database. And restoring the state of the system is like importing the dump into the database. Quite simple, isn’t it?

因此，现在导出系统的当前状态就像对数据库进行转储。恢复系统的状态就像将转储导入数据库。很简单，不是吗？

## Want to learn more?
## 想了解更多吗？

I will develop the concepts and patterns I talked about in a forthcoming post but if you want to create some systems right now you can:
* install [System Runtime](https://designfirst.io/systemruntime/), a JavaScript library to create and manage systems and
* read the book Thinking in Systems from Donella H. Meadows. A great introduction to the world of systems.

我将在下一篇文章中阐述我所谈到的概念和模式，但是如果您现在想创建一些系统可以：
* 安装[System Runtime](https://designfirst.io/systemruntime/)，这是一个创建和管理系统的JavaScript库。
* 阅读Donella H.Meadows的《Thinking in Systems系统之美》一书。一个系统世界的伟大介绍。

[原文地址:https://dev.to/ecarriou/thinking-in-systems-with-javascript-3kd4](https://dev.to/ecarriou/thinking-in-systems-with-javascript-3kd4)

[原作者:Erwan Carriou](http://github.com/ecarriou)

[翻译:小虎Oni](https://github.com/xiaohuoni)

附上Thinking in Systems pdf下载地址
链接：https://pan.baidu.com/s/1kWHi5fT 密码：gok5