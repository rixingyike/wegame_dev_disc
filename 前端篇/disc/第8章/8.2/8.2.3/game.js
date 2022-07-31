// JS：disc\第8章\8.2\8.2.3\game.js
import "src/consts.js" // 引入常量
import audioManager from "src/managers/audio_manager.js" // 音频管理者单例
import ball from "src/views/ball.js" // 引入小球单例
import leftPanel from "src/views/left_panel.js" // 引入左挡板
import rightPanel from "src/views/right_panel.js" // 引入右挡板
import userBoard from "src/views/user_board.js" // 引入用户记分板
import systemBoard from "src/views/system_board.js" // 引入系统记分板
import { drawText } from "src/utils.js"
import bg from "src/views/background.js" // 引入背景对象

// 获取画布及2D渲染上下文对象
const canvas = wx.createCanvas()
  , context = canvas.getContext("2d")

let gameOverTimerId // 游戏限时定时器ID
  , gameIsOver = false // 游戏是否结束

// 初始化
function init() {
  Object.defineProperty(GameGlobal, "CANVAS_WIDTH", { value: canvas.width, writable: false }) // 设置画布宽度
  Object.defineProperty(GameGlobal, "CANVAS_HEIGHT", { value: canvas.height, writable: false }) // 设置画布高度

  // 初始化音频管理者
  audioManager.init({ bgAudioSrc: "static/audios/bg.mp3" })
  // audioManager.init({ bjAudioSrc: "cloud://dev-df2a97.6465-dev-df2a97-1257768123/audios/bj2.mp3" })
  
  // 初始化小球
  ball.init()

  // 初始化挡板
  leftPanel.init({context})
  rightPanel.init({context})

  // 监听触摸结束事件，切换背景音乐按钮的状态与重启游戏
  wx.onTouchEnd((res) => {
    // 重启游戏
    if (gameIsOver) {
      start()
    }
  })

  // 初始化用户记分板
  userBoard.init()
}

// 触摸事件移动中的回调函数
function onTouchMove(res) {
  leftPanel.onTouchMove(res) // 控制左挡板移动
}

// 触摸事件结束时的回调函数
function onTouchEnd(res) {
  // 切换背景音乐按钮的状态
  audioManager.onTouchEnd(res)
}

init()
start()

// 渲染
function render() {
  // 清屏
  context.clearRect(0, 0, canvas.width, canvas.height) // 清除整张画布

  // 绘制不透明背景
  // context.fillStyle = "whitesmoke"
  // context.fillRect(0, 0, canvas.width, canvas.height)

  // 将函数当作变量使用绘制分界线，开始用闭包解决
  // context.strokeStyle = "lightgray"
  // context.lineWidth = 2
  // const startX = canvas.width / 2
  // let posY = 0,
  //   set = new Set()
  // for (var i = 0; ; i++) {
  //   if (i % 2) continue // 取模操作，逢奇数跳过
  //   posY = i * 10
  //   let y = posY
  //   set.add(() => {
  //     drawLine(context, startX, y)
  //   })
  //   if (posY > canvas.height) break
  // }
  // context.beginPath()
  // for (let f of set) f() // 循环元素调用函数，这个位置仍然可以访问文件变量 posY
  // context.stroke()
  // 独立的绘制直线函数
  // function drawLine(context, x, y) {
  //   context.moveTo(x, y)
  //   context.lineTo(x, y + 10)
  // }

  // 实现从上向下颜色渐变绘制游戏标题
  // context.font = "800 20px STHeiti"
  // const txtWidth = context.measureText("挡板小游戏").width
  // const txtHeight = context.measureText("M").width
  // const xpos = (canvas.width - txtWidth) / 2
  // const ypos = (canvas.height - txtHeight) / 2
  // context.fillStyle = "gray"
  // context.textBaseline = "top" // 设置文本绘制基线
  // context.fillText("挡板小游戏", xpos, ypos)
  // 绘制背景
  bg.render(context)

  // 绘制右挡板
  rightPanel.render(context)
  // 绘制左挡板
  leftPanel.render(context)

  // 绘制角色分数
  userBoard.render(context)
  systemBoard.render(context)

  // 依据位置绘制小球
  ball.render(context)

  // 调用函数绘制背景音乐按钮
  audioManager.render(context)
}

// 运行
function run() {
  // 挡板碰撞检测
  testHitPanel()
  ball.testHitWall()
  // 小球运动数据计算
  ball.run()
  // 右挡板运动数据计算
  rightPanel.run()
}

// 循环
function loop() {
  run() // 运行
  render() // 渲染
  if (!gameIsOver) {
    requestAnimationFrame(loop) // 循环执行
  } else {
    end()
  }
}

// 游戏结束
function end() {
  context.clearRect(0, 0, canvas.width, canvas.height) // 清屏
  context.fillStyle = "whitesmoke" // 绘制背景色
  context.fillRect(0, 0, canvas.width, canvas.height)
  const txt = "游戏结束"
  context.font = "900 26px STHeiti"
  context.fillStyle = "black"
  context.textBaseline = "middle"
  drawText(context, canvas.width / 2 - context.measureText(txt).width / 2, canvas.height / 2, txt)
  // 提示用户单击屏幕重启游戏
  const restartTip = "单击屏幕重新开始"
  context.font = "12px FangSong"
  context.fillStyle = "gray"
  drawText(context, canvas.width / 2 - context.measureText(restartTip).width / 2, canvas.height / 2 + 25, restartTip)
  audioManager.stopBackgroundSound()
  // 游戏结束的模态弹窗提示
  wx.showModal({
    title: "游戏结束",
    content: "单击【确定】重新开始",
    success(res) {
      if (res.confirm) {
        start()
      }
    }
  })
  wx.offTouchEnd(onTouchEnd)
  wx.offTouchMove(onTouchMove)
}

// 重新开始游戏
function start() {
  leftPanel.reset()
  rightPanel.reset()
  // playHitAudio()
  audioManager.playHitAudio()
  userBoard.reset()
  systemBoard.reset()
  gameIsOver = false
  ball.reset() // 重设小球状态
  loop()
  audioManager.playBackgroundSound()
  // 限制游戏时间
  gameOverTimerId = setTimeout(function () {
    gameIsOver = true
  }, 1000 * 30)
  // 监听触摸结束事件，切换背景音乐按钮的状态等
  wx.onTouchEnd(onTouchEnd)
  // 监听触摸移动事件，控制左挡板
  wx.onTouchMove(onTouchMove)
}

// 挡板碰撞检测
function testHitPanel() {
  switch (leftPanel.testHitBall(ball) || rightPanel.testHitBall(ball)) {
    case 1: { // 碰撞了左挡板
      ball.switchSpeedX()
      console.log("当！碰撞了左挡板")
      userBoard.increaseScore()
      checkScore()
      // playHitAudio()
      audioManager.playHitAudio()
      // 玩家得分提示
      wx.showToast({
        title: "1分",
        duration: 1000,
        mask: true,
        icon: "none",
        image: "static/images/add64.png"
      })
      break
    }
    case 2: { // 碰撞了右挡板
      ball.switchSpeedX()
      console.log("当！碰撞了右挡板")
      systemBoard.increaseScore()
      checkScore()
      // playHitAudio()
      audioManager.playHitAudio()
      break
    }
    default:
    //
  }
}

// 播放单击音效
// function playHitAudio() {
//   const audio = wx.createInnerAudioContext()
//   audio.src = "static/audios/click.mp3"
//   audio.play()
// }

// 依据分数判断游戏状态是否结束
function checkScore() {
  if (systemBoard.score >= 3 || userBoard.score >= 1) { // 逻辑或运算
    gameIsOver = true // 游戏结束
    clearTimeout(gameOverTimerId) // 清除定时器ID
    console.log("游戏结束了")
  }
}