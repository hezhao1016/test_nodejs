// GET/POST请求

const http = require('http');
const url = require('url');
const util = require('util');
const querystring = require('querystring');

// 获取GET请求内容
http.createServer(function (request,response) {
    response.writeHead(200, {"Content-Type":"text/plain;charset=utf8"});
    response.end(util.inspect(url.parse(request.url, true)));
}).listen(3000);
console.log("Server has started on http://localhost:3000.");

// 使用 url.parse 方法来解析 URL 中的参数
http.createServer(function(request, response){
    response.writeHead(200, {'Content-Type': 'text/plain;charset=utf8'});

    // 解析 url 参数
    var params = url.parse(request.url, true).query;
    response.write("网站名：" + params.name);
    response.write("\n");
    response.write("网站 URL：" + params.url);
    response.end();

}).listen(4000);
console.log("Server has started on http://localhost:4000.");
//测试：http://localhost:4000/user?name=菜鸟教程&url=www.runoob.com


// 获取 POST 请求内容
// POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
// 比如上传文件，而很多时候我们可能并不需要理会请求体的内容，恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，当你需要的时候，需要手动来做。
var postHTML =
    '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
    '<body>' +
    '<form method="post">' +
    '网站名： <input name="name"><br>' +
    '网站 URL： <input name="url"><br>' +
    '<input type="submit">' +
    '</form>' +
    '</body></html>';

http.createServer(function (request, response) {
    // 定义了一个body变量，用于暂存请求体的信息
    var body = "";

    // 通过request的data事件监听函数，每当接受到请求体的数据，就累加到body变量中
    request.on('data', function (chunk) {
        body += chunk;
    });

    // 在end事件触发后，通过querystring.parse将body解析为真正的POST请求格式，然后向客户端返回。
    request.on('end', function () {
        // 解析参数
        body = querystring.parse(body);
        // 设置响应头部信息及编码
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});

        if(body.name && body.url) { // 输出提交的数据
            response.write("网站名：" + body.name);
            response.write("<br>");
            response.write("网站 URL：" + body.url);
        } else {  // 输出表单
            response.write(postHTML);
        }
        response.end();
    });
}).listen(5000);
console.log("Server has started on http://localhost:5000.");
