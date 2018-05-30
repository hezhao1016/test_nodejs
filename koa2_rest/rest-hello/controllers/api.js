// 假数据
var products = [{
    name: 'iPhone X',
    price: 8888
}, {
    name: 'Xiao MI 6',
    price: 3555
}];

module.exports = {
    'GET /api/products': async (ctx, next) => {
        // 设置Content-Type为JSON
        ctx.response.type = 'application/json';
        // 设置Response Body，koa会自动把该对象序列化为JSON并输出到客户端。
        ctx.response.body = {
            products: products
        }
    },
    'POST /api/products': async (ctx, next) => {
        var p = {
            name: ctx.request.body.name,
            price: ctx.request.body.price
        };
        products.push(p);
        ctx.response.type = 'application/json';
        ctx.response.body = p;
    }
};


// Postman访问
// GET  http://localhost:3000/api/products
// POST http://localhost:3000/api/products?name=Xbox&price=3999