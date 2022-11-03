/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/

// JS：disc\第8章\8.3\8.3.2\game.js
import "src/consts.js" // 引入常量
import audioManager from "src/managers/audio_manager.js" // 音频管理者单例
import ball from "src/views/ball.js" // 引入小球单例
import leftPanel from "src/views/left_panel.js" // 引入左挡板
import rightPanel from "src/views/right_panel.js" // 引入右挡板
import userBoard from "src/views/user_board.js" // 引入用户记分板
import systemBoard from "src/views/system_board.js" // 引入系统记分板
import { drawText } from "src/utils.js"
import bg from "src/views/background.js" // 引入背景对象

/** 游戏对象 */
class Game {
  constructor() { }

  /** 主屏画布 */
  #canvas
  /** 2D渲染上下文对象 */
  #context

  /** 游戏限时定时器ID */
  #gameOverTimerId
  /** 游戏是否结束 */
  #gameIsOver = false
  /** 游戏结束页面 */
  #gameOverPage = new GameOverPage(this)
  /** 游戏主页页面 */
  #gameIndexPage = new GameIndexPage(this)

  /** 初始化 */
  init() {
    // 初始化画布和2D渲染上下文对象
    this.#canvas = wx.createCanvas()
    this.#context = this.#canvas.getContext("2d")

    Object.defineProperty(GameGlobal, "CANVAS_WIDTH", { value: this.#canvas.width, writable: false }) // 设置画布宽度
    Object.defineProperty(GameGlobal, "CANVAS_HEIGHT", { value: this.#canvas.height, writable: false }) // 设置画布高度
    // 初始化音频管理者
    audioManager.init({ bjAudioSrc: "static/audios/bg.mp3" })
    // 初始化小球
    // ball.init()
    // 初始化挡板
    // leftPanel.init({ context: this.#context })
    // rightPanel.init({ context: this.#context })
    // 初始化用户记分板
    // userBoard.init()
    this.#gameIndexPage.init({ context: this.#context })

    // 监听touchend事件重启游戏
    // wx.onTouchEnd((res) => {
    //   // 重启游戏
    //   if (this.#gameIsOver) {
    //     this.start()
    //   }
    // })
    // 监听触摸结束事件，切换背景音乐按钮的状态等
    // wx.onTouchEnd(this.#onTouchEnd)
    wx.onTouchEnd(this.#onTouchEnd.bind(this))
    // 监听触摸移动事件，控制左挡板
    // wx.onTouchMove(this.#onTouchMove)
    wx.onTouchMove(this.#onTouchMove.bind(this))
  }

  /** 重新开始游戏 */
  start() {
    this.#gameIndexPage.start()
    // leftPanel.reset()
    // rightPanel.reset()
    // audioManager.playHitAudio()
    // userBoard.reset()
    // systemBoard.reset()
    this.#gameIsOver = false
    // ball.reset() // 重设小球状态
    this.#loop()
    // audioManager.playBackgroundSound()
    // 限制游戏时间
    this.#gameOverTimerId = setTimeout(function () {
      this.#gameIsOver = true
    }, 1000 * 30)
    // 监听触摸结束事件，切换背景音乐按钮的状态等
    // wx.onTouchEnd(this.#onTouchEnd)
    // 监听触摸移动事件，控制左挡板
    // wx.onTouchMove(this.#onTouchMove)
  }

  /** 触摸事件移动中的回调函数 */
  #onTouchMove(res) {
    // leftPanel.onTouchMove(res) // 控制左挡板移动
    this.#gameIndexPage.onTouchMove(res)
  }

  /** 触摸事件结束时的回调函数 */
  #onTouchEnd(res) {
    // 切换背景音乐按钮的状态
    // audioManager.onTouchEnd(res)
    if (this.#gameIsOver) {
      // 重启游戏
      this.#gameOverPage.onTouchEnd(res)
    } else {
      // 切换背景音乐按钮的状态
      // audioManager.onTouchEnd(res)
      this.#gameIndexPage.onTouchEnd(res)
    }
  }

  /** 渲染 */
  #render() {
    // 清屏
    this.#context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清除整张画布

    // 绘制背景
    // bg.render(this.#context)

    // 绘制右挡板
    // rightPanel.render(this.#context)
    // 绘制左挡板
    // leftPanel.render(this.#context)

    // 绘制角色分数
    // userBoard.render(this.#context)
    // systemBoard.render(this.#context)

    // 依据位置绘制小球
    // ball.render(this.#context)

    // 调用函数绘制背景音乐按钮
    // audioManager.render(this.#context)
    this.#gameIndexPage.render(this.#context)
  }

  /** 运行 */
  #run() {
    // 挡板碰撞检测
    // this.#testHitPanel()

    // 小球碰撞检测
    // ball.testHitWall()

    // 小球运动数据计算
    // ball.run()

    // 右挡板运动数据计算
    // rightPanel.run()
    this.#gameIndexPage.run()
  }

  /** 循环 */
  #loop() {
    this.#run() // 运行
    this.#render() // 渲染
    if (!this.#gameIsOver) {
      requestAnimationFrame(this.#loop.bind(this)) // 循环执行
    } else {
      this.#end()
    }
  }

  /** 结束游戏 */
  endGame(){
    this.#gameIsOver = true // 游戏结束
    clearTimeout(this.#gameOverTimerId) // 清除定时器ID
  }

  /** 游戏结束 */
  #end() {
    // this.#context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清屏
    // this.#context.fillStyle = "whitesmoke" // 绘制背景色
    // this.#context.fillRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)
    // const txt = "游戏结束"
    // this.#context.font = "900 26px STHeiti"
    // this.#context.fillStyle = "black"
    // this.#context.textBaseline = "middle"
    // drawText(this.#context, GameGlobal.CANVAS_WIDTH / 2 - this.#context.measureText(txt).width / 2, GameGlobal.CANVAS_HEIGHT / 2, txt)

    // 提示用户单击屏幕重启游戏
    // const restartTip = "单击屏幕重新开始"
    // this.#context.font = "12px FangSong"
    // this.#context.fillStyle = "gray"
    // drawText(this.#context, GameGlobal.CANVAS_WIDTH / 2 - this.#context.measureText(restartTip).width / 2, GameGlobal.CANVAS_HEIGHT / 2 + 25, restartTip)
    // audioManager.stopBackgroundSound()
    this.#gameOverPage.render(this.#context)

    // 游戏结束的模态弹窗提示
    // wx.showModal({
    //   title: "游戏结束",
    //   content: "单击【确定】重新开始",
    //   success: (res) => {
    //     if (res.confirm) {
    //       this.start()
    //     }
    //   }
    // })
    this.#gameOverPage.end()

    // wx.offTouchEnd(this.#onTouchEnd)
    // wx.offTouchMove(this.#onTouchMove)
  }

  /** 挡板碰撞检测 */
  // #testHitPanel() {
  //   switch (leftPanel.testHitBall(ball) || rightPanel.testHitBall(ball)) {
  //     case 1: { // 碰撞了左挡板
  //       ball.switchSpeedX()
  //       console.log("当！碰撞了左挡板")
  //       userBoard.increaseScore()
  //       this.#checkScore()
  //       audioManager.playHitAudio()
  //       // 玩家得分提示
  //       wx.showToast({
  //         title: "1分",
  //         duration: 1000,
  //         mask: true,
  //         icon: "none",
  //         image: "static/images/add64.png"
  //       })
  //       break
  //     }
  //     case 2: { // 碰撞了右挡板
  //       ball.switchSpeedX()
  //       console.log("当！碰撞了右挡板")
  //       systemBoard.increaseScore()
  //       this.#checkScore()
  //       audioManager.playHitAudio()
  //       break
  //     }
  //     default:
  //     //
  //   }
  // }

  /** 依据分数判断游戏状态是否结束 */
  // #checkScore() {
  //   if (systemBoard.score >= 3 || userBoard.score >= 1) { // 逻辑或运算
  //     this.#gameIsOver = true // 游戏结束
  //     clearTimeout(this.#gameOverTimerId) // 清除定时器ID
  //     console.log("游戏结束了")
  //   }
  // }
}

/** 游戏结束页面 */
class GameOverPage {
  constructor(game) {
    this.#game = game
  }

  #game

  /** 处理触摸结束事件 */
  onTouchEnd(res) {
    this.#game.start()
  }

  /** 页面结束 */
  end() {
    // 游戏结束的模态弹窗提示
    wx.showModal({
      title: "游戏结束",
      content: "单击【确定】重新开始",
      success: (res) => {
        if (res.confirm) {
          this.#game.start()
        }
      }
    })
    audioManager.stopBackgroundSound()
  }

  /** 渲染 */
  render(context) {
    context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清屏
    context.fillStyle = "whitesmoke" // 绘制背景色
    context.fillRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)
    const txt = "游戏结束"
    context.font = "900 26px STHeiti"
    context.fillStyle = "black"
    context.textBaseline = "middle"
    drawText(context, GameGlobal.CANVAS_WIDTH / 2 - context.measureText(txt).width / 2, GameGlobal.CANVAS_HEIGHT / 2, txt)

    // 提示用户单击屏幕重启游戏
    const restartTip = "单击屏幕重新开始"
    context.font = "12px FangSong"
    context.fillStyle = "gray"
    drawText(context, GameGlobal.CANVAS_WIDTH / 2 - context.measureText(restartTip).width / 2, GameGlobal.CANVAS_HEIGHT / 2 + 25, restartTip)
  }
}

/** 游戏主页页面 */
class GameIndexPage {
  constructor(game) {
    this.#game = game
  }

  #game

  init(options) {
    // 初始化小球
    ball.init()
    // 初始化挡板
    leftPanel.init({ context: options.context })
    rightPanel.init({ context: options.context })
    // 初始化用户记分板
    userBoard.init()
  }

  /** 渲染 */
  render(context) {
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

  /** 运行 */
  run() {
    // 挡板碰撞检测
    this.#testHitPanel()
    // 小球碰撞检测
    ball.testHitWall()
    // 小球运动数据计算
    ball.run()
    // 右挡板运动数据计算
    rightPanel.run()
  }

  start() {
    leftPanel.reset()
    rightPanel.reset()
    audioManager.playHitAudio()
    userBoard.reset()
    systemBoard.reset()
    ball.reset() // 重设小球状态
    audioManager.playBackgroundSound()
  }

  onTouchMove(res) {
    leftPanel.onTouchMove(res) // 控制左挡板移动
  }

  onTouchEnd(res) {
    // 切换背景音乐按钮的状态
    audioManager.onTouchEnd(res)
  }

  /** 挡板碰撞检测 */
  #testHitPanel() {
    switch (leftPanel.testHitBall(ball) || rightPanel.testHitBall(ball)) {
      case 1: { // 碰撞了左挡板
        ball.switchSpeedX()
        console.log("当！碰撞了左挡板")
        userBoard.increaseScore()
        this.#checkScore()
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
        this.#checkScore()
        audioManager.playHitAudio()
        break
      }
      default:
      //
    }
  }

  /** 依据分数判断游戏状态是否结束 */
  #checkScore() {
    if (systemBoard.score >= 3 || userBoard.score >= 1) { // 逻辑或运算
      // this.#gameIsOver = true // 游戏结束
      // clearTimeout(this.#gameOverTimerId) // 清除定时器ID
      console.log("游戏结束了")
      this.#game.endGame()
    }
  }
}

const game = new Game()
game.init()
game.start()