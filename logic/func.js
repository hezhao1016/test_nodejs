// Node.js 函数

// 使用函数作为参数
function say(word){
    console.log(word);
}
function execute(func, value) {
    func(value);
}
execute(say, "Hello");


// 匿名函数
execute(function (word) {
    console.log(word);
},"Hello");


// lambda表达式,
execute((word) => console.log(word), "Hello");
// 可以省略括号如果没有参数使用 () => ...
execute(word => console.log(word), "Hello");
// 多行语句使用 { ... }
execute((word) => {
    console.log(word);
}, "Hello");
