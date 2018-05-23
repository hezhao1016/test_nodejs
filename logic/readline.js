// readline 模块提供了一个接口，用于从可读流（如 process.stdin）读取数据，每次读取一行。

// 基本用法
// // 引入readline模块
// const readline = require('readline');
//
// //创建readline接口实例
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
// // question方法
// rl.question('你认为 Node.js 中文网怎么样？\n', (answer) => {
//     // 对答案进行处理
//     console.log(`多谢你的反馈：${answer}`);
//
//     rl.close();
// });
//
// // close事件监听
// rl.on("close", function(){
//     console.log("结束程序。");
//     // 结束程序
//     process.exit(0);
// });
//
// rl.on('pause', () => {
//     console.log('Readline 被暂停。');
// });
//
// rl.on('resume', () => {
//     console.log('Readline 被恢复。');
// });

// 注意：当调用该代码时，Node.js 程序不会终止，直到 readline.Interface 被关闭，因为接口在等待 input 流中要被接收的数据。

// 方法：
// rl.question(query, callback); // 暂停 input 流，且稍后需要时可被恢复。
// rl.resume(); // 恢复 input 流。



// 例子：简单的命令行界面
// const readline = require('readline');
// const rl = readline.createInterface(process.stdin, process.stdout);
//
// // 用于设置每当 rl.prompt() 被调用时要被写入到 output 的提示
// rl.setPrompt('请输入> ');
// // 在 output 流中新的一行写入 readline.Interface 实例配置后的 prompt，用于为用户提供一个可供输入的新的位置。
// rl.prompt();
//
// // 当 input 流接收到接收行结束符（\n、\r 或 \r\n）时触发 'line' 事件
// rl.on('line', function(line) {
//     switch(line.trim()) {
//         case 'hello':
//             console.log("world!");
//             break;
//         case 'close':
//             rl.close();
//             break;
//         default:
//             console.log(`你输入的是：'${line.trim()}'`);
//             break;
//     }
//     rl.prompt();
// }).on('close', function() {
//     console.log("结束程序。");
//     process.exit(0);
// });


// 例子：逐行地读取文件流
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('../files/a.txt'),
    crlfDelay: Infinity
});

rl.on('line', (line) => {
    console.log(`文件的单行内容：${line}`);
});