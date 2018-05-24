// Cookie 管理
// 我们可以使用中间件向 Node.js 服务器发送 cookie 信息，以下代码输出了客户端发送的 cookie 信息

const express = require('express');
const cookieParser = require('cookie-parser');
const util = require('util');

var app = express();

// 设置cookie模块
app.use(cookieParser());

app.get('/addCookie', function (req, res) {
    // 使用response设置cookie，expires 表示过期时间
    res.cookie("name","Horace",{ expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send("cookie 添加成功。");
});

app.get('/', function (req, res) {
    // cookie 数组
    console.log("Cookies: " + util.inspect(req.cookies));
    // 通过req.cooikes.name 或 req.cookies['name'] 可以取得客户端发来的cookie
    console.log("Cookie name: " + util.inspect(req.cookies.name));
    res.send(util.inspect(req.cookies));
});

app.listen(8081);
console.log("Server running at http://127.0.0.1:8081/");

// 测试
// http://127.0.0.1:8081/