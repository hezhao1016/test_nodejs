// JavaScript中有三种声明变量的方式：var、let、const 的区别。

// 1.const定义的常量不可以修改，而且必须初始化。
const b = 2; // 正确
// const b; / /错误，必须初始化
// b = 5; // 错误，常量无法修改
console.log('函数外const定义b：' + b); // 有输出值


// 2.var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
var a = 1;
// var a; // 不会报错
console.log('函数外var定义a：' + a); // 输出1

function change(){
    a = 4;
    console.log('函数内var定义a：' + a);//输出4
}
change();
console.log('函数调用后var定义a为函数内部修改值：' + a); // 输出4


// 3.let是块级作用域，函数内部使用let定义后，对函数外部无影响。
let c = 3;
console.log('函数外let定义c：' + c); // 输出3

function change(){
    let c = 6;
    console.log('函数内let定义c：' + c); // 输出6
}

change();
console.log('函数调用后let定义c不受函数内部定义影响：' + c); //输出3