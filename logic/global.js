// global 全局变量
//     Buffer 类
//     __dirname
//     __filename
//     clearImmediate(immediateObject)
//     clearInterval(intervalObject)
//     clearTimeout(timeoutObject)
//     console
//     exports
//     global
//     module
//     process
//     require()
//     setImmediate(callback[, ...args])
//     setInterval(callback, delay[, ...args])
//     setTimeout(callback, delay[, ...args])
//     URL
//     URLSearchParams

// 全局变量在所有模块中均可使用。 以下变量虽然看起来像全局变量，但实际上不是。 它们的作用域只在模块内
// _dirname
// __filename
// exports
// module
// require()

console.log(__dirname);
console.log(__filename);