/*
创建WebSocket并且给服务器发消息的方式
1.在浏览器中写JavaScript代码。
    // 打开一个WebSocket:
    var ws = new WebSocket('ws://localhost:3000/test');

    ws.onopen = function(evt) {
        console.log("Connection open ...");
        // 给服务器发送一个字符串
        ws.send("Hello WebSockets!");
    };

    // 响应onmessage事件
    ws.onmessage = function(evt) {
        console.log( "Received Message: " + evt.data);
        ws.close();
    };

    ws.onclose = function(evt) {
        console.log("Connection closed.");
    };

2.在Node环境下，ws模块提供的WebSocket可用来充当客户端
ws的WebSocket就表示客户端，它其实就是WebSocketServer响应connection事件时回调函数传入的变量ws的类型。
*/

const WebSocket = require('ws');

let ws = new WebSocket('ws://localhost:3000/test');

// 打开WebSocket连接后立刻发送一条消息:
ws.on('open', function () {
    console.log(`[CLIENT] open()`);
    ws.send('Hello WebSockets!');
});

// 响应收到的消息:
ws.on('message', function (message) {
    console.log(`[CLIENT] Received: ${message}`);
});