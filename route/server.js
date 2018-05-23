// Node.js 路由
// 我们要为路由提供请求的 URL 和其他需要的 GET 及 POST 参数，随后路由需要根据这些数据来执行相应的代码。
// 因此，我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。
// 我们需要的所有数据都会包含在 request 对象中，该对象作为 onRequest() 回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的 Node.JS 模块，它们分别是 url 和 querystring 模块。

// 现在我们来给 onRequest() 函数加上一些逻辑，用来找出浏览器请求的 URL 路径：
const http = require('http');
const url = require('url');

// 使用依赖注入的方式较松散地添加路由模块
function start(route) {
    function onRequest(request, response) {
        // 也可以用 querystring 模块来解析 POST 请求体中的参数
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        route(pathname);

        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello,World!");
        response.end();
    }

    http.createServer(onRequest).listen(8888);
    console.log("Server has started on http://localhost:8888.")
}

exports.start = start;