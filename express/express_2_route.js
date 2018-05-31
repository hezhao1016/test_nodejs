// 路由

const express = require('express');
var app = express();
let router = express.Router();

// 可以实现类似过滤器的功能，类似于Java Filter
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

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

//  list_user 页面 ，可响应GET/POST 请求
app.all('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
router.get('/ab*cd', function (req, res) {
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
});

// 路由
app.use('/re', router);

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试
// http://127.0.0.1:8081
// http://127.0.0.1:8081/list_user
// http://127.0.0.1:8081/re/abcd
// http://127.0.0.1:8081/re/ab11cd
// http://127.0.0.1:8081/re/abcdefg