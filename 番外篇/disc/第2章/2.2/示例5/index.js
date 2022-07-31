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