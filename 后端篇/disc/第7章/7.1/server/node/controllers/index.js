// JS：controllers\index.js
"use strict"
import model from "../models/index.js"

export default {
  // 启动web服务后，该url能访问，证明启动成功
  "GET /": async (ctx, next) => {
    const title = "主页"
    ctx.render("index", { title, path: ctx.request.path })
  }

  // 帮助页
  // , "GET /help": async (ctx, next) => {
  //   const title = "帮助页"
  //   ctx.render("help", { title, path: ctx.request.path })
  // }
}