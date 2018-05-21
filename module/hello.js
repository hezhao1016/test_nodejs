function Hello(){
    var name;
    this.setName = function (thyName){
        name = thyName;
    };
    this.sayHello = function (){
        console.log("Hello, "+ name);
    };
};

// 把Hello对象作为模块的输出暴露出去
module.exports = Hello;
