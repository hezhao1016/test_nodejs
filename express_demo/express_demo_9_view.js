// 在 Express 中使用模板引擎
// 安装jade模板引擎
// $ npm install jade --save

const express = require('express');
const path = require('path');
var app = express();

// 设置放模板文件的目录
app.set('views', path.join(__dirname, '../public/templates'));
// 设置模板引擎
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!'});
});

// 监听8081端口
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试：http://127.0.0.1:8081