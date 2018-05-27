// fs 文件系统，Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。
// 和所有其它JavaScript模块不同的是，fs模块同时提供了异步和同步的方法。
// https://www.cnblogs.com/wushanbao/p/7003308.html

const fs = require('fs');

// 异步和同步
// Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
// 异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
// 建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。

// 异步读取
/** fs.readFile(path, [options], callback)
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
fs.readFile('../files/a.txt', {flag: 'r+', encoding: 'utf8'}, function(err, data){
    if(err){
        return console.error(err);
    }
    console.log("异步读取: ", data.toString());
});

// 同步读取
// fs.readFileSync(path, [options])
var data = fs.readFileSync('../files/a.txt', {flag: 'r+', encoding: 'utf8'});
console.log("同步读取: ", data.toString());
console.log("读取程序执行完毕。");


// 异步写入
// fs.writeFile 并不一定是覆盖原来文件内容，而是取决于打开文件时带的 flags。如果是通过 writeFile 直接打开文件默认是 w 模式
/**
 * fs.writeFile(filename,data,[options],callback);
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为  ， flag 为 'w'
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */
var w_data = '这是一段通过fs.writeFileSync函数写入的内容；\r\n';
var w_data = new Buffer(w_data);
fs.writeFile(__dirname + '/../files/fs_writeFile.txt', w_data, {flag: 'w'}, function (err) {
    if(err) {
        return console.error(err);
    }
    console.log('fs.writeFile 异步写入成功');
});

// 也可以通过 open 打开文件指定模式，然后通过 writeFile 来写文件
fs.open('../files/fs_writeFile_byOpen.txt', "a+", function(err, fd){
    if (err) {
        return console.error(err);
    }
    fs.writeFile(fd, "bbccdd", function(err){
        if (err){
            return console.error(err);
        }
    });
});

// 同步写入
// fs.writeFileSync(path, data, [options])
fs.writeFileSync(__dirname + '/../files/fs_writeFileSync.txt', w_data, {flag: 'w'});
console.log('fs.writeFileSync 同步写入成功');


// 以追加方式写文件 异步 模式为a
// fs.appendFile(filename,data,[options],callback);
fs.appendFile(__dirname + '/../files/fs_appendFile.txt', '使用fs.appendFile追加文件内容', function (err) {
    if(err) {
        return console.error(err);
    }
    console.log('异步追加内容完成');
});

// 以追加方式写文件 同步
// fs.appendFile(filename,data,[options]);
fs.appendFileSync(__dirname + '/../files/fs_appendFileSync.txt', '使用fs.appendFileSync追加文件内容');
console.log('同步追加内容完成');


// 异步打开文件
// fs.open(path, flags[, mode], callback)
//
// 参数使用说明如下：
// path - 文件的路径。
// flags - 文件打开的行为。具体值详见下文。
// mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
// callback - 回调函数，带有两个参数如：callback(err, fd)。fd为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
//
// flags 参数可以是以下值：
// r	以读取模式打开文件。如果文件不存在抛出异常。
// r+	以读写模式打开文件。如果文件不存在抛出异常。
// rs	以同步的方式读取文件。
// rs+	以同步的方式读取和写入文件。
// w	以写入模式打开文件，如果文件不存在则创建。
// wx	类似 'w'，但是如果文件路径存在，则文件写入失败。
// w+	以读写模式打开文件，如果文件不存在则创建。
// wx+	类似 'w+'， 但是如果文件路径存在，则文件读写失败。
// a	以追加模式打开文件，如果文件不存在则创建。
// ax	类似 'a'， 但是如果文件路径存在，则文件追加失败。
// a+	以读取追加模式打开文件，如果文件不存在则创建。
// ax+	类似 'a+'， 但是如果文件路径存在，则文件读取追加失败。

// fs.open('../files/a.txt','r+',function (err,fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("异步文件打开成功！");
//
//     var buf = new Buffer(8);
//     var readfile = fs.readSync(fd, buf, 0, 8, null);
//     console.log("readSync -> " + readfile);
// });

// 同步打开文件
// fs.openSync(path, flags[, mode])
// var fd = fs.openSync('../files/a.txt','r+');
// console.log("同步打开文件：", fd);


// 读文件，读取打开的文件内容到缓冲区中；
//fs.read(fd, buffer, offset, length, position, callback);
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，向缓存区中写入时的初始位置，以字节为单位
 * length, 整数，读取文件的长度
 * position, 整数，读取文件初始位置；文件大小以字节为单位.如果 position 的值为 null，则会从当前文件指针的位置读取。
 * callback(err, bytesRead, buffer), 读取执行完成后回调函数，bytesRead实际读取字节数，buffer 被读取的缓存区对象
 */
// fs.open(__dirname + '/../files/a.txt', 'r', function (err, fd) {
//     if(err) {
//         console.error(err);
//         return;
//     } else {
//         var buffer = new Buffer(255);
//         console.log(buffer.length);
//         //每一个汉字utf8编码是3个字节，英文是1个字节
//         fs.read(fd, buffer, 0, 9, 3, function (err, bytesRead, buffer) {
//             if(err) {
//                 throw err;
//             } else {
//                 console.log(bytesRead);
//                 console.log(buffer.slice(0, f).toString());
//                 //读取完后，再使用fd读取时，基点是基于上次读取位置计算；
//                 fs.read(fd, buffer, 0, 9, null, function (err, bytesRead, buffer) {
//                     console.log(bytesRead);
//                     console.log(buffer.slice(0, bytesRead).toString());
//                 });
//             }
//         });
//     }
// });


// 写文件，将缓冲区内数据写入使用fs.open打开的文件
//fs.write(fd, buffer, offset, length, position, callback);
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，从缓存区中读取时的初始位置，以字节为单位
 * length, 整数，从缓存区中读取数据的字节数
 * position, 整数，写入文件初始位置；
 * callback(err, written, buffer), 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */
// fs.open(__dirname + '/../files/fs_write.txt', 'w', function (err, fd) {
//     if(err) {
//         console.error(err);
//         return;
//     } else {
//         var buffer = new Buffer('写入文件数据内容');
//         //写入'入文件'三个字
//         fs.write(fd, buffer, 3, 9, 12, function (err, written, buffer) {
//             if(err) {
//                 console.log('写入文件失败');
//                 console.error(err);
//                 return;
//             } else {
//                 console.log(buffer.toString());
//                 //写入'数据内'三个字
//                 fs.write(fd, buffer, 12, 9, null, function (err, written, buffer) {
//                     console.log(buffer.toString());
//                 })
//             }
//         });
//     }
// });


// 同步写文件
// fs.writeSync(fd, buffer, offset, length[, position])
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * buffer, 一个Buffer对象，v8引擎分配的一段内存
 * offset, 整数，从缓存区中读取时的初始位置，以字节为单位
 * length, 整数，从缓存区中读取数据的字节数
 * position, 整数，写入文件初始位置；
 */
// fs.open('../files/fs_writeSync.txt', 'w', function(err,fd){
//     if(err){
//         throw err;
//     }
//     var data = '123123123 hello world';
//     var buf = new Buffer(8);
//     fs.writeSync(fd, buf, 0, 8, 0);
//     // 异步关闭文件
//     fs.close(fd,function(err){
//         if(err){
//             throw err;
//         }
//         console.log('文件关闭成功');
//     })
// });


// 刷新缓存区
// 使用fs.write写入文件时，操作系统是将数据读到内存，再把数据写入到文件中，当数据读完时并不代表数据已经写完，因为有一部分还可能在内在缓冲区内。
// 因此可以使用fs.fsync方法将内存中数据写入文件；--刷新内存缓冲区；
//fs.fsync(fd, [callback])
/**
 * fd, 使用fs.open打开成功后返回的文件描述符
 * [callback(err, written, buffer)], 写入操作执行完成后回调函数，written实际写入字节数，buffer被读取的缓存区对象
 */
// fs.open(__dirname + '/../files/fs_fsync.txt', 'w', function (err, fd) {
//     if(err){
//         throw err;
//     }
//     var buffer = new Buffer('我爱nodejs编程');
//     fs.write(fd, buffer, 0, 9, 0, function (err, written, buffer) {
//         console.log(written.toString());
//         fs.write(fd, buffer, 9, buffer.length - 9, null, function (err, written) {
//             console.log(written.toString());
//             fs.fsync(fd);
//             fs.close(fd);
//             // fs.closeSync(fd);
//         })
//     });
// });


// 截取文件
// fs.ftruncate(fd, len, callback)
/**
 * fd - 通过 fs.open() 方法返回的文件描述符。
 * len - 文件内容截取的长度。
 * callback - 回调函数，没有参数。
 */
// var buf = new Buffer(1024);
// fs.open('../files/fs_writeFile.txt', 'r+', function(err, fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("截取了10字节后的文件内容。");
//
//     // 截取文件
//     fs.ftruncate(fd, 10, function(err){
//         if (err){
//             console.log(err);
//         }
//         console.log("文件截取成功。");
//         console.log("读取相同的文件");
//         fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//             if (err){
//                 console.log(err);
//             }
//
//             // 仅输出读取的字节
//             if(bytes > 0){
//                 console.log(buf.slice(0, bytes).toString());
//             }
//
//             // 关闭文件
//             fs.close(fd, function(err){
//                 if (err){
//                     console.log(err);
//                 }
//                 console.log("文件关闭成功！");
//             });
//         });
//     });
// });


// 删除文件
// fs.unlink(path, callback)
/**
 * path - 文件路径。
 * callback - 回调函数，没有参数。
 */
// console.log("准备删除文件！");
// fs.unlink('../files/xxx.txt', function(err) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("文件删除成功！");
// });


// 复制文件
fs.copyFile('../files/a.txt','../files/a_copy.txt',function (err) {
    if (err){
        console.log("复制文件失败");
    }
});


// 创建目录
//使用fs.mkdir创建目录
//fs.mkdir(path, [mode], callback);
/**
 * path, 被创建目录的完整路径及目录名；
 * [mode], 目录权限，默认0777
 * [callback(err)], 创建完目录回调函数,err错误对象
 */
// fs.exists(__dirname + '/../files/a.txt', function (exists) {
//     if(!exists){
//         fs.mkdir(__dirname + '/../files/fsDir', function (err) {
//             if(err){
//                 throw err;
//             }
//             console.log('创建目录成功')
//         });
//     }
// });


// 读取目录
//使用fs.readdir读取目录，重点其回调函数中files对象
//fs.readdir(path, callback);
/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */
// fs.readdir(__dirname + '/../files/', function (err, files) {
//     if(err) {
//         console.error(err);
//         return;
//     } else {
//         files.forEach(function (file) {
//             var filePath = path.normalize(__dirname + '/../files/' + file);
//             fs.stat(filePath, function (err, stat) {
//                 if(stat.isFile()) {
//                     console.log(filePath + ' is: ' + 'file');
//                 }
//                 if(stat.isDirectory()) {
//                     console.log(filePath + ' is: ' + 'dir');
//                 }
//             });
//         });
//         for (var i = 0; i < files.length; i++) {
//             //使用闭包无法保证读取文件的顺序与数组中保存的一致
//             (function () {
//                 var filePath = path.normalize(__dirname + '/../files/' + files[i]);
//                 fs.stat(filePath, function (err, stat) {
//                     if(stat.isFile()) {
//                         console.log(filePath + ' is: ' + 'file');
//                     }
//                     if(stat.isDirectory()) {
//                         console.log(filePath + ' is: ' + 'dir');
//                     }
//                 });
//             })();
//         }
//     }
// });


// 同步读取目录
var files = fs.readdirSync('../files/');
console.log("同步读取目录 -> " + files);


// 查看文件与目录的信息
//fs.stat(path, callback);
//fs.lstat(path, callback); //查看符号链接文件
/**
 * path, 要查看目录/文件的完整路径及名；
 * [callback(err, stats)], 操作完成回调函数；err错误对象，stat fs.Stat一个对象实例，提供如:isFile, isDirectory,isBlockDevice等方法及size,ctime,mtime等属性
 */
fs.stat(__dirname + '/../files/',function (err,stat) {
    if (err){
        return console.error(err);
    }

    console.log("读取文件信息成功！");
    console.log(stat);

   console.log("stat -> isFile : " + stat.isFile()); // 是否文件
   console.log("stat -> isDirectory : " + stat.isDirectory()); // 是否目录
   console.log("stat -> isBlockDevice : " + stat.isBlockDevice()); // 是否块设备
   console.log("stat -> isCharacterDevice : " + stat.isCharacterDevice()); // 是否字符设备
   console.log("stat -> isSymbolicLink : " + stat.isSymbolicLink()); // 是否软链接
   console.log("stat -> isFIFO : " + stat.isFIFO()); // 是否FIFO
   console.log("stat -> isSocket : " + stat.isSocket()); // 是否Socket
   console.log("stat -> size : " + stat.size); // 文件大小
   console.log("stat -> ctime : " + stat.ctime); // 创建时间
   console.log("stat -> mtime : " + stat.mtime); // 修改时间
   console.log("stat -> atime : " + stat.atime); // 访问时间
});


// 查看文件与目录的是否存在
//fs.exists(path, callback);
/**
 * path, 要查看目录/文件的完整路径及名；
 * [callback(exists)], 操作完成回调函数；exists [true存在，false表示不存在]
 */
fs.exists(__dirname + '/../files/a.txt', function (exists) {
    var retTxt = exists ? retTxt = '文件存在' : '文件不存在';
    console.log(retTxt);
});


// 修改文件访问时间与修改时间
//fs.utimes(path, atime, mtime, callback);
/**
 * path, 要查看目录/文件的完整路径及名；
 * atime, 新的访问时间
 * mtime, 新的修改时间
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */
// fs.utimes(__dirname + '../files/a.txt', new Date(), new Date(), function (err) {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     fs.stat(__dirname + '/../files/a.txt', function (err, stat) {
//         console.log('访问时间: ' + stat.atime.toString() + '; \n修改时间：' + stat.mtime);
//         console.log(stat.mode);
//     })
// });


// 修改文件或目录的操作权限
//fs.utimes(path, mode, callback);
/**
 * path, 要查看目录/文件的完整路径及名；
 * mode, 指定权限，如：0666 8进制，权限：所有用户可读、写，
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */
// fs.chmod(__dirname + '/../files/fsDir',0o666, function (err) {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log('修改权限成功')
// });


// 移动/重命名文件或目录
//fs.rename(oldPath, newPath, callback);
/**
 * oldPath, 原目录/文件的完整路径及名；
 * newPath, 新目录/文件的完整路径及名；如果新路径与原路径相同，而只文件名不同，则是重命名
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */
// fs.rename(__dirname + '/../files/fs_write.txt', __dirname + '/../files/fs_write_rename.txt', function (err) {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     console.log('重命名成功');
// });


// 删除空目录
//fs.rmdir(path, callback);
/**
 * path, 目录的完整路径及目录名；
 * [callback(err)], 操作完成回调函数；err操作失败对象
 */
// fs.rmdir(__dirname + '/../files/fsDir', function (err) {
//     if(err) {
//         console.log('删除空目录失败，可能原因：1、目录不存在，2、目录不为空')
//         console.error(err);
//         return;
//     }
//     console.log('删除空目录成功!');
// });


// 监视文件
//对文件进行监视，并且在监视到文件被修改时执行处理
//fs.watchFile(filename, [options], listener);
/**
 * filename, 完整路径及文件名；
 * [options], persistent true表示持续监视，不退出程序；interval 单位毫秒，表示每隔多少毫秒监视一次文件
 * listener, 文件发生变化时回调，有两个参数：curr为一个fs.Stat对象，被修改后文件，prev,一个fs.Stat对象，表示修改前对象
 */
// fs.watchFile(__dirname + '/../files/fs_write.txt', {interval: 20}, function (curr, prev) {
//     if(Date.parse(prev.ctime) == 0) {
//         console.log('文件被创建!');
//     } else if(Date.parse(curr.ctime) == 0) {
//         console.log('文件被删除!')
//     } else if(Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
//         console.log('文件有修改');
//     }
// });
// fs.watchFile(__dirname + '/../files/fs_write.txt', function (curr, prev) {
//     console.log('这是第二个watch,监视到文件有修改');
// });


// 取消监视文件
//取消对文件进行监视
//fs.unwatchFile(filename, [listener]);
/**
 * filename, 完整路径及文件名；
 * [listener], 要取消的监听器事件，如果不指定，则取消所有监听处理事件
 */
// var listener = function (curr, prev) {
//     console.log('我是监视函数')
// };
// fs.unwatchFile(__dirname + '/../files/fs_write.txt', listener);


// 监视文件或目录
// 对文件或目录进行监视，并且在监视到修改时执行处理；
// fs.watch返回一个fs.FSWatcher对象，拥有一个close方法，用于停止watch操作；
// 当fs.watch有文件变化时，会触发fs.FSWatcher对象的change(err, filename)事件，err错误对象，filename发生变化的文件名
// fs.watch(filename, [options], [listener]);
/**
 * filename, 完整路径及文件名或目录名；
 * [listener(event, filename], 监听器事件，有两个参数：event 为rename表示指定的文件或目录中有重命名、删除或移动操作或change表示有修改，filename表示发生变化的文件路径
 */
// var fsWatcher = fs.watch(__dirname + '/../files/fs_write.txt', function (event, filename) {
//     //console.log(event)
// });
// //console.log(fsWatcher instanceof FSWatcher);
// fsWatcher.on('change', function (event, filename) {
//     console.log(filename + ' 发生变化')
// });
// //30秒后关闭监视
// setTimeout(function () {
//     console.log('关闭');
//     fsWatcher.close(function (err) {
//         if(err) {
//             console.error(err)
//         }
//         console.log('关闭watch')
//     });
// }, 30000);