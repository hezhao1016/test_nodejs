// 使用ORM框架Sequelize
// $ cnpm install mysql2 --save
// $ cnpm install sequelize --save

const Sequelize = require('sequelize');
const config = require('./config');

// 创建Sequelize对象
const sequelize = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

// 定义模型，传入名称pet，默认的表名就是pets
var Pet = sequelize.define('pet', {
    id: {
        type: Sequelize.INTEGER, // 字段类型
        primaryKey: true, // 是否主键
        unique : true, // 是否唯一
        autoIncrement : true, // 自动增长
        comment: '主键' // 注释
    },
    name: Sequelize.STRING(100),
    gender: Sequelize.BOOLEAN,
    birth: Sequelize.STRING(10),
    createdAt: {
        type: Sequelize.DATE,
        defaultValue : Sequelize.NOW // 默认值
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue : Sequelize.NOW
    },
    version: {
        type: Sequelize.BIGINT,
        allowNull: false // 是否允许为空
    }
}, {
    timestamps: false, // 关闭Sequelize的自动添加timestamp的功能(sequelize默认生成两个字段，createdAt和updatedAt表示新增时间修改时间)
    // tableName: 'pets' // 自定义表名
});


////// 插入数据
var now = new Date();

// 1.用Promise的方式写
// Pet.create({
//     name: 'Gaffey',
//     gender: false,
//     birth: '2007-07-07',
//     createdAt: now,
//     updatedAt: now,
//     version: 0
// }).then(function (obj) {
//     // 操作成功
//     console.log(`created by Promise:${JSON.stringify(obj)}`);
// }).catch(function (err) {
//     // 操作失败
//     console.error(`Error:${err}`);
// });

// 2.用await的方式写
// await只有一个限制，就是必须在async函数中调用。
// (async () => {
//     var dog = await Pet.create({
//         name: 'Odie',
//         gender: false,
//         birth: '2008-08-08',
//         createdAt: now,
//         updatedAt: now,
//         version: 0
//     });
//     console.log(`created by await:${JSON.stringify(dog)}`);
// })();


//// 更新数据
// Pet.update({version : 100}, {where: {id: 1}}).then(function (count) {
//     console.log(`updated by Promise 影响行数:${count}`);
// }).catch(function (err) {
//     console.error(`Error:${err}`);
// });

// (async () => {
//     var pets = await Pet.findAll({where: {id: 1}});
//     if(pets != null && pets.length > 0){
//         var p = pets[0];
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version ++;
//         await p.save();
//         console.log(`${p.name} was saved.`);
//     }
// })();


////// 删除数据
// Pet.destroy({where: {id: 11}}).then(function (count) {
//     console.log(`destroyed by Promise 影响行数::${count}`);
// }).catch(function (err) {
//     console.error(`Error:${err}`);
// });

// (async () => {
//     var count = await Pet.destroy({where: {id: 1}});
//     if (count == 1){
//         console.log('id 为 1 的 pet 删除成功');
//     } else {
//         console.log('id 为 1 的 pet 删除失败');
//     }
// })();


//////查询数据
Pet.findAll({
        where: {name: 'Gaffey'},
        offset: 0,limit: 10 // 分页
    },
    {raw : true, logging : true, plain : false
}).then(function (pets) {
    console.log('---------------------SELECT---------------------');
    console.log(`find ${pets.length} pets:`);
    for (let p of pets) {
        console.log(JSON.stringify(p));
    }
    console.log('------------------------------------------------');
}).catch(function (err) {
    console.error(`Error:${err}`);
});

// (async () => {
//     var pets = await Pet.findAll({
//         where: {
//             name: 'Gaffey'
//         }
//     });
//     console.log('---------------------SELECT---------------------');
//     console.log(`find ${pets.length} pets:`);
//     for (let p of pets) {
//         console.log(JSON.stringify(p));
//
//         console.log('update pet...');
//         p.gender = true;
//         p.updatedAt = Date.now();
//         p.version ++;
//         // 更新数据
//         await p.save();
//         if (p.version === 3) {
//             // 删除数据
//             await p.destroy();
//             console.log(`${p.name} was destroyed.`);
//         }
//     }
//     console.log('------------------------------------------------');
// })();


////// count
// Pet.count({where : {name : 'Gaffey'}}, {logging : true}).then(function (count) {
//     console.log(`count:${count}`);
// }).catch(function (err) {
//     console.error(`Error:${err}`);
// });

(async () => {
    var count = await Pet.count({where : {name : 'Gaffey'}}, {logging : true});
    console.log(`count:${count}`);
})();


////// max or min
// Pet.max('id').then(function (max) {
//     console.log(`max:${max}`);
// }).catch(function (err) {
//     console.error(`Error:${err}`);
// });

(async () => {
    var max = await Pet.max('id');
    console.log(`max:${max}`);
})();
