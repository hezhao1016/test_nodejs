// Node.js Buffer(缓冲区)
// JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
// 但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
// 在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
// 在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用 Buffer.from() 接口去创建Buffer对象。

// Buffer 与字符编码
// Buffer 实例一般用于表示编码字符的序列，比如 UTF-8 、 UCS2 、 Base64 、或十六进制编码的数据。 通过使用显式的字符编码，就可以在 Buffer 实例与普通的 JavaScript 字符串之间进行相互转换。
// Node.js 目前支持的字符编码包括：
//     ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
//     utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
//     utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。
//     ucs2 - utf16le 的别名。
//     base64 - Base64 编码。
//     latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。
//     binary - latin1 的别名。
//     hex - 将每个字节编码为两个十六进制字符。
const buf = Buffer.from('hello','ascii');
console.log(buf.toString('hex'));
console.log(buf.toString('base64'));


// 创建 Buffer 类
// Buffer 提供了以下 API 来创建 Buffer 类：
// Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
// Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
// Buffer.allocUnsafeSlow(size)
// Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
// Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
// Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
// Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');


// 写入缓冲区
const buf7 = Buffer.alloc(256);
len = buf7.write("www.runoob.com");
console.log("写入字节数 : "+  len);

// 从缓冲区读取数据
console.log(buf7.toString('utf-8'));

const buf8 = Buffer.alloc(26);
for (var i = 0 ; i < 26 ; i++) {
    buf8[i] = i + 97;
}
console.log( buf8.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf8.toString('ascii',0,5));   // 输出: abcde
console.log( buf8.toString('utf8',0,5));    // 输出: abcde
console.log( buf8.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde


// 将 Buffer 转换为 JSON 对象
// toJSON(), 当字符串化一个 Buffer 实例时，JSON.stringify() 会隐式地调用 toJSON()方法。
const buf9 = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf9);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);
console.log(buf9.toJSON());

const copy = JSON.parse(json, (key, value) => {
    return value && value.type === 'Buffer' ?
        Buffer.from(value.data) :
        value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);


// 缓冲区合并
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());


// 缓冲区比较
// buf.compare(otherBuffer); 返回一个数字 -1,0,1，分别表示 buf 在 otherBuffer 之前，之后或相同。
var buffer1 = Buffer.from('ABC');
var buffer2 = Buffer.from('ABCD');
var result = buffer1.compare(buffer2);
if(result < 0) {
    console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
    console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
    console.log(buffer1 + " 在 " + buffer2 + "之后");
}


// 拷贝缓冲区
// buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
// 参数描述如下：
//     targetBuffer - 要拷贝的 Buffer 对象。
//     targetStart - 数字, 可选, 默认: 0
//     sourceStart - 数字, 可选, 默认: 0
//     sourceEnd - 数字, 可选, 默认: buffer.length
var buffer1 = Buffer.from('abcdefghijkl');
var buffer2 = Buffer.from('RUNOOB');

//将 buffer2 插入到 buffer1 指定位置上
buffer2.copy(buffer1, 2);
console.log(buffer1.toString()); // abRUNOOBijkl


// 缓冲区裁剪
// buf.slice([start[, end]]) 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
var buffer1 = Buffer.from('runoob');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());


// 缓冲区长度
var buffer = Buffer.from('www.runoob.com我');
console.log("buffer length: " + buffer.length); // 内存长度，返回 17
