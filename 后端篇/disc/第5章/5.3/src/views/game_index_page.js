// JS：src\views\game_index_page.js
import Page from "page.js"
import audioManager from "../managers/audio_manager.js" // 音频管理者单例
import ball from "ball.js" // 引入小球单例
// import ball from "cube.js" // 引入立方块实例
import leftPanel from "left_panel.js" // 引入左挡板
import rightPanel from "right_panel.js" // 引入右挡板
import userBoard from "user_board_boxed.js" // 引入用户记分板
import systemBoard from "system_board.js" // 引入系统记分板
import bg from "background.js" // 引入背景对象
import Task from "../libs/task.js" // 引入任务对象
import ScreenRectangle from "hitTest/screen_rectangle.js"
// import dataService from "../managers/data_service.js" // 引入数据服务单例
import openDataMgr from "../managers/open_data_manager.js" // 引入开放数据管理者
import cloudFuncMgr from "../managers/cloud_function_manager.js" // 引入云资源管理者

/** 游戏主页页面 */
class GameIndexPage extends Page {
  constructor(game) { // 这个构造器没有重写任何代码，其实可以删除
    super(game)
  }

  /** 开始计时时间 */
  #startTime
  /** 剩余的定时器时间，默认为30秒 */
  #remainedTime = 30 * 1000
  /** 游戏限时定时器ID */
  #gameOverTimerId
  /** 墙壁碰撞检测对象 */
  #rectangle = new ScreenRectangle()

  /** 初始化 */
  init(options) {
    // 初始化小球
    ball.init()
    // 初始化挡板
    leftPanel.init({ context: options.context })
    rightPanel.init({ context: options.context })
    // 初始化用户记分板
    userBoard.init()
    // 初始化游戏背景
    bg.init({ bgImageUrl: "https://cloud-1252822131.cos.ap-beijing.myqcloud.com/images/bg.png" })
    // 添加子元素
    this.addElement(bg)
      .addElement(rightPanel)
      .addElement(leftPanel)
      .addElement(userBoard)
      .addElement(systemBoard)
      .addElement(ball)
      .addElement(audioManager)
  }

  /** 运行 */
  run() {
    // 挡板碰撞检测
    this.#testHitPanel()
    // 小球碰撞检测
    ball.testHitWall(this.#rectangle)
    // 小球运动数据计算
    ball.run()
    // 右挡板运动数据计算
    rightPanel.run()
  }

  /** 处理开始事务 */
  start() {
    super.start()
    leftPanel.reset()
    rightPanel.reset()
    new Task(Task.PLAY_HIT_AUDIO).sendOutBy(this)
    userBoard.reset()
    systemBoard.reset()
    ball.reset() // 重设小球状态
    audioManager.playBackgroundSound()

    // 初始化开局时间与局时剩余时间
    this.#startTime = Date.now()
    this.#remainedTime = 30 * 1000
    this.#gameOverTimerId = setTimeout(() => {
      this.game.turnToPage("gameOver")
    }, this.#remainedTime)
  }

  /** 暂停页面 */
  pause() {
    // 记录剩余多少局时
    this.#remainedTime = Date.now() - this.#startTime
    clearTimeout(this.#gameOverTimerId) // 清除定时器
  }

  /** 恢复页面 */
  recover() {
    this.#gameOverTimerId = setTimeout(() => {
      this.game.turnToPage("gameOver")
    }, this.#remainedTime)
  }

  /** 处理结束事务 */
  async end() {
    super.end()
    clearInterval(this.#gameOverTimerId)

    // 记录游戏数据，开始测试 DataService
    // dataService.writeLocalData(userBoard.score, systemBoard.score)
    // 读取本地记录
    // const localScoreData = dataService.readLocalData()
    // console.log("localScoreData", localScoreData)

    // 记录游戏数据，开始测试 AsyncDataService
    // dataService.writeLocalData(userBoard.score, systemBoard.score, res => {
    //   console.log("写入结果", res)
    //   // 读取本地记录
    //   dataService.readLocalData(localScoreData => {
    //     console.log("localScoreData", localScoreData)
    //   })
    // })

    // 记录游戏数据，开始测试 AsyncToSyncDataService
    // await dataService.writeLocalData(userBoard.score, systemBoard.score)
    // 读取本地记录
    // const localScoreData = await dataService.readLocalData()
    // console.log("localScoreData", localScoreData)
    // dataService.clearLocalData()

    // 记录游戏数据，开始测试 DataServiceViaFileSystemManager
    // await dataService.writeLocalData(userBoard.score, systemBoard.score)
    // 读取本地记录
    // const localScoreData = await dataService.readLocalData()
    // console.log("localScoreData", localScoreData)
    // dataService.clearLocalData()

    // 更新玩家分数
    openDataMgr.updateUserScore(userBoard.score)

    // 通过云函数存储玩家分数
    cloudFuncMgr.uploadScore(userBoard.score)
    
    // 小游戏端直接操作云数据库
    await cloudFuncMgr.writeHistoryData(userBoard.score, systemBoard.score) 
    console.log("readHistoryDatas", (await cloudFuncMgr.readHistoryDatas()).data)
    // console.log("clearHistoryDatas", await cloudFuncMgr.clearHistoryDatas())
    // 分页读取历史数据
    console.log("readByPage", (await cloudFuncMgr.readByPage()).data)
    // 测试聚合分页查询
    console.log("readByPageViaAggregate", (await cloudFuncMgr.readByPageViaAggregate()).data)
    // 强制清扫history集合
    // console.log("forceClear", await cloudFuncMgr.forceClear())
    // 查询用户玩家自己的历史游戏数据
    console.log("querySelfHistoryDataByPage", (await cloudFuncMgr.querySelfHistoryDataByPage()).data)
    // 将玩家自己最近的分数递增1个数字
    console.log("increaseSelfLastScore", await cloudFuncMgr.increaseSelfLastScore())
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
        new Task(Task.PLAY_HIT_AUDIO).sendOutBy(this)
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
        new Task(Task.PLAY_HIT_AUDIO).sendOutBy(this)
        break
      }
      default:
      //
    }
  }

  /** 依据分数判断游戏状态是否结束 */
  #checkScore() {
    // if (systemBoard.score >= 3 || userBoard.score >= 1) { // 这是逻辑运算符或运算
    if (systemBoard.score >= GameGlobal.MAX_SCORE
      || userBoard.score >= GameGlobal.MAX_SCORE) {
      console.log("游戏结束了")
      this.game.turnToPage("gameOver")
    }
  }
}

export default GameIndexPage