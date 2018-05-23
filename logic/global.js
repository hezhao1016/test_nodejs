// Node.js 全局对象
// JavaScript 中有一个特殊的对象，称为全局对象（Global Object），它及其所有属性都可以在程序的任何地方访问，即全局变量。
// 在浏览器 JavaScript 中，通常 window 是全局对象， 而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
// 在 Node.js 我们可以直接访问到 global 的属性，而不需要在应用中包含它。
//
// 全局对象与全局变量
// global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条 件的变量是全局变量：
//     - 在最外层定义的变量；
//     - 全局对象的属性；
//     - 隐式定义的变量（未定义直接赋值的变量）。
// 当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。
// 需要注意的是，在 Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。
//
// 注意： 永远使用 var 定义变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险。


// global 全局变量
//     Buffer 类
//     __dirname
//     __filename
//     clearImmediate(immediateObject)
//     clearInterval(intervalObject)
//     clearTimeout(timeoutObject)
//     console
//     exports
//     global
//     module
//     process
//     require()
//     setImmediate(callback[, ...args])
//     setInterval(callback, delay[, ...args])
//     setTimeout(callback, delay[, ...args])
//     URL
//     URLSearchParams

// 全局变量在所有模块中均可使用。 以下变量虽然看起来像全局变量，但实际上不是。 它们的作用域只在模块内
// _dirname
// __filename
// exports
// module
// require()


// 当前正在执行的脚本的文件名,绝对路径
console.log(__filename);

// 当前执行脚本所在的目录
console.log(__dirname);

// 在指定的毫秒(ms)数后执行一次指定函数(cb)。返回一个代表定时器的句柄值。
function printHello(){
    console.log("Hello,World!");
}
var t = setTimeout(printHello, 1000);

// 清除Timeout定时器
clearTimeout(t);

// 每隔指定的毫秒(ms)数执行指定函数(cb)一次，会一直执行。返回一个代表定时器的句柄值。
var t1 = setInterval(printHello, 500);

// 清除Interval定时器
clearInterval(t1);


console.log("-----------------------------------");
// console 用于提供控制台标准输出，它是由 Internet Explorer 的 JScript 引擎提供的调试工具，后来逐渐成为浏览器的实施标准。
// Node.js 沿用了这个标准，提供与习惯行为一致的 console 对象，用于向标准输出流（stdout）或标准错误流（stderr）输出字符。
// console.log([data][, ...])              向标准输出流打印字符并以换行符结束。该方法接收若干个参数，如果只有一个参数，则输出这个参数的字符串形式。如果有多个参数，则以类似于C 语言 printf() 命令的格式输出。
// console.info([data][, ...])             该命令的作用是返回信息性消息，这个命令与console.log差别并不大，除了在chrome中只会输出文字外，其余的会显示一个蓝色的惊叹号。
// console.error([data][, ...])            与console.log() 用法相同，用于输出错误消息。控制台在出现错误时会显示是红色的叉子。
// console.warn([data][, ...])             与console.log() 用法相同，用于输出警告消息。控制台出现有黄色的惊叹号。
// console.dir(obj[, options])             用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
// console.time(label)                     输出时间，表示计时开始。
// console.timeEnd(label)                  结束时间，表示计时结束。
// console.trace(message[, ...])           向标准错误流输出当前的调用栈。
// console.assert(value[, message][, ...]) 用于判断某个表达式或变量是否为真，接收两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。

console.info("程序开始执行：");
var counter = 10;
console.log("计数: %d", counter);
console.log(`计数: ${counter}`);
console.time("获取数据");

// 执行一些代码...
console.log('byvoid%diovyb');
console.log('byvoid%diovyb', 1991);

console.timeEnd('获取数据');
console.info("程序执行完毕。");
