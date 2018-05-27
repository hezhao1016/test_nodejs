// Node.Js http模块发送http请求

const http = require('http');
const querystring = require('querystring');

//GET 请求
http.get('http://sandbox.runjs.cn/show/ydp3it7b/', function (res) {
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

// 使用详细配置，发送Get或Post请求
// 发送Post实例：注http请求头使用headers指定
/*var postData = querystring.stringify({
    msg:'中文内容'
});
var options = {
    hostname:'www.gongjuji.net',
    port:80,
    path:'/',
    method:'POST',
    headers:{
        //'Content-Type':'application/x-www-form-urlencoded',
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length':Buffer.byteLength(postData)
    }
};
var req = http.request(options, function(res) {
    console.log('状态码: '+res.statusCode);
    console.log('请求头: '+JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data',function(chun){
        console.log('body分隔线---------------------------------\r\n');
        console.info(chun);
    });
    res.on('end',function(){
        console.log('No more data in response.********');
    });
});
req.on('error',function(err){
    console.error(err);
});
req.write(postData);
req.end();*/

// request() 发送Get请求实例
/*var data = {
    age:13,
    time:new Date().getTime()
};
var content = querystring.stringify(data);
var options={
    hostname:'www.gongjuji.net',
    port:80,
    path:'/',
    method:'GET'
};
//创建请求
var req=http.request(options,function(res){
    console.log('状态码: '+res.statusCode);
    console.log('请求头: '+JSON.stringify(res.headers));
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
        console.log('数据片段分隔-----------------------\r\n');
        console.log(chunk);
    });
    res.on('end',function(){
        console.log('响应结束********');
    });
});
req.on('error',function(err){
    console.error(err);
});
req.end();*/