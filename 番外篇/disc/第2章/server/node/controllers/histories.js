// JS：controllers\histories.js
"use strict"
import model from "../models/index.js"

export default {
  "GET ": async (ctx, next) => {
    const title = "历史记录"
      , db = await model.connect()
      , histories = await model.execute(db, "select * from history order by date_created desc limit 10")
    ctx.render("histories/index", { title, path: ctx.request.path, histories })
  }
}