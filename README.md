# 重写Taro UI的Calendar 日历组件（参数事件不变），扩展农历、节气、假期、放假调休、自定义样式等

一、重写原因？

Taro UI的Calendar 日历组件功能及页面可扩展性不强，不能满足业务需求。比如UI过于简单，确实农历节气等。

二、扩展

1、自定义样式

- 对Taro UI的Calendar 日历组件魔改使其成为普通的组件，代码包已经处理好，直接下载当作普通组件即可。


2、扩展农历、节气、假期、放假调休时间等

- 因为Taro UI Calendar组件并未提供农历、节气、假期、放假调休时间等数据，我在这里引入'lunar-javascript'插件提供缺少的数据，在使用组件时记得引入该插件。


三、效果体验
![img](https://oss.gdyunyin.net/20210910/6666.jpg)
![img](https://oss.gdyunyin.net/20210823/666.jpg)
