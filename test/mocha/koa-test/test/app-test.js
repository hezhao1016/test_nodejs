// 利用supertest提供的expect()更方便地断言响应的HTTP代码、返回内容和HTTP头。断言HTTP头时可用使用正则表达式。
// 当所有测试运行结束后，app实例会自动关闭，无需清理。
// 利用mocha的异步测试，配合supertest，我们可以用简单的代码编写端到端的HTTP自动化测试。

const
    request = require('supertest'),
    app = require('../app');

describe('#test koa app', () => {

    // 让app实例监听在9900端口上，并且获得返回的server实例
    let server = app.listen(9900);

    describe('#test server', () => {

        it('#test GET /', async () => {
            // 构造一个GET请求，发送给koa的应用，然后获得响应
            let res = await request(server)
                .get('/')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, world!</h1>');
        });

        it('#test GET /path?name=Bob', async () => {
            let res = await request(server)
                .get('/path?name=Bob')
                .expect('Content-Type', /text\/html/)
                .expect(200, '<h1>Hello, Bob!</h1>');
        });
    });
});