// 路由

const express = require('express');
var app = express();

// GET 请求
app.get('/', function (req, res) {
    console.log("主页 GET 请求");
    res.send("Hello GET!");
});

// POST 请求
app.post('/', function (req, res) {
    console.log("主页 POST 请求");
    res.send('Hello POST');
});

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function (req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试
// http://127.0.0.1:8081
// http://127.0.0.1:8081/list_user
// http://127.0.0.1:8081/abcd
// http://127.0.0.1:8081/ab11cd
// http://127.0.0.1:8081/abcdefg