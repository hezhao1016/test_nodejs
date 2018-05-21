// Node.js EventEmitter
// Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。
// Node.js里面的许多对象都会分发事件：一个net.Server对象会在每次有新连接时分发一个事件， 一个fs.readStream对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 events.EventEmitter 的实例。
//
// EventEmitter 类
// events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。
// 你可以通过require("events");来访问该模块。

// EventEmitter 对象如果在实例化时发生错误，会触发 error 事件。当添加新的监听器时，newListener 事件会触发，当监听器被移除时，removeListener 事件被触发。
// 下面我们用一个简单的例子说明 EventEmitter 的用法：

// 创建 eventEmitter 对象
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on("some_event", function (){
    console.log("some_event 事件触发");
});
setTimeout(function(){
    event.emit("some_event");
},1000);


// EventEmitter 的每个事件由一个事件名和若干个参数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。
// 当事件触发时，注册到这个事件的事件监听器被依次调用，事件参数作为回调函数参数传递。