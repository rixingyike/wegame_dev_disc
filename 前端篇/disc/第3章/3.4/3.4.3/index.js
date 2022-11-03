/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/

// JS：disc\第3章\3.4\3.4.3\index.js
// 获取画布及2D渲染上下文对象
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const radius = 10 // 小球半径，提升为文件常量
const panelHeight = 50 // 挡板高度

// 加载材质填充对象
let panelPattern = "white" // 挡板材质填充对象，默认为白色
const img = document.getElementById("mood")
img.onload = function () {
  panelPattern = context.createPattern(img, "no-repeat")
}

// 渲染
function render() {
  // 添加阴影效果
  context.shadowBlur = 1
  context.shadowOffsetY = 2
  context.shadowOffsetX = 2
  context.shadowColor = "grey"

  // 绘制不透明背景
  context.fillStyle = "whitesmoke"
  context.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制分界线
  context.strokeStyle = "whitesmoke"
  context.lineWidth = 2
  const startX = canvas.width / 2
  let posY = 0,
    set = new Set()
  for (let i = 0; ; i++) {
    if (i % 2) continue // 取模操作，逢奇数跳过
    posY = i * 10
    set.add(() => {
      let y = posY
      drawLine(context, startX, y)
    })
    if (posY > canvas.height) break
  }
  context.beginPath()
  for (let f of set) f() // 循环元素调用函数，这个位置仍然可以访问文件变量 posY
  context.stroke()
  // 独立的绘制直线函数
  function drawLine(context, x, y) {
    context.moveTo(x, y)
    context.lineTo(x, y + 10)
  }

  // 实现从上向下颜色渐变
  context.font = "italic 800 20px STHeiti"
  const txtWidth = context.measureText("挡板小游戏").width
    , txtHeight = context.measureText("M").width
    , xpos = (canvas.width - txtWidth) / 2
    , ypos = (canvas.height - txtHeight) / 2
    , grd = context.createLinearGradient(0, ypos, 0, ypos + txtHeight)
  grd.addColorStop(0, "red") // 添加渐变颜色点
  grd.addColorStop(.5, "white")
  grd.addColorStop(1, "yellow")
  context.fillStyle = grd
  context.textBaseline = "top" // 设置文本绘制基线
  context.fillText("挡板小游戏", xpos, ypos)

  // 绘制右挡板
  drawPanel(context, canvas.width - 5, rightPanelY, panelPattern, panelHeight)

  // 绘制左挡板
  drawPanel(context, 0, leftPanelY, panelPattern, panelHeight)

  // 绘制角色分数
  context.font = "100 12px STHeiti"
  context.fillStyle = "lightgray"
  context.shadowOffsetX = context.shadowOffsetY = 0
  // drawText(context, 10, canvas.height - 20, "用户 " + userScore)
  drawText(context, 10, canvas.height - 20, `用户 ${userScore}`)
  const sysScoreText = `系统 ${systemScore}` // "系统 " + systemScore
  drawText(context, canvas.width - 20 - context.measureText(sysScoreText).width, canvas.height - 20, sysScoreText)

  // 依据位置绘制小球
  context.fillStyle = "white"
  context.beginPath()
  context.arc(ballPos.x, ballPos.y, radius, 0, 2 * Math.PI)
  context.fill()
}

// 在指定位置绘制文本
function drawText(context, x, y, text) {
  context.fillText(text, x, y)
}

// 左挡板变化数据
let leftPanelY = { x: canvas.width / 2, y: canvas.height / 2 } // 左挡板的起点Y坐标
// 监听鼠标移动事件
canvas.addEventListener("mousemove", function (e) {
  let y = e.clientY - canvas.getBoundingClientRect().top - panelHeight / 2
  if (y > 0 && y < (canvas.height - panelHeight)) { // 溢出检测
    leftPanelY = y
  }
})

// 绘制挡板的函数
function drawPanel(context, x, y, pat, height) {
  context.fillStyle = pat
  context.fillRect(x, y, 5, height)
}

// 使用定时器让球动起来
let ballPos = { x: canvas.width / 2, y: canvas.height / 2 } // 球的起始位置是画布中心
let speedX = 2
let speedY = 1

// 小球与墙壁的四周碰撞检查，优化版本
function testHitWall() {
  if (ballPos.x > canvas.width - radius) {// 触达右边界
    speedX = -speedX
  } else if (ballPos.x < radius) {// 触达左边界
    speedX = -speedX
  }
  if (ballPos.y > canvas.height - radius) {// 触达右边界
    speedY = -speedY
  } else if (ballPos.y < radius) {// 触达左边界
    speedY = -speedY
  }
}

// 右挡板变化数据
const rightPanelMoveRange = 20 // 右挡板上下移动数值范围
let rightPanelY = (canvas.height - panelHeight) / 2 // 起始位置还是居中位置
let rightPanelSpeedY = 0.5 // 右挡板Y轴方向的移动速度

// 运行
function run() {
  // 清屏
  context.clearRect(0, 0, canvas.width, canvas.height) // 清除整张画布
  testHitPanel()
  testHitWall()
  ballPos.x += speedX
  ballPos.y += speedY
  // 右挡板运动数据计算
  rightPanelY += rightPanelSpeedY
  const centerY = (canvas.height - panelHeight) / 2
  if (rightPanelY < centerY - rightPanelMoveRange || rightPanelY > centerY + rightPanelMoveRange) {
    rightPanelSpeedY = -rightPanelSpeedY
  }
  render()
  if (!gameIsOver) {
    requestAnimationFrame(run) // 循环执行
  } else {
    context.shadowOffsetX = context.shadowOffsetY = 0
    const txt = "游戏结束"
    context.font = "900 26px STHeiti"
    context.fillStyle = "black"
    context.textBaseline = "middle"
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawText(context, canvas.width / 2 - context.measureText(txt).width / 2, canvas.height / 2, txt)
    // 提示用户单击屏幕重启游戏
    const restartTip = "单击屏幕重新开始"
    context.font = "12px FangSong"
    context.fillStyle = "gray"
    drawText(context, canvas.width / 2 - context.measureText(restartTip).width / 2, canvas.height / 2 + 25, restartTip)
    // 监听单击事件
    canvas.addEventListener("click", onClickScreenWhileGameOver)
    stopBackgroundSound()
  }
}

// 创建背景音乐对象
const bgAudio = new Audio("bg-sound")
if (bgAudio.canPlayType("audio/mp3")) {
  bgAudio.src = "./bg.mp3"
} else if (bgAudio.canPlayType("audio/ogg")) {
  bgAudio.src = "./bg.ogg"
}

// 播放背景音乐
function playBackgroundSound() {
  bgAudio.currentTime = 0
  bgAudio.play()
}

// 停止背景音乐
function stopBackgroundSound() {
  bgAudio.pause()
}

// 重启游戏的事件句柄
function onClickScreenWhileGameOver(e) {
  playHitAudio()
  // 移除监听
  canvas.removeEventListener("click", onClickScreenWhileGameOver)
  userScore = 0 // 重设游戏变量
  systemScore = 0
  gameIsOver = false
  ballPos = { x: canvas.width / 2, y: canvas.height / 2 } // 重设小球位置
  run()
  playBackgroundSound()
}

let userScore = 0 // 用户分数
  , systemScore = 0 // 系统分数
  , gameIsOver = false // 游戏是否结束

// 挡板碰撞检测
function testHitPanel() {
  if (ballPos.x > (canvas.width - radius - 5)) {// 碰撞右挡板
    if (ballPos.y > rightPanelY && ballPos.y < (rightPanelY + panelHeight)) {
      speedX = -speedX
      console.log("当！碰撞了右挡板")
      systemScore++
      checkScore()
      playHitAudio()
    }
  } else if (ballPos.x < radius + 5) {// 触达左挡板
    if (ballPos.y > leftPanelY && ballPos.y < (leftPanelY + panelHeight)) {
      speedX = -speedX
      console.log("当！碰撞了左挡板")
      userScore++
      checkScore()
      playHitAudio()
    }
  }
}

// 播放单击音效
// function playHitAudio() {
//   const audio = document.getElementById("hit-sound")
//   audio.play()
// }

// 播放单击音效
function playHitAudio() {
  const audio = new Audio("hit-sound")
  if (audio.canPlayType("audio/mp3")) {
    audio.src = "./click.mp3"
  } else if (audio.canPlayType("audio/ogg")) {
    audio.src = "./click.ogg"
  }
  audio.play()
}

// 依据分数判断游戏状态是否结束
function checkScore() {
  if (systemScore >= 3 || userScore >= 1) {//这是逻辑运算符或运算
    gameIsOver = true // 游戏结束
    console.log("游戏结束了")
  }
}

run()
playBackgroundSound()