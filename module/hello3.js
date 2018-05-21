function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

// 输出一个键值对数组
module.exports = {
    hello: hello,
    greet: greet,
    foo: function () { return 'foo'; }
};