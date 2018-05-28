// 使用 Nunjucks 模板

const Koa = require('koa');

// 注意require('koa-router')返回的是函数
const router = require('koa-router')();
// 用于解析POST请求
const bodyParser = require('koa-bodyparser');
// 使用模板
const nunjucks = require('nunjucks');

const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`Process ${ctx.method} ${ctx.url}...`);
    await next();
});

// 创建模板env对象
function createEnv(path, opts){
    var autoescape  = opts.autoescape  === undefined ? true : opts.autoescape ,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            // 创建一个文件系统加载器，从view目录读取模板
            new nunjucks.FileSystemLoader(path, {
                // Nunjucks默认就使用同步IO读取模板文件,如果指定noCache=false表示读取过的页面会缓存起来，只读取一次
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

// 表示Nunjucks模板引擎对象
var env = createEnv('view', {
    watch: true,
    noCache: true, // 开发环境，关闭缓存
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});


router.get('/hello', async (ctx, next) => {
    ctx.body = env.render('hello.html', {
        name: 'Horace'
    });
});
router.get('/list', async (ctx, next) => {
    ctx.body = env.render('list.html', {
        langs: ['Java', 'C#', 'Python', 'Node.js', 'Ruby', 'PHP', 'JavaScript']
    });
});
router.get('/extend', async (ctx, next) => {
    ctx.body = env.render('extend.html', {
        header: 'Hello', body: 'bla bla bla...'
    });
});


// 注册bodyParser对象,必须在router之前注册
app.use(bodyParser());
// 注册路由中间件
app.use(router.routes());

app.listen(3000);
console.log('app start at port 3000...');