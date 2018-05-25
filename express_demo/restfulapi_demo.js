// RESTful API
//
// REST即表述性状态传递（英文：Representational State Transfer，简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的一种软件架构风格。
// 表述性状态转移是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是RESTful。需要注意的是，REST是设计风格而不是标准。
// REST通常基于使用HTTP，URI，和XML（标准通用标记语言下的一个子集）以及HTML（标准通用标记语言下的一个应用）这些现有的广泛流行的协议和标准。REST 通常使用 JSON 数据格式。
// HTTP 方法
// 以下为 REST 基本架构的四个方法：
// - GET - 用于获取数据。
// - PUT - 用于更新或添加数据。
// - DELETE - 用于删除数据。
// - POST - 用于添加数据。
//
// RESTful Web Services
// Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML（标准通用标记语言下的一个子集）标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。
// 基于 REST 架构的 Web Services 即是 RESTful。
// 由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。可以使用各种语言（比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript[包括 Ajax]）实现客户端。
// RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问。但是，这种服务的简便性让用户能够与之直接交互，使用它们的 Web 浏览器构建一个 GET URL 并读取返回的内容。

const express = require('express');
const fs = require('fs');
var app = express();

// 获取用户列表
app.get('/listUsers', function (req, res) {
   fs.readFile(__dirname + '/../files/users.json', 'utf8', function (err, data) {
      console.log(data);
      res.end(data);
   });
});

// 添加用户
app.get('/addUser', function (req, res) {
   var user = {
       "user4" : {
           "name" : "赵六",
           "password" : "password4",
           "profession" : "teacher",
           "id": 4
       }
   };

    // 读取已存在的数据
    fs.readFile(__dirname + '/../files/users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data['user4'] = user.user4;
        console.log(data);
        res.end(JSON.stringify(data));
    });
});

// 显示用户详情
app.get('/:id', function (req, res) {
    // 读取已存在的用户列表
    fs.readFile(__dirname + '/../files/users.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        // 根据匹配的Id查找用户
        var user = data['user' + req.params.id];
        console.log(user);
        res.end(JSON.stringify(user));
    });
});

// 删除用户
app.get('/deleteUser/:id', function (req, res) {
   fs.readFile(__dirname + '/../files/users.json', 'utf8', function (err, data) {
       data = JSON.parse(data);
       // 删除
       delete data['user' + req.params.id];

       console.log(data);
       res.end(JSON.stringify(data));
   });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试
// http://127.0.0.1:8081/listUsers
// http://127.0.0.1:8081/addUser
// http://127.0.0.1:8081/1
// http://127.0.0.1:8081/deleteUser/1