"use strict"
const sworm = require("sworm")

const config = {
  driver: "oracle",
  config: {
    user: "JSL",
    password: "fawccr",
    connectString: "10.228.141.253/orcl",
    pool: true,
    options: {
      maxRows: 5000
    }
  }
}
const db = sworm.db(config)

/**
 * 连接数据库的方法
 * 定义model不需要执行connect，直接使用unconected的db就可以
 * @returns {*} db
 */
export function connect() {
  return new Promise((resolve, reject) => {
    // 在数据库连接完成后，
    // 可以通过db.driver.connection访问底层驱动程序的连接
    // db在模块中是单例的，不需要显式关闭，
    // 但是已经连接的，没有关闭的连接，可以直接使用
    if (db.driver?.connection) {
      resolve(db)
      return
    } 
    db.connect(config).then(() => {
      resolve(db)
    })
  })
}

// 未连接的数据库连接对象
export const unconected = db