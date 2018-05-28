var fn_index = async (ctx, next) => {
    ctx.body = '<h1>Index</h1>';
};

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
    'GET /': fn_index,
    'GET /hello/:name': fn_hello
};