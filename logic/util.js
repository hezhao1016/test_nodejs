// util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。

const util = require('util');

// util.inherits
// util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数。
// JavaScript 的面向对象特性是基于原型的，与常见的基于类的不同。JavaScript 没有提供对象继承的语言级别特性，而是通过原型复制来实现的。
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}
Base.prototype.showName = function() {
    console.log(this.name);
};
function Sub() {
    this.name = 'sub';
}
util.inherits(Sub, Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
//objSub.sayHello();
console.log(objSub);

// 我们定义了一个基础对象Base 和一个继承自Base 的Sub，Base 有三个在构造函数 内定义的属性和一个原型中定义的函数，通过util.inherits 实现继承。
// 注意：Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
// 同时，在原型中定义的属性不会被console.log 作 为对象的属性输出。如果我们去掉 objSub.sayHello(); 这行的注释，将会报错。



// util.inspect
// util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
// showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
// depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。 如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
// 特别要指出的是，util.inspect 并不会简单地直接把对象转换为字符串，即使该对象定义了toString 方法也不会调用。
console.log("-----------------------------------------------------");
function Person(){
    this.name = "byvoid";
    this.toString = function () {
        return this.name;
    }
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true));


// util.isArray(object)
// 如果给定的参数 "object" 是一个数组返回true，否则返回false。
console.log("-------------------------isArray----------------------------");
console.log(util.isArray([]));
console.log(util.isArray(new Array));
console.log(util.isArray({}));


// util.isRegExp(object)
// 如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
console.log("-------------------------isRegExp----------------------------");
console.log(util.isRegExp(/some regexp/)); // true
console.log(util.isRegExp(new RegExp('another regexp'))); // true
console.log(util.isRegExp({})); // false


// util.isDate(object)
// 如果给定的参数 "object" 是一个日期返回true，否则返回false。
console.log("--------------------------isDate---------------------------");
console.log(util.isDate(new Date()));
console.log(util.isDate(Date()));
console.log(util.isDate({}));


// util.isError(object)
// 如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
console.log("--------------------------isError---------------------------");
console.log(util.isError(new Error()));
console.log(util.isError(new TypeError()));
console.log(util.isError({ name: 'Error', message: 'an error occurred' }));