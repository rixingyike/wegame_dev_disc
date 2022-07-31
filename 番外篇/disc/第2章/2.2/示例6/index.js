// JS：第2章\2.2\示例6\index.js
class User {
  constructor(options) {
    this.name = options.name
    this.pages = options.pages
  }

  name
  pages

  login() {
    console.log(`${this.name} login..\n`);
  }
}

class Authention {
  getUserWithRole() {
    return new User({})
  }
}

class WarehouseAdminAuthention extends Authention {
  // 重写父类方法
  getUserWithRole() {
    return new User({ name: "仓库管理员", pages: ["首页", "应用数据"] })
  }
}

class SuperAdminAuthention extends Authention {
  getUserWithRole() {
    return new User({ name: "超级管理员", pages: ["首页", "发现页", "应用数据", "权限管理"] })
  }
}

class AdminAuthention extends Authention {
  getUserWithRole() {
    return new User({ name: "管理员", pages: ["首页", "发现页", "应用数据"] })
  }
}

class UserAuthention extends Authention {
  getUserWithRole() {
    return new User({ name: "普通用户", pages: ["首页", "发现页"] })
  }
}

// 消费代码
function login(authention) {
  const admin = authention.getUserWithRole()
  admin.login()
}
login(new WarehouseAdminAuthention())
login(new SuperAdminAuthention())
login(new AdminAuthention())
login(new UserAuthention())