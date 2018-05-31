// 第一个 koa2 程序

// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa');

// 创建一个Koa对象表示web app本身
const hello = new Koa();

// 对于任何请求，app将调用该异步函数处理请求
hello.use(async (ctx, next) => {
    await next();
    // 设置response的Content-Type
    ctx.response.type = 'text/html';
    // 设置response的内容
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

// 在端口3000监听
hello.listen(3000);
console.log('app start at port 3000...');

// 解释异步函数：
// 参数ctx是由koa传入的封装了request和response的变量，我们可以通过它访问request和response，next是koa传入的将要处理的下一个异步函数。
// 上面的异步函数中，我们首先用await next();处理下一个异步函数，然后，设置response的Content-Type和内容。
// 由async标记的函数称为异步函数，在异步函数中，可以用await调用另一个异步函数，这两个关键字将在ES7中引入。