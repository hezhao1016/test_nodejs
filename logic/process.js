// process 对象是一个全局变量，它提供当前 Node.js 进程的有关信息，以及控制当前 Node.js 进程。 因为是全局变量，所以无需使用 require()。
// process 对象是 EventEmitter 的实例。
// 事件列表：
// exit                当进程准备退出时触发。
// beforeExit          当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
// uncaughtException   当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
// Signal               当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。
//
// 属性列表：
// stdout      标准输出流。
// stderr      标准错误流。
// stdin       标准输入流。
// argv        argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
// execPath    返回执行当前脚本的 Node 二进制文件的绝对路径。
// execArgv    返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。
// exit        结束程序
// env         返回一个对象，成员为当前 shell 的环境变量
// exitCode    进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。
// version     Node 的版本，比如v0.10.18。
// versions    一个属性，包含了 node 的版本和依赖.
// config      一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。
// pid         当前进程的进程号。
// title       进程名，默认值为"node"，可以自定义该值。
// arch        当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。
// platform    运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
// mainModule  require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。
//
// 方法列表：
// abort()                         这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。
// chdir(directory)                改变当前工作进程的目录，如果操作失败抛出异常。
// cwd()                           返回当前进程的工作目录
// exit([code])                    使用指定的 code 结束进程。如果忽略，将会使用 code 0。
// kill(pid[, signal])             发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。
// memoryUsage()                   返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。
// nextTick(callback)              一旦当前事件循环结束，调用回到函数。
// umask([mask])                   设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。
// uptime()                        返回 Node 已经运行的秒数。
// hrtime()                        返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。
// 
// 以下函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。
// getgid()                        获取进程的群组标识（参见 getgid(2)）。获取到得时群组的数字 id，而不是名字。
// setgid(id)                      设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。
// getuid()                        获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。
// setuid(id)                      设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。果指定了群组名，会阻塞等待解析为数字 ID 。
// getgroups()                     返回进程的群组 iD 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。
// setgroups(groups)               设置进程的群组 ID。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。
// initgroups(user, extra_group)   读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。

// 输出当前目录
console.log('当前目录: ' + process.cwd());
// 输出当前版本
console.log('当前版本: ' + process.version);
// 输出内存使用情况
console.log(process.memoryUsage());

process.on("exit", function (code){
    setTimeout(function () {
        console.log("该代码永远不会执行");
    },0);
    console.log("退出码为：", code);
});
console.log("程序执行结束。");


// 输出到终端
process.stdout.write("Hello World!\n");

// 通过参数读取
process.argv.forEach(function(val, index, array){
    console.log(index + ": " + val);
});

// 获取执行路径
console.log(process.execPath);

// 操作系统信息
console.log(process.platform);

// 从控制台读取信息
process.stdout.write("请输入：");
process.stdin.setEncoding('utf8');
process.stdin.on('readable', () => {
    var chunk = process.stdin.read();

    if(typeof chunk === 'string'){
        // 去掉回车符
        chunk = chunk.slice(0,-1);
        process.stdout.write(`stringLength:${chunk.length}\n`);
    }
    if(chunk === ''){
        // 触发结束事件
        process.stdin.emit('end');
        return;
    }
    if (chunk !== null) {
        process.stdout.write(`data: ${chunk}\n`);
    }
    process.stdout.write("请输入：");
});

// 切换到旧模式
// process.stdin.resume();
// process.stdin.setEncoding('utf8');
// process.stdin.on('data', function(data) {
//     process.stdout.write(`data: ${data}`);
// });

// 结束事件
process.stdin.on('end', () => {
    process.stdout.write('end\n');

    // 结束程序，0表示正常退出
    process.exit(0);
});


// 更好用的读取可以参考 readline.js