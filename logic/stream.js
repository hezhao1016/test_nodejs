// Node.js Stream(流)
// Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
// Node.js Stream 有四种流类型：
//     Readable - 可读操作。
//     Writable - 可写操作。
//     Duplex - 可读可写操作.
//     Transform - 操作被写入数据，然后读出结果。
// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
//     data - 当有数据可读时触发。
//     end - 没有更多的数据可读时触发。
//     error - 在接收和写入过程中发生错误时触发。
//     finish - 所有数据已被写入到底层系统时触发。

const fs = require('fs');

/////////////////////// 读取流
var data = '';

// 创建读取流
var readerStream = fs.createReadStream('../files/a.txt');

// 设置编码
readerStream.encoding = 'UTF8';

// 处理流事件 -> data, end, error
readerStream.on('data', chunk => data += chunk);
readerStream.on('end', () => console.log(data));
readerStream.on('error', err => {
    console.error('Error:' + err.stack)
});

console.log('读取流 程序执行完毕。');


/////////////////////// 写入流
var data = '你好！我是艾编程，来自江西，请多关照！';

// 创建一个写入流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('../files/output.txt');
// 追加模式
// var writerStream = fs.createWriteStream('../files/output.txt', {'flags': 'a'});

// 写入数据，使用 utf8 编码
writerStream.write(data, 'UTF8');

// 标记文件末尾
writerStream.end();

// 处理流事件 -> finish, error
writerStream.on('finish', function (){
    console.log('写入完成。');
});
writerStream.on('error', function (err){
    console.error('Error:' + err.stack)
});

console.log('写入流 程序执行完毕。');


/////////////////////// 管道流
// 管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

// 创建一个读取流
var readerStream = fs.createReadStream('../files/output.txt');
// 创建一个写入流
var writerStream = fs.createWriteStream('../files/output2.txt');

// 管道读写操作
// 读取 output.txt 文件内容，并将内容写入到 output2.txt 文件中
readerStream.pipe(writerStream);
console.log('管道流 程序执行完毕。');


/////////////////////// 链式流
// 链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作。
// 接下来我们就用管道和链式来压缩和解压文件。

// 引入压缩模块
const zlib = require('zlib');

// 1.先执行，压缩文件并写入
// fs.createReadStream('../files/a.txt')
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream('../files/a.txt.gz'));
// console.log('文件压缩完成。');

// 2.再执行，解压文件并写入
fs.createReadStream('../files/a.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('../files/a_gunzip.txt'));
console.log('文件解压完成。');