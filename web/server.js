// Node.js Web 模块

// Web 应用架构
// Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
// Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
// Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
// Data - 数据层，一般由数据库组成。

// 使用 Node 创建 Web 服务器
// Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块

// 基本的 HTTP 服务器架构(使用 8080 端口)
const http = require('http');
const fs = require('fs');
const url = require('url');

// 创建服务器
http.createServer(function (request, response) {
    // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;

    // 输出请求的文件名
   console.log("Request for " + pathname + " received.");

    // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
       if(err){
           console.error(err.stack);

           // HTTP 状态码: 404 : NOT FOUND
           // Content Type: text/plain
           response.writeHead(404, {'Content-Type': 'text/html'});
       }else{
           // HTTP 状态码: 200 : OK
           // Content Type: text/plain
           response.writeHead(200, {'Content-Type': 'text/html'});

           // 响应文件内容
           response.write(data.toString());
       }
       // 发送响应数据
       response.end();
   });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
//测试：http://127.0.0.1:8080/index.html

