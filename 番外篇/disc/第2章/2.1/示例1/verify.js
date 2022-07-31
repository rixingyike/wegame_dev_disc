// JS：第2章\2.1\示例1\verify.js
const verify = (function (str, type) {
  const buildin = {
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    },
    mobile(str) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
    }
  }
  
  return {
    // 检验
    do(str, type) {
      return buildin[type] ? buildin[type](str) : false
    },
    // 添加新校验规则
    addRule(type, fn) {
      buildin[type] = fn
    }
  }
})()