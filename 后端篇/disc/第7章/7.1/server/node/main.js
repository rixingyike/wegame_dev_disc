// JS：disc\第7章\7.1\server\node\main.js
"use strict"
import "./utils/format.js"
import Koa from "koa"
import setMiddlewares from "./middlewares.js"
import setRouters from "./routers.js"

// 创建web实例
const app = new Koa()

// 设置中间件
setMiddlewares(app)

// 设置并启用路由
setRouters(app)

// 使用端口3000
const port = 3000
app.listen(port)
console.log(`web服务已在${port}端口启动`)