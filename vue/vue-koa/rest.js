module.exports = {
    // 错误对象
    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify: (pathPrefix) => {
        // REST API必须使用前缀 /api/
        pathPrefix = pathPrefix || '/api/';

        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                console.log(`Process API ${ctx.request.method} ${ctx.request.url}...`);

                // 给ctx添加一个rest()方法，直接输出JSON数据
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                };
                try {
                    await next();
                } catch (e) {
                    // 返回错误
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';

                    // 统一定义错误码
                    ctx.response.body = {
                        code: e.code || 'internal:unknown_error',
                        message: e.message || ''
                    };
                }
            } else {

                // 非REST请求，予以放行
                await next();
            }
        };
    }
};
