// JS：src\views\game_index_page.js
import Page from "page.js"
import audioManager from "../managers/audio_manager.js" // 音频管理者单例
import ball from "ball.js" // 引入小球单例
import leftPanel from "left_panel.js" // 引入左挡板
import rightPanel from "right_panel.js" // 引入右挡板
import userBoard from "user_board.js" // 引入用户记分板
import systemBoard from "system_board.js" // 引入系统记分板
import bg from "background.js" // 引入背景对象

/** 游戏主页页面 */
class GameIndexPage extends Page {
  constructor(game) {
    super(game)
  }

  /** 游戏限时定时器ID */
  #gameOverTimerId

  /** 初始化 */
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

  /** 开始 */
  start() {
    leftPanel.reset()
    rightPanel.reset()
    audioManager.playHitAudio()
    userBoard.reset()
    systemBoard.reset()
    ball.reset() // 重设小球状态
    audioManager.playBackgroundSound()
    this.#gameOverTimerId = setTimeout(() => {
      this.game.turnToPage("gameOver")
    }, 1000 * 30)
  }

  /** 处理结束事务 */
  end() {
    clearInterval(this.#gameOverTimerId)
  }

  /** 处理触摸移动事件 */
  onTouchMove(res) {
    leftPanel.onTouchMove(res) // 控制左挡板移动
  }

  /** 处理触摸结束事件 */
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
      console.log("游戏结束了")
      // this.game.endGame()
      this.game.turnToPage("gameOver")
    }
  }
}

export default GameIndexPage