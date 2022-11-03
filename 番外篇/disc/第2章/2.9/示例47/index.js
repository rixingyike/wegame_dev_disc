/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.9\示例47\index.js
/** 在对象外部设置一个属性过滤器，控制对象内部属性的访问和设置 */
function createPrivateObject(obj, filter) {
  return new Proxy(obj, {
    // 属性读取操作
    get(obj, prop) {
      if (!filter(prop)) {
        return Reflect.get(obj, prop)
      } else {
        return undefined
      }
    },
    // 属性设置操作
    set(obj, prop, value) {
      if (!filter(prop)) {
        // 如果是方法, 将this指向原对象        
        if (typeof value === "function") {
          return value.bind(obj);
        }
        return Reflect.set(obj, prop, value)
      } else {
        console.log(`不能设置 ${prop} 为 ${value}`)
        return false
      }
    },
    // in 操作符的捕捉器
    has(obj, prop) {
      if (!filter(prop)) {
        return Reflect.has(obj, prop)
      }
      return false
    },
    // 删除操作符的捕捉
    deleteProperty(target, prop) {
      if (!filter(prop)) {
        return Reflect.defineProperty(obj, prop)
      } else {
        console.log(`不能删除属性 ${prop}`);
        return false
      }
    },
    // Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器
    ownKeys(obj) {
      return Reflect.ownKeys(obj).filter(prop => !filter(prop))
    }
  })
}
// 测试代码一
const obj = {
  name: "小游戏",
  location: "Beijing",
  [`#job`]: "Programmer",
  _salary: "3k",
  _age: 3
}
for (const prop in obj) {
  console.log(`${prop}：${obj[prop]}`)
}
console.log("keys", Object.getOwnPropertyNames(obj))
// 测试代码二
const proxyObj = createPrivateObject(obj, prop => {
  // 以"_"开头的属性，将作为私有属性过滤掉
  return prop.startsWith("_")
})
console.log("访问_age", proxyObj.name, proxyObj._age) // 输出：undefined
proxyObj.name = "小程序"
// proxyObj._age = 4 // 异常：不能设置 _age 为 4
console.log("访问_age", proxyObj.name, proxyObj._age) // 输出：undefined
// delete proxyObj._age // 异常：不能删除属性 _age
for (const prop in proxyObj) {
  console.log(`${prop}：${proxyObj[prop]}`)
}
console.log("keys", Object.getOwnPropertyNames(proxyObj))