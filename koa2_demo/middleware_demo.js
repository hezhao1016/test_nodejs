// koa middleware
//
// koa的执行逻辑：
// 服务器每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。
// 我们可以对ctx操作，并设置返回内容。但是为什么要调用await next()？
// 原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。
// 我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。


// 示例：用以下3个middleware组成处理链，依次打印日志，记录处理时间，输出HTML
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`method：${ctx.request.method} | path：${ctx.request.path} | url：${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start;
    console.log(`Time: ${ms} ms.`); //打印程序耗时
});

app.use(async (ctx, next) => {
    await next();
    ctx.type = 'text/html'; // 等同于：ctx.request.type
    ctx.body = '<h1>Hello koa2!</h1>'; // 等同于：ctx.request.body
    console.log('Hello koa2!');
});

app.listen(3000);
console.log('app start at port 3000...');

// middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
//
// 此外，如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了。
// 这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
// app.use(async (ctx, next) => {
//     if (await checkUserPermission(ctx)) {
//         await next(); // 鉴权通过
//     } else {
//         ctx.response.status = 403; // 不通过，不再执行后续步骤
//     }
// });
//
// 理解了middleware，我们就已经会用koa了！
// 最后注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。