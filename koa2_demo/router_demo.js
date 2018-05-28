// koa2 路由
// 安装模块：$ cnpm install koa-router@7.4.0 --save
//
// POST 请求
// 由于koa提供的request对象，没有提供解析request的body的功能
// 所以，我们又需要引入 koa-bodyparser 来解析原始request请求，然后，把解析后的参数，绑定到ctx.request.body中。
// 安装模块：$ cnpm install koa-bodyparser@4.2.1 --save

const Koa = require('koa');

// 注意require('koa-router')返回的是函数
const router = require('koa-router')();
// 用于解析POST请求
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    await next();
});

// GET 请求
router.get('/', async (ctx, next) => {
    ctx.body = '<h1>Index</h1>';
});

// 路径中可带变量
router.get('/hello/:name', async (ctx, next) => {
    // 获取参数
    var name = ctx.params.name;
    ctx.body = `<h1>Hello, ${name}!</h1>`;
});

// 注册页
router.get('/login', async (ctx, next) => {
    ctx.body = `<h1>Index</h1>
                <form action="/signin" method="post">
                    <p>Name: <input name="name" value="koa"></p>
                    <p>Password: <input name="password" type="password"></p>
                    <p><input type="submit" value="Submit"></p>
                </form>`;
});

// POST请求
router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name:${name}, password:${password}`);
    if (name === 'koa' && password === '123456'){
        ctx.response.body = `<h1>Welcome,${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
                             <p><a href="/login"/>Try Login Again</p>`;
    }
});


// 注册bodyParser对象,必须在router之前注册
app.use(bodyParser());
// 注册路由中间件
app.use(router.routes());

app.listen(3000);
console.log('app start at port 3000...');
