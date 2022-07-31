// JS：disc\第1章\1.1\minigame\watch_macos.js
const fs = require("fs")
let { exec } = require("child_process")
fs.watch(
  `/Users/liyi/WeChatProjects/minigame`,
  () => {
    exec(
      `/Applications/wechatwebdevtools.app/Contents/MacOS/cli auto-preview --project /Users/liyi/WeChatProjects/minigame`,
      {
        cwd: `/Applications/wechatwebdevtools.app/Contents/MacOS/`
      },
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr)
      }
    )
  }
)