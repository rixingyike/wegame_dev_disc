// JS：middlewares.js
"use strict"
import render from "koa-art-template"
import htmlMinifier from "html-minifier"
import path from "path"
import serve from "koa-static-server"
import Koabody from "koa-body"
import session from "koa-session"
import cors from "koa2-cors"

/** 设置一般中间件 */
export default function setMiddlewares(app) {
  // 设置跨域设置
  app.use(cors({
    origin: "*",
    maxAge: 5,
    credentials: true,
    allowMethods: ["GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
    exposeHeaders: ["MINI-Authorization"] // 设置充许的自定义头信息字段
  }))

  // 解析post请求
  app.use(Koabody({
    multipart: true, // 支持文件上传
    strict: false, // 严格模式启用后不会解析 GET, HEAD, DELETE 请求
    formidable: {
      uploadDir: path.join(__dirname, "static/uploads"), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
      onFileBegin: (name, file) => { // 文件上传前的设置
        console.log(`name: ${name}`)
      }
    }
  }))

  // 设置静态目录
  app.use(serve({ rootDir: "static", rootPath: "/static" }))

  // 设置HTML模板引擎
  render(app, {
    root: path.join(__dirname, "./views"),
    minimize: true,
    htmlMinifier: htmlMinifier,
    htmlMinifierOptions: {
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      // 运行时自动合并：rules.map(rule => rule.test)
      ignoreCustomFragments: []
    },
    escape: true,
    extname: ".html",
    debug: process.env.NODE_ENV !== "production",
    imports: {
      // 注册的过滤器方法，在html模板中使用
      dateFormat: (dateStr, formatStr) => new Date(dateStr).format(formatStr)
    },
  })

  // 设置Session
  const CONFIG = {
    key: "koasass",
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
  }
  app.keys = ["Uwoe72s#8"] // 加密密钥
  app.use(session(CONFIG, app))
}