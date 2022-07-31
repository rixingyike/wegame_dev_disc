// JS：routers.js
"use strict"
import fs from "fs"
import Router from "@koa/router"
import path from "path"

// api地址前缀，不以斜杠结尾
const apiServicePre = ""

/** 给一个文件里的控制器方法添加路由映射 */
function addRouterMapToControllerMethodOfFile(router, mapping, collectionId, pre) {
  let path
  // 除了index.js文件外，以文件名作为集合ID（Collection ID）
  // 以集合ID作为单个控制器的路径前缀
  collectionId = collectionId.replace("index", "")
  const prefix = apiServicePre + pre + (collectionId === "" ? "" : `/${collectionId}`)
  for (let url in mapping) {
    if (url.startsWith("GET ")) {
      path = prefix + url.substring(4)
      router.get(path, mapping[url])
    } else if (url.startsWith("HEAD ")) {
      // HEAD方法与GET方法一样，都是向服务器发出指定资源的请求。
      // 但是，服务器在响应HEAD请求时不会回传资源的内容部分。
      // 我们可以不传输全部内容的情况下，就可以获取服务器的响应头信息。
      // HEAD方法常被用于客户端查看服务器的性能。
      path = prefix + url.substring(5)
      router.head(path, mapping[url])
    } else if (url.startsWith("POST ")) {
      path = prefix + url.substring(5)
      router.post(path, mapping[url])
    } else if (url.startsWith("PUT ")) {
      path = prefix + url.substring(4)
      router.put(path, mapping[url])
    } else if (url.startsWith("PATCH ")) {
      // PATCH方法出现的较晚，PATCH请求与PUT请求类似，同样用于资源的更新。
      // 二者有两点不同：
      // 1，PATCH一般用于资源的部分更新，而PUT一般用于资源的整体更新。
      // 2，当资源不存在时，PATCH会创建一个新的资源，而PUT只会对已在资源进行更新。
      path = prefix + url.substring(6)
      router.patch(path, mapping[url])
    } else if (url.startsWith("DELETE ")) {
      path = prefix + url.substring(7)
      router.del(path, mapping[url])
    } else if (url.startsWith("OPTIONS ")) {
      path = prefix + url.substring(8)
      router.options(path, mapping[url])
    } else if (url.startsWith("ALL ")) {
      path = prefix + url.substring(4)
      router.all(path, mapping[url])
    } else {
      console.log(`invalid URL: ${url}`)
    }
    console.log(`已监听路径：${path}`)
  }
}

/** 添加目录下的控制器 */
function addControllersInDir(router, dir, pre = "") {
  const files = fs.readdirSync(__dirname + "/" + dir, { withFileTypes: true })
    .map(dirent => dirent.name)
  files.forEach(fileOrDirName => {
    console.log("开始处理控制器文件或目录", `${dir}/${fileOrDirName}`)
    if (fileOrDirName.endsWith(".js")) {
      const extension = path.extname(fileOrDirName)
        , pureFileName = path.basename(fileOrDirName, extension)
        , mapping = require(__dirname + "/" + dir + "/" + fileOrDirName)
      addRouterMapToControllerMethodOfFile(router, mapping.default, pureFileName, pre)
    } else {
      console.log("开始处理子目录", fileOrDirName)
      addControllersInDir(router, `${dir}/${fileOrDirName}`, `${pre}/${fileOrDirName}`)
    }
  })
}

/** 为控制器添加前后中间件 */
function setMiddlewaresForControllers(app, dir, beforeMiddleware, afterMiddleware) {
  const controllersDir = dir || "controllers"
  const router = new Router()

  // 这行代码只能放在添加addControllers前面
  if (beforeMiddleware) router.use(beforeMiddleware)
  addControllersInDir(router, controllersDir)
  if (afterMiddleware) router.use(afterMiddleware)

  app.use(router.routes())
  app.use(router.allowedMethods())
}

export default function setRouters(app) {
  // 设置Web路由
  setMiddlewaresForControllers(app, "controllers",
    async (ctx, next) => {
      // 检查web用户是否登录
      // 这里path与url的区别是，url带QueryString，而path不带
      if (ctx.request.path !== "/accounts/login" && !ctx.request.path.startsWith("/wechat") && !ctx.request.path.startsWith("/api")) {
        if (!ctx.session.user) {
          console.log("ctx.session.user", ctx.session.user)
          ctx.redirect("/accounts/login", 302)
          return
        }
      }
      await next()
    }, async (ctx, next) => {
      // 
      await next()
    })
}