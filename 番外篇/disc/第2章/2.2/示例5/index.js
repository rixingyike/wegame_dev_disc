/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.2\示例5\index.js
class User {
  // 示例5：一个创建User对象的静态方法，简单工厂模式
  static getUserWithRole(role) {
    let user
    switch (role) {
      case "superAdmin":
        user = new User({ name: "超级管理员", pages: ["首页", "发现页", "应用数据", "权限管理"] })
        break
      case "admin":
        user = new User({ name: "管理员", pages: ["首页", "发现页", "应用数据"] })
        break
      case "user":
        user = new User({ name: "普通用户", pages: ["首页", "发现页"] })
        break
      default:
        throw new Error("参数错误, 可选参数:superAdmin、admin、user")
    }
    return user
  }

  constructor(options) {
    this.name = options.name
    this.pages = options.pages
  }

  name
  pages
}

// 消费代码
const superAdmin = User.getUserWithRole("superAdmin")
  , admin = User.getUserWithRole("admin")
  , normalUser = User.getUserWithRole("user")
console.log(superAdmin, admin, normalUser)

// 输出
// User { name: '超级管理员', pages: [ '首页', '发现页', '应用数据', '权限管理' ] } 
// User { name: '管理员', pages: [ '首页', '发现页', '应用数据' ] } 
// User { name: '普通用户', pages: [ '首页', '发现页' ] }