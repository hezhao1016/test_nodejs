// app.js

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
let templating = require('./templating');
const rest = require('./rest');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production'; // 当前环境

// 记录URL
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
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

// 给ctx对象绑定rest()方法
app.use(rest.restify());

// 注册控制器
app.use(controller());

app.listen(3000);
console.log('app start at port 3000...');
