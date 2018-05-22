function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

// 在module.exports上添加新值
module.exports.hello = hello;
module.exports.greet = greet;
module.exports.foo = function () { return 'foo'; };
module.exports.x = "X"; // 输出变量