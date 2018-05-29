// 把hello.js改造为异步函数

const fs = require('mz/fs');

module.exports = {
    // 通过读取data.txt的内容获取表达式，这样它就变成了异步
    readData: async () => {
        let expression = await fs.readFile('./data.txt', 'utf-8');
        let fn = new Function('return ' + expression);
        let r = fn();
        console.log(`Calculate: ${expression} = ${r}`);
        return r;
    }
};