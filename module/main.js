/*
为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。
模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。
Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

CommonJS模块规范
Node应用由模块组成，采用CommonJS模块规范。
根据这个规范，每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。
CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
*/

// 引入模块 ./ 为当前目录，node.js 默认后缀为 js
var Example1 = require("./example1"); // 不要忘了写相对目录
example1 = new Example1();
example1.setName("张三");
example1.sayHello();

console.log("------------------------");
var example2 = require('./example2');
example2.world();

console.log("------------------------");
var greet = require('./example3');
greet("Horace");

console.log("------------------------");
var example4 = require('./example4');
example4.hello();
example4.greet("Horace");
console.log(example4.foo());

console.log("------------------------");
var example5 = require('./example5');
example5.hello();
example5.greet("Horace");
console.log(example5.foo());
console.log(example5.x);


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


总结：
为了方便，Node为每个模块提供一个exports变量，指向module.exports。
这等同在每个模块头部，有一行这样的命令: var exports = module.exports = {}; 使exports和module.exports都指向一个空对象。
于是我们可以直接在 exports 对象上添加方法，表示对外输出的接口，如同在module.exports上添加一样。
注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。
*/