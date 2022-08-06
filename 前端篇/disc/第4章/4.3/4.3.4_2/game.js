/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/

// JS：disc\第4章\4.3\4.3.4_2\game.js
// 获取画布及2D渲染上下文对象
const canvas = wx.createCanvas()
const context = canvas.getContext("2d")
const radius = 10 // 小球半径
const panelHeight = 50 // 挡板高度

// 加载材质填充对象
let panelPattern = "white" // 挡板材质填充对象，默认为白色
const img = wx.createImage()
img.onload = function () {
  // panelPattern = context.createPattern(img, "no-repeat")
  panelPattern = context.createPattern(img, "repeat")
}
// img.src = "./static/images/mood.png"
img.src = "static/images/mood.png"

// 渲染
function render() {
  // 添加阴影效果
  // context.shadowBlur = 1
  // context.shadowOffsetY = 2
  // context.shadowOffsetX = 2
  // context.shadowColor = "grey"

  // 绘制不透明背景
  context.fillStyle = "whitesmoke"
  context.fillRect(0, 0, canvas.width, canvas.height)

  // 将函数当作变量使用绘制分界线，开始用闭包解决
  // context.strokeStyle = "whitesmoke"
  context.strokeStyle = "#00000011"
  context.lineWidth = 2
  const startX = canvas.width / 2
  let posY = 0,
    set = new Set()
  for (var i = 0; ; i++) {
    if (i % 2) continue // 取模操作，逢奇数跳过
    posY = i * 10
    let y = posY
    set.add(() => {
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

  // 实现从上向下颜色渐变绘制游戏标题
  // context.font = "italic 800 20px STHeiti"
  context.font = "800 20px STHeiti"
  const txtWidth = context.measureText("挡板小游戏").width
  const txtHeight = context.measureText("M").width
  const xpos = (canvas.width - txtWidth) / 2
  const ypos = (canvas.height - txtHeight) / 2
  // const grd = context.createLinearGradient(0, ypos, 0, ypos + txtHeight)
  // grd.addColorStop(0, "red") // 添加渐变颜色点
  // grd.addColorStop(.5, "white")
  // grd.addColorStop(1, "yellow")
  // context.fillStyle = grd
  context.fillStyle = "#00000033"
  context.textBaseline = "top" // 设置文本绘制基线
  context.fillText("挡板小游戏", xpos, ypos)

  // 绘制右挡板
  drawPanel(context, canvas.width - 5, rightPanelY, panelPattern, panelHeight)

  // 绘制左挡板
  drawPanel(context, 0, leftPanelY, panelPattern, panelHeight)

  // 绘制角色分数
  context.font = "100 12px STHeiti"
  context.fillStyle = "lightgray"
  // context.shadowOffsetX = context.shadowOffsetY = 0
  drawText(context, 20, canvas.height - 20, `用户 ${userScore}`)
  const sysScoreText = `系统 ${systemScore}` // 使用模板字符串
  drawText(context, canvas.width - 20 - context.measureText(sysScoreText).width, canvas.height - 20, sysScoreText)

  // 依据位置绘制小球
  // context.shadowOffsetY = context.shadowOffsetX = 2
  context.fillStyle = "white"
  context.beginPath()
  context.arc(ballPos.x, ballPos.y, radius, 0, 2 * Math.PI)
  context.fill()

  // 调用函数绘制背景音乐按钮
  drawBgMusicButton()
}

// 绘制背景音乐按钮
function drawBgMusicButton() {
  const img = wx.createImage()
  let bgMusicIsPlaying = bgAudio.currentTime > 0 && !bgAudio.paused
  if (bgMusicIsPlaying) {
    // img.src = "./static/images/sound_on.png"
    img.src = "static/images/sound_on.png"
  } else {
    // img.src = "./static/images/sound_off.png"
    img.src = "static/images/sound_off.png"
  }
  context.drawImage(img, 0, 0, 28, 28, 5, 5, 15, 15)
}

// 监听touchEnd事件，切换背景音乐按钮的状态与重启游戏
wx.onTouchEnd((res) => {
  // 切换背景音乐按钮的状态
  // const touch = res.touches[0]
  const touch = res.changedTouches[0] || { clientX: 0, clientY: 0 }
  const pos =  { x: touch.clientX, y: touch.clientY } // offsetX、offsetY不复存在
  if (pos.x > 5 && pos.x < 20 && pos.y > 5 && pos.y < 20) {
    console.log("单击了背景音乐按钮")
    const bgMusicIsPlaying = bgAudio.currentTime > 0 && !bgAudio.paused
    bgMusicIsPlaying ? stopBackgroundSound() : playBackgroundSound()
  }
  // 重启游戏
  if (gameIsOver){
    playHitAudio()
    userScore = 0 // 重设游戏变量
    systemScore = 0
    gameIsOver = false
    ballPos = { x: canvas.width / 2, y: canvas.height / 2 } // 重设小球位置
    run()
    playBackgroundSound()
  }
})

// 在指定位置绘制文本
function drawText(context, x, y, text) {
  context.fillText(text, x, y)
}

// 左挡板变化数据
let leftPanelY = { x: canvas.width / 2, y: canvas.height / 2 } // 左挡板的起点Y坐标

// 监听触摸移动事件，控制左挡板
wx.onTouchMove((res) => {
  let touch = res.touches[0] || { clientY: 0 }
  let y = touch.clientY - panelHeight / 2
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
  // 小球运动数据计算
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
    // context.shadowOffsetX = context.shadowOffsetY = 0
    const txt = "游戏结束"
    context.font = "900 26px STHeiti"
    context.fillStyle = "black"
    context.textBaseline = "middle"
    context.clearRect(0, 0, canvas.width, canvas.height) // 清屏
    drawText(context, canvas.width / 2 - context.measureText(txt).width / 2, canvas.height / 2, txt)
    // 提示用户单击屏幕重启游戏
    const restartTip = "单击屏幕重新开始"
    context.font = "12px FangSong"
    context.fillStyle = "gray"
    drawText(context, canvas.width / 2 - context.measureText(restartTip).width / 2, canvas.height / 2 + 25, restartTip)
    stopBackgroundSound()
  }
}

// 创建背景音乐对象
const bgAudio = wx.createInnerAudioContext()
// bgAudio.src = "./static/audios/bg.mp3"
bgAudio.src = "static/audios/bg.mp3"
// bgAudio.onCanplay(function () {
//   bgAudio.play() // 加载完成后播放
// })
bgAudio.autoplay = true
// bgAudio.onStop(function () { // 监听停止事件
//   console.log("音乐已停止")
//   bgAudio.play()
// })
// bgAudio.onEnded(function () { // 监听音乐停止事件
//   console.log("背景音乐已停止")
//   bgAudio.play()
// })
bgAudio.loop = true // 循环播放

// 播放背景音乐
function playBackgroundSound() {
  bgAudio.seek(0)
  bgAudio.play()
}

// 停止背景音乐
function stopBackgroundSound() {
  // bgAudio.pause()
  bgAudio.stop()
}

let userScore = 0 // 用户分数
  , systemScore = 0 // 系统分数
  , gameIsOver = false // 游戏是否结束

// 挡板碰撞检测
function testHitPanel() {
  if (ballPos.x > (canvas.width - radius - 5)) { // 碰撞右挡板
    if (ballPos.y > rightPanelY && ballPos.y < (rightPanelY + panelHeight)) {
      speedX = -speedX
      console.log("当！碰撞了右挡板")
      systemScore++
      checkScore()
      playHitAudio()
    }
  } else if (ballPos.x < radius + 5) { // 触达左挡板
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
function playHitAudio() {
  const audio = wx.createInnerAudioContext()
  // audio.src = "./static/audios/click.mp3"
  audio.src = "static/audios/click.mp3"
  audio.play()
}

// 依据分数判断游戏状态是否结束
function checkScore() {
  if (systemScore >= 3 || userScore >= 1) { // 逻辑或运算
    gameIsOver = true // 游戏结束
    console.log("游戏结束了")
  }
}

run()
// playBackgroundSound()