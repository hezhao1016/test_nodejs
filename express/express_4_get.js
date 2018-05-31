// GET 方法
// 以下实例演示了在表单中通过 GET 方法提交两个参数，我们可以使用 server.js 文件内的 process_get 路由器来处理输入

const express = require('express');
const path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));

// 返回HTML页面
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/html', "express_get.html"));
});

app.get('/process_get', function (req, res) {
    // 输出JSON格式
    var response = {
        "first_name":req.query.first_name, // GET传过来的数据
        "last_name":req.query.last_name
    };
    console.log(response);
    res.send(JSON.stringify(response));
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试
// http://127.0.0.1:8081/index
// http://127.0.0.1:8081/html/express_get.html