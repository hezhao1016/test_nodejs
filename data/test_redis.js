// Node.js 连接 Redis
// 安装驱动：$ cnpm install redis --save

// 连接到redis服务器
const redis = require('redis'),
    RDS_PORT = 6379,            //端口号
    RDS_HOST = '127.0.1.1',     //服务器IP
    RDS_OPTS = {},              //设置项
    client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

// redis 初始化完成
client.on('ready',function(res){
    console.log('redis is ready!');
});

// redis 连接错误
client.on("error", function(error) {
    console.error(error);
});

// 切换到数据库
client.select(15, function (error) {
    if (error) return console.error(error);
    console.log("切换到 15 数据库!");
});


client.on('connect',function(){
    console.log('redis is connect!');

    // 字符串 单值读取
    client.set('author', 'Wilson',redis.print);
    client.get('author', redis.print);

    // 哈希 多值存取
    client.hmset('short', {'js':'javascript','C#':'C Sharp'}, redis.print);
    client.hmset('short', 'SQL','Structured Query Language','HTML','HyperText Mark-up Language', redis.print);

    client.hgetall("short", function(error, res){
        if (error) return console.error('Error:'+ error);
        console.dir(res);
    });
});
