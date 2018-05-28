// app.js

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
let templating = require('./templating');

const app = new Koa();

const isProduction = process.env.NODE_ENV === 'production'; // 当前环境

// 记录URL以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    var start = new Date().getTime(),
        execTime;
    await next();
    execTime = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', `${execTime}ms`);
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

app.listen(3000);
console.log('app start at port 3000...');
