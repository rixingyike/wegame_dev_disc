/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第1章\1.4.4\index.js
import LinkedList from "./linked_list.js"
const linkedList = new LinkedList()
linkedList.append(2)
linkedList.append(6)
linkedList.append(24)
linkedList.append(152)
linkedList.insertAt(3, 18)
linkedList.print() // 输出： 2 6 24 18 152