// Node.Js https模块

const https = require('https');
const fs = require('fs');
const querystring = require('querystring');
const util = require('util');
const url = require('url');

// 创建https服务器, 需要证书
/*
var options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};
// 或者
var options = {
    pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
    passphrase: 'sample'
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
}).listen(8000);
*/


// https GET 请求
/*
https.get('https://www.jianshu.com', function (res) {
   console.log('状态码：', res.statusCode);
   console.log('请求头：', res.headers);

   var html = "";
    res.on('data', function (data) {
       html += data;
   });

    res.on('end', function () {
       console.log(html);
   });
}).on("error", function (err) {
    console.error(err);
});
*/

// https POST 请求
var regUrl = "https://ssl.mail.163.com/regall/unireg/call.do;jsessionid=%s?cmd=register.start&adapter=%s&reforward=common/reform&targetCmd=register.ctrlTop";
var cookie = 'a=b;c=d;', mail = 'regUsername', pass = 'password', vcode='abcde';
var _regUrl = util.format(regUrl, 'id123455', 'param2');
var post_option = url.parse(_regUrl);
var post_data = querystring.stringify({
    'name' : mail,
    'uid' : mail+'@163.com',
    'confirmPassword' : pass,
    'password' : pass,
    'vcode' : vcode,
    'flow' : 'main',
    'from' : '163mail_right',
    'mobile' : '',
});
post_option.headers = {
    'Content-Type' : 'application/x-www-form-urlencoded',
    'Content-Length' : post_data.length,
    Cookie : cookie,
    port: 443,
    method: 'POST'
};
var post_req = https.request(post_option, function(res){
    console.log('状态码：', res.statusCode);
    console.log('请求头：', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});
post_req.on('error',function(err){
    console.error(err);
});
post_req.write(post_data);
post_req.end();


// request() 发送Get请求实例
/*const options = {
    hostname: 'www.jianshu.com',
    port: 443,
    path: '/',
    method: 'GET'
};

const req = https.request(options, (res) => {
    console.log('状态码：', res.statusCode);
    console.log('请求头：', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (e) => {
    console.error(e);
});
req.end();*/