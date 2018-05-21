/*
为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
*/

// 引入模块 ./ 为当前目录，node.js 默认后缀为 js
var Hello = require("./hello"); // 不要忘了写相对目录
hello = new Hello();
hello.setName("张三");
hello.sayHello();

var hello1 = require('./hello1');
hello1.world();

var greet = require('./hello2');
greet("Horace");

var hello3 = require('./hello3');
hello3.hello();
hello3.greet("Horace");
console.log(hello3.foo());

var hello4 = require('./hello4')
hello4.hello();
hello4.greet("Horace");
console.log(hello4.foo());


/*
module.exports vs exports
在Node环境中，有两种方法可以在一个模块中输出变量：
方法一：对module.exports赋值
方法二：直接使用exports：

但是你不可以直接对exports赋值,虽然代码可以执行，但是模块并没有输出任何变量

默认情况下，Node准备的exports变量和module.exports变量实际上是同一个变量，并且初始化为空对象{}，于是，我们可以写：

    exports.foo = function () { return 'foo'; };
    exports.bar = function () { return 'bar'; };
也可以写：

    module.exports.foo = function () { return 'foo'; };
    module.exports.bar = function () { return 'bar'; };

换句话说，Node默认给你准备了一个空对象{}，这样你可以直接往里面加东西。
但是，如果我们要输出的是一个函数或数组，那么，只能给module.exports赋值：

    module.exports = function () { return 'foo'; };
给exports赋值是无效的，因为赋值后，module.exports仍然是空对象{}。


结论

如果要输出一个键值对象{}，可以利用exports这个已存在的空对象{}，并继续在上面添加新的键值；
如果要输出一个函数或数组，必须直接对module.exports对象赋值。
所以我们可以得出结论：直接对module.exports赋值，可以应对任何情况：

    module.exports = {
        foo: function () { return 'foo'; }
    };
或者：

    module.exports = function () { return 'foo'; };
最终，我们强烈建议使用module.exports = xxx的方式来输出模块变量，这样，你只需要记忆一种方法。
*/