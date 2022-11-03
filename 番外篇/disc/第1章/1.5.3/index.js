/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第1章\1.5.3\index.js
/**
 * 父类：鸟
 */
class Bird {
  constructor() {
    this.name = "鸟类"
  }
  speak() {
    console.log(`${this.name}：关关雎鸠`)
  }
}
/**
 * 子类：鸡
 */
class Chicken extends Bird {
  constructor() {
    super()
    this.name = "鸡"
  }
  speak() {
    console.log(`${this.name}：咯咯咯`)
  }
}
/**
 * 子类：鸭
 */
class Duck extends Bird {
  constructor() {
    super()
    this.name = "鸭"
  }
  speak() {
    console.log(`${this.name}：嘎嘎嘎`)
  }
}
let a = new Bird()
a = new Duck()
a.speak() 
a = new Chicken()
a.speak() 
// 输出：
// 鸭：嘎嘎嘎
// 鸡：咯咯咯

function makeBirdPlay(bird){ // bird is instance of Bird
	if (bird instanceof Chicken) bird.speak()
}
makeBirdPlay(a) // Outut：鸡：咯咯咯