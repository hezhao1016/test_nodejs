// 第一个 Express 框架实例

const express = require('express');
var app = express();

//  主页输出 "Hello World"
app.get('/', function (req, res) {
    res.send("Hello World!");
});

// 监听8081端口
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试：http://127.0.0.1:8081