// JS：第2章\2.2\示例7\index.js
// 这是用户的抽象基类和子类
class AbstractUser {
  constructor() { }
  get name() {
    throw new Error("需要在子类中重写")
  }
  get pages() {
    throw new Error("需要在子类中重写")
  }
  login() {
    console.log(`${this.name} login..\n`)
  }
}
class WarehouseAdminUser extends AbstractUser {
  get name() {
    return "仓库管理员"
  }
  get pages() {
    return ["首页", "应用数据"]
  }
}
class SuperAdminUser extends AbstractUser {
  get name() {
    return "超级管理员"
  }
  get pages() {
    return ["首页", "发现页", "应用数据", "权限管理"]
  }
}
class AdminUser extends AbstractUser {
  get name() {
    return "管理员"
  }
  get pages() {
    return ["首页", "发现页", "应用数据"]
  }
}
class NormalUser extends AbstractUser {
  get name() {
    return "普通用户"
  }
  get pages() {
    return ["首页", "发现页"]
  }
}
// 以下是抽象工厂的基类和子类
class UserAbstractFactory {
  /**
   * @returns AbstractUser
   */
  getUserWithRole() {
    return new AbstractUser()
  }
}
class WarehouseAdminAbstractFactory extends UserAbstractFactory {
  // 重写父类方法
  getUserWithRole() {
    return new WarehouseAdminUser()
  }
}
class SuperAdminAbstractFactory extends UserAbstractFactory {
  getUserWithRole() {
    return new SuperAdminUser()
  }
}
class AdminAbstractFactory extends UserAbstractFactory {
  getUserWithRole() {
    return new AdminUser()
  }
}
class NormalUserAbstractFactory extends UserAbstractFactory {
  getUserWithRole() {
    return new NormalUser()
  }
}

// 消费代码
function login(factory) {
  const admin = factory.getUserWithRole()
  admin.login()
}
login(new WarehouseAdminAbstractFactory())
login(new SuperAdminAbstractFactory())
login(new AdminAbstractFactory())
login(new NormalUserAbstractFactory())