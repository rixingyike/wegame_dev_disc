// JS：disc\第6章\6.2\6.2.9\b.js
console.log("b started")
exports.done = false
const a = require("./a.js") // b又导入了a.js
console.log("in b, a.done =", a.done)
exports.done = true
console.log("b done")