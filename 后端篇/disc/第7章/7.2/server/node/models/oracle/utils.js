"use strict"
export default {
  // model操作方法：
  // model.insert
  // model.update
  // model.upsert
  // model.save
  // activity.identity()返回操作的实体记录的主键，一般为id

  /**
   * 执行sql，返回Promise对象
   * <pre>参数示例："select * from people where name = @name", {name: "Bob"}</pre>
   * 返回的是原生数据，可能不适合直接消费，示例：
   * <pre>[RowDataPacket { id: 4, num: 2147483647, tag: "tag1" }]</pre>
   * @param {*} dbOrModel 已经连接的数据库对象或model对象
   * @param {*} sql SQL语句
   * @param {*} params 参数
   * @returns {Promise} 执行结果
   */
  query: (dbOrModel, sql, params) => {
    return new Promise((resolve, reject) => {
      dbOrModel.query(sql, params).then(res => {
        resolve(res)
      })
    })
  },

  /**
   * 通过db执行sql
   * 返回的是模型结构，是一个数组，如果找到返回空数组，适合消费
   * @param {*} db 
   * @param {*} sql 
   * @param {*} params 
   * @returns {*} <pre>示例：[ { id: 3, num: 2147483647, tag: "tag300" } ]</pre>
   */
  execute: (db, sql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params).then(res => {
        resolve(res)
      })
    })
  },

  /**
   * 执行存储过程
   * <pre>参数示例："myProcName @param1, @param2", {param1: "a", param2: "b"}</pre>
   * @param {*} db 已经连接的数据库对象
   * @param {*} procedureSql 存储过程SQL
   * @param {*} params 执行存储过程所需要的参数
   * @returns {Promise} 一个Promise对象
   */
  executeProcedure: (db, procedureSql, params) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params).then(res => {
        resolve(res)
      })
    })
  }
}