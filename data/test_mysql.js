// Node.js 连接 MySQL
// 数据库：websites.sql
// 安装驱动：cnpm install mysql --save

const mysql = require('mysql');

// 连接数据库
var connection = mysql.createConnection({
    host            : 'localhost',      // 主机地址 （默认：localhost）
    port            : 3306,             // 端口号 （默认：3306）
    user            : 'root',           // 用户
    password        : 'root',           // 密码
    database        : 'test',           // 数据库
    charset         : 'UTF8_GENERAL_CI',// 连接字符集（默认：'UTF8_GENERAL_CI'，注意字符集的字母都要大写）
    connectTimeout  : 50000,            // 连接超时（默认：不限制；单位：毫秒）
    typeCast        : true,             // 是否将列值转化为本地JavaScript类型值 （默认：true）
    supportBigNumbers: true,            // 数据库支持bigint或decimal类型列时，需要设此option为true （默认：false）
    bigNumberStrings: true,             // supportBigNumbers和bigNumberStrings启用 强制bigint或decimal列以JavaScript字符串类型返回（默认：false）
    dateStrings     : false,            // 强制timestamp,datetime,data类型以字符串类型返回，而不是JavaScript Date类型（默认：false）
    debug           : false,            // 开启调试（默认：false）
    multipleStatements:true,            // 是否许一个query中有多个MySQL语句 （默认：false）
});

connection.connect();

// 获取MySQL版本信息
connection.query('SELECT VERSION() as version', function (error, result, fields) {
    if (error){
        throw error;
    }
    console.log('MySQL Version is ：' + result[0].version);
});


// 数据库操作( CURD )
// 查询数据
var sql = 'select * from websites';
connection.query(sql, function (error, result) {
   if (error){
       console.error('[SELECT ERROR] - ', error.message);
       return;
   }
   console.log('--------------------------SELECT----------------------------');
   console.log(result);
   console.log('------------------------------------------------------------\n\n');
});

// 插入数据
sql = 'insert into websites values(0,?,?,?,?)'; // 占位符
var sqlParams = ['码云', 'https://gitee.com', '23453', 'CN'];

connection.query(sql, sqlParams, function (error, result) {
    if (error){
        console.error('[INSERT ERROR] - ', error.message);
        return;
    }
    console.log('--------------------------INSERT----------------------------');
    console.log('新增影响行数：' + result.affectedRows);
    console.log('新增返回主键：' + result.insertId);
    console.log('------------------------------------------------------------\n\n');
});

// 更新数据
sql = 'update websites set name=?, url=? where name like ?';
sqlParams = ['@码云', 'gitee.com', '%码%'];

connection.query(sql, sqlParams, function (error, result) {
    if (error){
        console.error('[UPDATE ERROR] - ', error.message);
        return;
    }
    console.log('--------------------------UPDATE----------------------------');
    console.log('更新影响行数：' + result.affectedRows);
    console.log('------------------------------------------------------------\n\n');
});

// 删除数据
sql = 'delete from websites where country = ?';
sqlParams = ['USA'];

connection.query(sql, sqlParams, function (error, result) {
    if (error){
        console.error('[DELETE ERROR] - ', error.message);
        return;
    }
    console.log('--------------------------DELETE----------------------------');
    console.log('删除影响行数：' + result.affectedRows);
    console.log('------------------------------------------------------------\n\n');
});

connection.end();