// 初始化数据库
// Sequelize提供了一个sync()方法，可以自动创建数据库。

const model = require('./model.js');
model.sync();

console.log('init db ok.');

// 由于是异步操作，不能立刻关闭程序，所以10秒后关闭
setTimeout(() => {
    console.log('初始化数据库完成...');
    process.exit(0);
}, 10000);