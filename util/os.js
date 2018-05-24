// os 模块提供了一些操作系统相关的实用方法

const os = require('util/os');

// 操作系统相关的行末标志:
//     \n 在 POSIX 系统上
//     \r\n 在 Windows系统上
console.log(os.EOL);

// 默认临时文件目录
console.log("tmpdir: " + os.tmpdir());

// 当前用户的home目录
console.log("homedir: " + os.homedir());

// 操作系统的主机名
console.log("hostname: " + os.hostname());

// 当前系统有效用户的信息
console.log("userInfo: " + os.userInfo());

// 操作系统平台
console.log("platform: " + os.platform());

// 操作系统的名字
console.log("type: " + os.type());

// 操作系统发行版本
console.log("release: " + os.release());

// 返回操作系统运行的时间，以秒为单位。
// 注意：在Windows平台上，这个方法返回的秒值包含分数，请用Math.floor()获取整数值
console.log("uptime: " + os.uptime());

// 操作系统CPU架构,可能的值有 "x64"、"arm" 和 "ia32"。等价于 process.arch
console.log("arch: " + os.arch());

// 返回 CPU 的字节序，可能的是 "BE" 或 "LE"。
console.log("endianness: " + os.endianness());

// 返回系统内存总量，单位为字节。
console.log("totalmem: " + os.totalmem());

// 返回操作系统空闲内存量，单位是字节。
console.log("freemem: " + os.freemem());

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
console.log("cpus: \n-----------------------------------------------");
console.log(os.cpus());

// 被赋予网络地址的网络接口
console.log("networkInterfaces: \n-----------------------------------------------");
console.log(os.networkInterfaces());