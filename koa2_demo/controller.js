// 重构控制器
// 自动扫描controller目录，找到所有js文件，导入，然后注册每个URL

const fs = require('fs');
const path = require('path');

function addMapping(router, mapping) {
    for (var url in mapping) {
        // 如果url类似"GET xxx"
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            // 如果url类似"POST xxx"
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            // 无效的URL
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    // 扫描controllers目录,这里可以用sync是因为启动时只运行一次，不存在性能问题
    var files = fs.readdirSync(path.join(__dirname, dir));
    // 过滤出.js文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });

    // 处理每个js文件
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        // 导入js文件
        let mapping = require(path.join(__dirname, dir, f));
        addMapping(router, mapping);
    }
}

module.exports = function (dir) {
  let controller_dir = dir || 'controller', // 如果不传参数，扫描目录默认为'controller'
      router = require('koa-router')();
  addControllers(router, controller_dir);
  return router.routes;
};