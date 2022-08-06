/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.7\示例33\index.js
/** 语法解释器 */
class ContextInterpreter {
  constructor() {
    this.stack = [];
  }
  // ++、--是文法，PlusExpression与MinusExpression是对应的表达式
  maps = {
    "++": new PlusExpression(),
    "--": new MinusExpression()
  }
  interpret(text) {
    let part = ""
    for (let j = 0; j < text.length; j++) {
      if (/\s/.test(text[j])) {
        if (part) this.stack.push(part)
        part = ""
        continue
      }
      part += text[j]
      const interpreterPart = this.maps[part]
      if (interpreterPart) {
        const result = interpreterPart.interpret(this.stack.pop())
        this.stack.push(result)
        part = ""
      }
    }
    return this.stack.pop()
  }
}
/** 递增表达式 */
class PlusExpression {
  interpret(target) {
    let num = Number.parseInt(target)
    return ++num
  }
}
/** 递减表达式 */
class MinusExpression {
  interpret(target) {
    let num = Number.parseInt(target)
    return --num
  }
}
// 消费代码
const context = new ContextInterpreter()
  , text = "100 ++ ++ ++ --"
console.log(`文本：${text}, 结果：${context.interpret(text)}`)