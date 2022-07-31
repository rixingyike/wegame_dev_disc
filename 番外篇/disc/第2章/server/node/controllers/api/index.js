"use strict"
import model from "../../models/index.js"

export default {
  "GET /": async (ctx, next) => {
    ctx.status = 200
    ctx.body = { errMsg: "ok" }
  }
}