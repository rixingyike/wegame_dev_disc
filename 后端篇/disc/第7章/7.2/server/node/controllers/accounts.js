// JS：controllers\accounts.js
"use strict"
import model from "../models/index.js"

// 无论是返回JSON文本，还是HTML文本，
// 都是一样的，只是渲染不同
export default {
  // 登录页面
  "GET /login": async (ctx, next) => {
    const title = "登录"
    ctx.render("accounts/login", { title })
  },

  // 获取已登录用户对象
  "GET /logon": async (ctx, next) => {
    ctx.status = 200
    ctx.body = ctx.session.user
  },

  // 接收登录的post请求
  "POST /login": async (ctx, next) => {
    const { name, passwd } = ctx.request.body
      , db = await model.connect()
    // 如果密码有加密，在查询前将passwd加密，再查询
    const res = await model.execute(db, "select * from account where name=@name && passwd=@passwd limit 1", { name, passwd })
    if (res.length > 0) {
      // role: assistant、administrator
      const u = res[0]
      ctx.session.user = { id: u.id, name: u.name, role: u.role }
      ctx.redirect("/", 302) // 登录后重定向到首页
    } else {
      ctx.render("login", { title: "登录", errMsg: "登录失败，请重试" })
    }
  },

  // 登出
  "GET /logout": async (ctx, next) => {
    ctx.session.user = null
    ctx.redirect("/accounts/login")
  },
}