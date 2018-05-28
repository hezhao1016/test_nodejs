// 文件上传
// 以下我们创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data。

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

var app = express();

// 临时路径
var tmp_path = __dirname + "/../public/tmp/"
fs.exists(tmp_path, function (exists) {
    if(!exists){
        fs.mkdir(tmp_path);
    }
});

// 静态文件
app.use(express.static(__dirname + '/../public'));
// 创建 application/x-www-form-urlencoded 编码解析
app.use(bodyParser.urlencoded({ extended:false }));
// 设置文件上传临时路径
app.use(multer({ dest: tmp_path }).array('image'));

// 返回HTML页面
app.get('/index', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html', "express_upload.html"));
});

// 上传
app.post('/file_upload', function (req, res) {
    // 上传的文件信息
    console.log(req.files[0]);

    // 保存路径
    var save_path = __dirname + "/../public/upload/";

    // 如果保存路径不存在就创建
    fs.exists(save_path, function (exists) {
        if(!exists){
            fs.mkdir(save_path);
        }
    });

    var des_file = save_path + req.files[0].originalname;

    // 读取文件信息
    fs.readFile(req.files[0].path, function (err, data) {
       if (err){
           console.error(err);
       }else{
           // 保存文件
           fs.writeFile(des_file, data, function (err) {
               if (err){
                   console.error(err);
               }else{
                   var response = {
                       message:'File uploaded successfully',
                       filename:req.files[0].originalname
                   };
               }
               // 发送数据
               console.log(response);
               res.send(JSON.stringify(response));
           });
       }
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为：http://%s:%s", host, port);
});

// 测试
// http://127.0.0.1:8081/index
// http://127.0.0.1:8081/html/express_upload.html