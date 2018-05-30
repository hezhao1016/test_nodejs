// app.js

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller'); // 导入controller middleware

const app = new Koa();

// log request URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    await next();
});

// 注册bodyParser对象,必须在router之前注册
app.use(bodyParser());
// 注册控制器
app.use(controller());

app.listen(3000);
console.log('app start at port 3000...');
