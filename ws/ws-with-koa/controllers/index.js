// 首页

module.exports = {
    'GET /': async (ctx, next) => {
        let user = ctx.state.user;
        if (user) {
            ctx.render('room.html', {
                user: user
            });
        } else {
            // 重定向
            ctx.response.redirect('/signin');
        }
    }
};