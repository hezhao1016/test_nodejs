// app.js

const url = require('url');

const ws = require('ws');

const Cookies = require('cookies');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const templating = require('./templating');

const WebSocketServer = ws.Server;

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production'; // 当前环境

// 记录URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    await next();
});

// 保存用户信息
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    await next();
});

// 处理静态文件
if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// 注册bodyParser对象,必须在router之前注册
app.use(bodyParser());

// 给ctx加上render()来使用Nunjucks
app.use(templating('views', {
    // 判断当前环境是否是production环境。如果是，就使用缓存，如果不是，就关闭缓存
    watch: !isProduction,
    noCache: !isProduction
}));

// 注册控制器
app.use(controller());

// 把WebSocketServer绑定到和koa同一个端口
// koa服务
let server = app.listen(3000);

// 使用Cookie识别用户身份
function parseUser(obj) {
    if (!obj) {
        return;
    }
    console.log('try parse: ' + obj);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.headers) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }
    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (e) {
            // ignore
        }
    }
}

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });
    // 消息广播
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };

    wss.on('connection', function (ws) {
        // ws.upgradeReq是一个request对象
        let location = url.parse(ws.upgradeReq.url, true);

        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        // 过滤路径
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        // check user:
        let user = parseUser(ws.upgradeReq);
        if (!user) {
            // Cookie不存在或无效，直接关闭WebSocket
            ws.close(4001, 'Invalid user');
        }
        // 识别成功，把user绑定到该WebSocket对象
        ws.user = user;
        // 绑定WebSocketServer对象
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

// 消息ID
var messageIndex = 0;

// 创建消息
function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

// 新连接
function onConnect() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:

    // *** 这里请使用 forEach 遍历
    let users = [];
    this.wss.clients.forEach(function (client) {
        users.push(client.user);
    });

    this.send(createMessage('list', user, users));
}

// 调用wss.broadcast()进行广播
function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);


console.log('app start at port 3000...');
