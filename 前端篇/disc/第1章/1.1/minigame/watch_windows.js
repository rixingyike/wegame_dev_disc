// JS：disc\第1章\1.1\minigame\watch_windows.js
// 注意，在测试时如果有路径问题，可以尝试将微信开发者工具安装在不带空格的路径中
const fs = require("fs")
let { exec } = require("child_process")
fs.watch(
  `/d/work/disc/第1章/1.1/minigame`,
  () => {
    exec(
      `/c/Program Files (x86)/Tencent/微信web开发者工具/cli.bat auto-preview --project /d/work/disc/第1章/1.1/minigame`,
      {
        cwd: `/c/Program Files (x86)/Tencent/微信web开发者工具/`
      },
      (error, stdout, stderr) => {
        console.log(error, stdout, stderr)
      }
    )
  }
)