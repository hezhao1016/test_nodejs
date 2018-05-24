// 使用 Node 创建 Web 客户端

const http = require('http');

// 用于请求的选项
var options = {
    host:'localhost',
    port:'8080',
    path:'/index.html',
};

// 处理响应的回调函数
var callback = function (response){
  var body = '';

  // data事件，接收数据
  response.on('data', function (data) {
     body += data;
  });

  // 数据接收完成
  response.on('end', function () {
      console.log(body);
  })
};

try{
    // 向服务端发送请求
    var req = http.request(options,callback);
    req.end();
}catch (e) {
    console.error('Error:' + e.stack);
}

