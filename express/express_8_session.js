// Session 管理
// 对于session,使用express-session中间件，默认是放在内存里的,可以通过其他方法存储
// 可以直接使用req.session.name取得和设置session

const express = require('express');
const session = require('express-session');
const MongoStore  = require('connect-mongo')(session);
const util = require('util');

var app = express();

// 设置session模块
// 可以把session存储在mongodb里，需要使用到connect-mongo包
app.use(session({
    secret:'my app secret',     // secret是设置在cookie里的session key
    saveUninitialized:false,    // 是否自动保存未初始化的会话，建议false
    resave:false,               // 是否每次都重新保存会话，建议false
    // store: new MongoStore({     // store用来指定session存储位置。这里：创建新的mongodb数据库存储session
    //     host: 'localhost',      // 数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
    //     port: 27017,            // 数据库的端口号
    //     db: 'test-app',         // 数据库的名称。
    //     collection:'sessions',  // 存在哪个集合里，默认为sessions
    //     ttl:10,                 // session过期时间
    //     autoRemove: 'native',   // mongo2.2+自动移除过期的session，disable为禁用
    //     autoRemoveInterval: 10, // 移除过期session间隔时间,默认为10分钟
    //     touchAfter: 24 * 3600   // 同步session间隔，默认每次请求都会同步到数据库
    // }),
    name:'test',                // cookie的name，默认值是：connect.sid
    cookie:{
        maxAge:10 * 1000          // session有效期
    }
}));

// req.session.destroy()    销毁对话
// req.session.save()       保存当前session
// 通过req.session.id和req.sessionID查看session的id，但是只可读，不可写。
// 可用req.session.cookie查看cookie的各种属性，比如req.session.cookie.maxAge等

// session存值
app.get('/login',function(req, res){
    req.session.user = {
        'name':req.query.name,
        'pass':req.query.pass,
        'avatar':req.query.avatar
    };
    res.end('session is OK.');
});

app.get('/', function (req, res) {
    console.log("session.user: " + util.inspect(req.session.user));

    res.send(util.inspect(req.session));
});

app.listen(8081);
console.log("Server running at http://127.0.0.1:8081/");

// 测试
// http://127.0.0.1:8081/login?name=Jack&pass=123456&avatar=1999