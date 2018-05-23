// os 模块提供了一些操作系统相关的实用方法

const os = require('os');

// 操作系统相关的行末标志:
//     \n 在 POSIX 系统上
//     \r\n 在 Windows系统上
console.log(os.EOL);

// Node.js 二进制编译所用的 操作系统CPU架构,等价于 process.arch
console.log(os.arch());

// 返回一个包含错误码,处理信号等通用的操作系统特定常量的对象
// console.log(os.constants);

// CPU 内核的信息
// model <string>
// speed <number> (兆赫兹为单位)
// times <Object>
// user <number> CPU花费在用户模式下的毫秒时间数.
//     nice <number> CPU花费在良好模式下的毫秒时间数.
//     sys <number> CPU花费在系统模式下的毫秒时间数.
//     idle <number> CPU花费在空闲模式下的毫秒时间数.
//     irq <number> CPU花费在中断请求模式下的毫秒时间数.
console.log(os.cpus());

// 当前用户的home目录
console.log(os.homedir());

// 操作系统的主机名
console.log(os.hostname());

// 被赋予网络地址的网络接口
console.log(os.networkInterfaces());

// 操作系统平台
console.log(os.platform());

// 默认临时文件目录
console.log(os.tmpdir());

// 操作系统的名字
console.log(os.type());

// 操作系统的上线时间
// 注意：在Windows平台上，这个方法返回的秒值包含分数，请用Math.floor()获取整数值
console.log(os.uptime());

// 当前系统有效用户的信息
console.log(os.userInfo());
