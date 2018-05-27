// Node.js Web 模块

// Web 应用架构
// Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
// Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
// Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
// Data - 数据层，一般由数据库组成。

// 使用 Node 创建 Web 文件服务器
// Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块

// 基本的 HTTP 服务器架构(使用 8080 端口)
const
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve(process.argv[2] || '.');
console.log('Static root dir: ' + root);

// 创建服务器
http.createServer(function (request, response) {
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filepath = path.join(root, pathname);
    // 获取文件状态:
    fs.stat(filepath, function (err, stats) {
        if (!err && stats.isFile()) {
            // 没有出错并且文件存在:
            console.log('200 ' + request.url);
            // 发送200响应:
            response.writeHead(200);
            // 将文件流导向response:
            fs.createReadStream(filepath).pipe(response);
        } else {
            // 出错了或者文件不存在:
            console.log('404 ' + request.url);
            // 发送404响应:
            response.writeHead(404);
            response.end('404 Not Found');
        }
    });
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
//测试：http://127.0.0.1:8080/index.html

