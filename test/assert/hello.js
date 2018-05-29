module.exports = {
    // 求和函数， ... 表示可变参数
    sum: function (...rest) {
        var sum = 0;
        for (let n of rest){
            sum += n;
        }
        return sum;
    }
};