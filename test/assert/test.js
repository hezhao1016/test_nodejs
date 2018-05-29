// 使用Node.js提供的assert模块进行断言

const assert = require('assert');
const hello = require('./hello');

const sum = hello.sum;

// assert模块非常简单，它断言一个表达式为true。如果断言失败，就抛出Error。
assert.strictEqual(sum(), 0);
assert.strictEqual(sum(1), 1);
assert.strictEqual(sum(1, 2), 3);
assert.strictEqual(sum(1, 2, 3), 6);

console.log("运行正常...");