/**
 * Node.js 创建第一个应用
 */

'use strict'; // 使用严格模式

// 使用 require 指令来引入 http 模块
const http = require("http");

// 创建服务器，绑定 8888 端口
http.createServer(function (request, response) {
    // 发送 HTTP 头部，HTTP 状态值: 200 : OK，内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 发送响应数据 "Hello World"
    response.write("Hello World\n");
    // 一定要加，标记结束
    response.end();
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');