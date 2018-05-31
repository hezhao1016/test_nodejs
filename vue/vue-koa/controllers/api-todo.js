const todos = require('../services/todos');

const APIError = require('../rest').APIError;

module.exports = {
    /**
     * 返回所有TODO列表
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     * @constructor
     */
    'GET /api/todos': async (ctx, next) => {
        ctx.rest({
            todos: todos.getTodos()
        });
    },

    /**
     * 创建一个新的TODO，并返回创建后的对象
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     * @constructor
     */
    'POST /api/todos': async (ctx, next) => {
        var t = ctx.request.body;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }

        var todo = new todos.Todo(null, t.name.trim(), t.description.trim());
        todo = todos.createTodo(todo);
        ctx.rest(todo);
    },

    /**
     * 更新一个TODO，并返回更新后的对象
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     * @constructor
     */
    'PUT /api/todos/:id': async (ctx, next) => {
        var t = ctx.request.body;
        if (!t.name || !t.name.trim()) {
            throw new APIError('invalid_input', 'Missing name');
        }
        if (!t.description || !t.description.trim()) {
            throw new APIError('invalid_input', 'Missing description');
        }

        var todo = new todos.Todo(ctx.params.id, t.name.trim(), t.description.trim());
        try {
            todo = todos.updateTodo(todo);
            ctx.rest(todo);
        } catch (e) {
            throw e;
        }
    },

    /**
     * 删除一个TODO
     * @param ctx
     * @param next
     * @returns {Promise<void>}
     * @constructor
     */
    'DELETE /api/todos/:id': async (ctx, next) => {
        console.log(`delete todo ${ctx.params.id}...`);
        try {
            var todo = todos.deleteTodo(ctx.params.id);
            ctx.rest(todo);
        } catch (e) {
            throw e;
        }
    }
};
