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