// mocha是JavaScript的一种单元测试框架，既可以在浏览器环境下运行，也可以在Node.js环境下运行。
// 使用mocha，我们就只需要专注于编写单元测试本身，然后，让mocha去自动运行所有的测试，并给出测试结果。
// mocha的特点主要有：
// - 既可以测试简单的JavaScript函数，又可以测试异步代码，因为异步是JavaScript的特性之一；
// - 可以自动运行所有测试，也可以只运行特定的测试；
// - 可以支持before、after、beforeEach和afterEach来编写初始化代码。

// mocha默认会执行test目录下的所有测试

const assert = require('assert');

const hello = require('../hello');

describe('#hello.js', () => {
    describe('#sum()', () => {
        // 一组test前执行一次
        before(function () {
            console.log('before...');
        });

        // 一组test后执行一次
        after(function () {
            console.log('after...');
        });

        // 每个test前执行一次
        beforeEach(function () {
            console.log('  beforeEach...');
        });

        // 每个test后执行一次
        afterEach(function () {
            console.log('  afterEach...');
        });

        it('sum should retuen 0', () => {
            assert.strictEqual(hello.sum(), 0);
        });

        it('sum should retuen 1', () => {
            assert.strictEqual(hello.sum(1), 1);
        });

        it('sum should retuen 3', () => {
            assert.strictEqual(hello.sum(1, 2), 3);
        });

        it('sum should retuen 3', () => {
            assert.strictEqual(hello.sum(1, 2, 3), 6);
        });
    });
});


// 运行测试
// 方法一，可以打开命令提示符，切换到hello-test目录，然后执行命令:
// $ node node node_modules\mocha\bin\mocha
//
// 方法二，我们在package.json中添加npm命令:
// "scripts": {
//     "test": "mocha"
// }
// 然后在hello-test目录下执行命令:
// $ npm test