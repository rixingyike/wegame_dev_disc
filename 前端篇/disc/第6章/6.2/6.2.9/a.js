// JS：disc\第6章\6.2\6.2.9\a.js
console.log("a started")
exports.done = false
const b = require("./b.js") // 导入了b.js
console.log("in a, b.done =", b.done)
exports.done = true
console.log("a done")