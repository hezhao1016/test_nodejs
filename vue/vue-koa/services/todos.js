const APIError = require('../rest').APIError;

var id = 0;

function nextId() {
    id++;
    return 'todo' + id;
}

function Todo(id, name, description) {
    if(!id){
        id = nextId();
    }
    this.id = id;
    this.name = name;
    this.description = description;
}

var todos = [
    new Todo(null, '产品评审', '新款iPhone上市前评审'),
    new Todo(null, '开发计划', '与PM确定下一版Android开发计划'),
    new Todo(null, 'VC会议', '敲定C轮5000万美元融资'),
];

function findIndexById(id){
    var index = -1,
        i;
    for (i = 0; i < todos.length; i++) {
        if (todos[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}

module.exports = {
    Todo: Todo,

    getTodos: () => {
        return todos;
    },

    getTodo: (id) => {
        var index = findIndexById(id);

        if (index >= 0) {
            return todos[index];
        }
        return null;
    },

    createTodo: (todo) => {
        todos.push(todo);
        return todo;
    },

    updateTodo: (todo) => {
        var index = findIndexById(todo.id);

        if (index >= 0) {
            todos[index] = todo;
            return todo;
        }else{
            throw new APIError('todo:not_found', 'todo not found by id.');
        }
    },

    deleteTodo: (id) => {
        var index = findIndexById(id);

        if (index >= 0) {
            // remove products[index]:
            return todos.splice(index, 1)[0];
        }else{
            throw new APIError('todo:not_found', 'todo not found by id.');
        }
    }
};
