"use strict"
import fs from "fs"
import { connect } from "./db"
import utils from "./utils.js"

/** 导出db与所有JS文件中的model对象 */
const all = {
  connect,
  ...utils
}

/**
 * 在这里批量导入所有数据模型对象，
 * 这可以避免在消费代码处依次引入model的麻烦
 */
const dir = __dirname + "/custom/"
  , files = fs.readdirSync(dir)
    .filter(file => {
      return file.endsWith(".js")
    }, files)

for (let f of files) {
  const name = f.substring(0, f.length - 3)
    , model = require(dir + f)
  all[name] = model.default
}

export default all