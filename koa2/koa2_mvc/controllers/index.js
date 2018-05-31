// 首页
var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
};

module.exports = {
    'GET /': fn_index
};