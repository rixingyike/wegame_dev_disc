// JS：disc\第6章\6.2\6.2.7\tools.js
const tools = {
  name: "Node.js",
  say: function () {
    return `Hi,${this.name}`
  }
}
// 暴露属性和方法
module.exports = tools
// 另一种暴露方式：
// exports.name = tools.name
// exports.say = tools.say