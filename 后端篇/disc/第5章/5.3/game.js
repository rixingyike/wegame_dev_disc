// JS：disc\第5章\5.3\game.js
import "src/consts.js" // 引入常量
import audioManager from "src/managers/audio_manager.js" // 音频管理者单例
import EventDispatcher from "src/libs/event_dispatcher.js"
import Task from "src/libs/task.js"
import PageFactory from "src/views/page_factory.js" // 引入页面工厂
import gameTopLayer from "src/views/game_top_layer.js"
// import dataService from "src/managers/data_service.js"
import { checkAdvisedToRest } from "src/utils.js"
import cloudFuncMgr from "src/managers/cloud_function_manager.js" // 引入云函数及云数据库管理者

/** 游戏对象 */
class Game extends EventDispatcher {
  /** 单例 */
  static getInstance() {
    if (!this.instance) {
      this.instance = new Game()
    }
    return this.instance;
  }

  constructor() {
    super()
  }

  /** 游戏暂停了吗 */
  get isPaused() {
    return this.#isPaused
  }
  #isPaused = false
  /** 主屏画布 */
  #canvas
  /** 2D渲染上下文对象 */
  #context
  /** 当前页面 */
  #currentPage
  #frameId

  /** 初始化 */
  init() {
    // 初始化画布和2D渲染上下文对象
    this.#canvas = wx.createCanvas()
    this.#context = this.#canvas.getContext("2d")

    Object.defineProperty(GameGlobal, "CANVAS_WIDTH", { value: this.#canvas.width, writable: false }) // 设置画布宽度
    Object.defineProperty(GameGlobal, "CANVAS_HEIGHT", { value: this.#canvas.height, writable: false }) // 设置画布高度
    // 初始化音频管理者
    audioManager.init({ bjAudioSrc: "static/audios/bg2.mp3" })

    // 监听触摸结束事件
    wx.onTouchEnd(this.#onTouchEnd.bind(this))
    // 监听鼠标移动事件
    wx.onTouchMove(this.#onTouchMove.bind(this))

    // 监听游戏暂停与恢复的事件
    wx.onHide(() => {
      this.pause()
    })
    wx.onShow(() => {
      this.recover()
    })
    // 初始化游戏顶层UI
    gameTopLayer.init({ game: this })
    gameTopLayer.on("gamePause", () => {
      this.#isPaused ? this.recover() : this.pause()
    })

    // 监听全局错误事件
    wx.onError(this.#onError)
    // throw new Error("全局错误测试")
  }

  /** 暂停游戏 */
  pause() {
    if (this.#isPaused) return
    console.log("游戏已暂停")
    this.#currentPage.pause()
    this.#isPaused = true
    setTimeout(() => cancelAnimationFrame(this.#frameId), 50)
    new Task(Task.STOP_BG_AUDIO, this, "bg2").sendOutBy(this)
  }

  /** 恢复游戏 */
  recover() {
    if (!this.#isPaused) return
    console.log("游戏已切回，恢复运行了")
    this.#currentPage.recover()
    this.#isPaused = false
    this.#loop()
    new Task(Task.PLAY_BG_AUDIO, this, "bg2").execute()
  }

  /** 开始游戏 */
  start() {
    this.turnToPage("index")
    this.#loop()
    const onTask = task => {
      if (!task.isDone) task.sendOutBy(audioManager)
    }
    this.on(Task.PLAY_HIT_AUDIO, onTask)
    this.on(Task.STOP_HIT_AUDIO, onTask)
    this.on(Task.PLAY_BG_AUDIO, onTask)
    this.on(Task.STOP_BG_AUDIO, onTask)

    // 防沉迷检查
    // checkAdvisedToRest()
  }

  /** 游戏换页 */
  turnToPage(pageName) {
    this.#currentPage?.end()
    this.#currentPage = PageFactory.createPage(pageName, this, this.#context)
    this.#currentPage.start()
  }

  /** 游戏结束，公开方法就放在私有方法的上面 */
  end() {
    this.#currentPage?.end()
    cancelAnimationFrame(this.#frameId)
    audioManager.stopBackgroundSound()
    this.off("playHitAudio")
    // 申请垃圾回收
    const performance = wx.getPerformance()
    console.log("当前微秒", performance.now())
    wx.triggerGC()
  }

  /** 退出游戏 */
  exit() {
    wx.offError(this.#onError)
    this.end()
    wx.exitMiniProgram()
  }

  /** 触摸事件移动中的回调函数 */
  #onTouchMove(res) {
    this.emit("touchMove", res)
  }

  /** 触摸事件结束时的回调函数 */
  #onTouchEnd(res) {
    this.emit("touchEnd", res)
    gameTopLayer.onTouchEnd(res)
  }

  /** 渲染 */
  #render() {
    // 清屏
    this.#context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清除整张画布
    this.#currentPage.render(this.#context)
    // 渲染顶层UI
    gameTopLayer.render(this.#context)
  }

  /** 运行 */
  #run() {
    this.#currentPage.run()
    gameTopLayer.run()
  }

  /** 循环 */
  #loop() {
    this.#run() // 运行
    this.#render() // 渲染
    this.#frameId = requestAnimationFrame(this.#loop.bind(this)) // 循环执行
  }

  async #onError(res) {
    console.log("发生了全局错误", res.message)
    // await dataService.writeError(res.message)
    // const errData = await dataService.read("historyError")
    // console.log("errData", errData)
    // await dataService.clearError()

    // 向云数据库记录异常信息
    cloudFuncMgr.writeError(res.message)
    console.log("readErrors", (await cloudFuncMgr.readErrors()).data);
  }
}

const game = Game.getInstance()
game.init()
game.start()