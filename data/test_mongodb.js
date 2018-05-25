// Node.js 连接 MongoDB
// MongoDB是一种文档导向数据库管理系统，由C++撰写而成。
// 安装驱动：cnpm install mongodb --save

const mongodb = require('mongodb');

// 创建数据库
// 要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，然后配置好指定的 URL 和 端口号。
// 如果数据库不存在，MongoDB 将创建数据库并建立连接。
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';

// 链接数据库
/*MongoClient.connect(url, function (error, db) {
   if (error) throw error;
   console.log("数据库已创建！");
    // 关闭数据库
   db.close();
});*/

// 创建集合
/*MongoClient.connect(url, function (error, db) {
    if (error) throw error;
    console.log("数据库已创建！");

    var dbo = db.db('test');
    dbo.createCollection('site', function (error, res) {
        if (error) throw error;
        console.log("创建集合成功!");
        db.close();
    });
});*/


// 数据库操作( CURD )
// 与 MySQL 不同的是 MongoDB 会自动创建数据库和集合，所以使用前我们不需要手动去创建。

//插入单条数据
/*MongoClient.connect(url, function (error, db) {
    if (error)  throw error;
    var dbo = db.db('test');
    var myobj = { name:'菜鸟教程', url:'www.ruboob.com'};
    dbo.collection('site').insertOne(myobj, function (error, res) {
       if (error) throw error;
       console.log("文档插入成功!");
       db.close();
    });
});*/

//插入多条数据
/*MongoClient.connect(url, function (error, db) {
    if (error)  throw error;
    var dbo = db.db('test');
    var list = [
        { name:'Google', url:'https://www.google.com', type:'en', sort: 100},
        { name:'FaceBook', url:'https://www.facebook.com', type:'en', sort: 50},
        { name:'Baidu', url:'https://www.baidu.com', type:'cn', sort: 150},
        { name:'Sohu', url:'http://www.sohu.com', type:'cn', sort: 250},
        { name:'Weibo', url:'http://www.weibo.com', type:'cn', sort: 350}
    ];
    dbo.collection('site').insertMany(list, function (error, res) {
        if (error) throw error;
        console.log("文档插入成功!一共插入了["+ res.insertedCount +"]条数据");
        db.close();
    });
});*/


//更新单条数据
/*MongoClient.connect(url, function (error, db) {
    if (error)  throw error;
    var dbo = db.db('test');
    var whereStr = { "name": "Sohu" };
    var updateStr = { $set: { "url": "http://sohu.com" } };
    dbo.collection('site').updateOne(whereStr, updateStr, function (error, res) {
        if (error) throw error;
        console.log("文档更新成功!");
        db.close();
    });
});*/

// 更新多条数据
/*MongoClient.connect(url, function (error, db) {
    if (error)  throw error;
    var dbo = db.db('test');
    var whereStr = { "type": "en" };
    var updateStr = { $set: { "url": "http://sohux.com" } };
    dbo.collection('site').updateMany(whereStr, updateStr, function (error, res) {
        if (error) throw error;
        console.log(res.result.nModified + " 条文档被更新!");
        db.close();
    });
});*/


// 删除单条数据
/*MongoClient.connect(url, function(error, db) {
    if (error) throw error;
    var dbo = db.db("test");
    // mongodb默认区分大小写，这样可以忽略大小写
    var whereStr = { "name": { $regex: 'sohu', $options:'i' } };
    dbo.collection("site").deleteOne(whereStr, function(error, res) {
        if (error) throw error;
        console.log("文档删除成功");
        db.close();
    });
});*/

// 删除多条数据
/*MongoClient.connect(url, function(error, db) {
    if (error) throw error;
    var dbo = db.db("test");
    var whereStr = { type: "en" };
    dbo.collection("site").deleteMany(whereStr, function(error, res) {
        if (error) throw error;
        console.log(res.result.n + " 条文档被删除！");
        db.close();
    });
});*/


// 查询数据
// 使用 find() 来查找数据, find() 可以返回匹配条件的所有数据。 如果未指定条件，find() 返回集合中的所有数据。
MongoClient.connect(url, function (error, db) {
    if (error)  throw error;
    var dbo = db.db('test');

    // 查询所有
    // dbo.collection('site').find({}).toArray(function (error, result) {
    //     if (error) throw error;
    //     console.log('--------------------------SELECT All----------------------------');
    //     console.log(result);
    //     console.log('------------------------------------------------------------\n\n');
    //     db.close();
    // });

    // 根据条件查询
    /*var whereStr = { "type": "cn" }; // 类似于：where type = 'cn'
    // var whereStr = { "sort": { $gte: 150 } }; // 类似于：where sort >= 150
    // var whereStr = { "type": "cn", "url": /https/ }; // 类似于：where type='cn' and url like '%https%'
    // var whereStr = { $or:[{"sort": { $gt: 200 }}, {"type": "en"}]}; // 类似于：where sort > 200 or type = 'en'
    // var whereStr = {"url": /https/, $or:[{"sort": { $gt: 200 }}, {"type": "en"}]}; // 类似于：where url like '%https%' and (sort > 200 or type = 'en')

    dbo.collection('site').find(whereStr).toArray(function (error, result) {
        if (error) throw error;
        console.log('--------------------------SELECT By Where----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        db.close();
    });*/

    // 分页查询
    /*var page = 1; // 第一页
    var rows = 2; // 一页显示两条
    var query = dbo.collection('site').find({});
    query.skip((page-1) * rows); // 跳过几条数据
    query.limit(rows); // 读取前几条数据
    query.toArray(function (error, result) {
        if (error) throw error;
        console.log('--------------------------SELECT LIMIT Skip----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        db.close();
    });*/

    // 排序 使用 sort() 方法，该方法接受一个参数，规定是升序(1)还是降序(-1)。
    var sortStr = { sort: -1 }; // 按照sort字段倒序
    dbo.collection('site').find().sort(sortStr).toArray(function (error, result) {
        if (error) throw error;
        console.log('--------------------------SELECT Sort----------------------------');
        console.log(result);
        console.log('------------------------------------------------------------\n\n');
        db.close();
    });

});


// 删除集合
/*MongoClient.connect(url, function(error, db) {
    if (error) throw error;
    var dbo = db.db("test");
    // 删除 test 集合
    dbo.collection("site").drop(function(error, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (error) throw error;
        if (delOK) console.log("site 集合已删除");
        db.close();
    });
});*/