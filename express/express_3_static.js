// 静态文件

const express = require('express');
var app = express();

// 使用 express.static 中间件来设置静态文件路径
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.send("Hello World!");
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试
// http://127.0.0.1:8081/a.txt
// http://127.0.0.1:8081/images/a.jpg