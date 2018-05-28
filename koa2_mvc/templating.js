// 集成Nunjucks
// 给ctx对象绑定一个render(view, model)的方法

const nunjucks = require('nunjucks');

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

function templating(path, opts) {
    // 创建Nunjucks模板引擎对象
    var env = createEnv(path, opts);
    return async (ctx, next) => {
        // 给ctx绑定render函数
        ctx.render = function (view, model) {
            // 把render后的内容赋值给response.body
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            // 设置Content-Type为html
            ctx.response.type = 'text/html';
        };
        // 继续处理请求
        await next();
    };
}

module.exports = templating;