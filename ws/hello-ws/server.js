// 导入WebSocket模块
const WebSocket = require('ws');

// 引用Server类
const WebSocketServer = WebSocket.Server;

// 实例化一个WebSocket Server
const wss = new WebSocketServer({
    port: 3000
});

// 响应connection事件
wss.on('connection', function (ws) {
   console.log('[SERVER] connextion()');

   // 响应message事件，在收到消息后再返回一个ECHO: xxx的消息给客户端。
   ws.on('message', function (message) {
       console.log(`[SERVER] Received:${message}`);
       ws.send(`ECHO:${message}`, (err) => {
           if (err){
               console.error(`[SERVER] error:${err}`);
           }
       });
   });
});

console.log('WebSocket 启动成功...');