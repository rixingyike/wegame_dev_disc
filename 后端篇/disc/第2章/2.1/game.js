// JS：disc\第2章\2.1\game.js
import "src/consts.js" // 引入常量
import audioManager from "src/managers/audio_manager.js" // 音频管理者单例
import EventDispatcher from "src/libs/event_dispatcher.js"
import Task from "src/libs/task.js"
// import PageBuildDirector from "src/views/page_build_director.js" // 引入页面建造指挥者
import PageFactory from "src/views/page_factory.js" // 引入页面工厂
// import ToggleButton from "src/views/toggle_button.js"
import gameTopLayer from "src/views/game_top_layer.js"

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
  /** 游戏暂停按钮 */
  // #gamePauseBtn = new ToggleButton()
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

    // 初始化游戏暂停按钮
    // this.#gamePauseBtn.init({
    //   checkedLabel: "恢复"
    //   , uncheckedLabel: "暂停"
    //   , x: GameGlobal.CANVAS_WIDTH - 80
    //   , y: 50
    //   , onTap: res => {
    //     // if (this.#isPaused) {
    //     //   this.#isPaused = this.#gamePauseBtn.checked = false
    //     //   this.#loop()
    //     // } else {
    //     //   this.#isPaused = this.#gamePauseBtn.checked = true
    //     //   setTimeout(() => cancelAnimationFrame(this.#frameId), 50)
    //     // }
    //     this.#isPaused ? this.recover() : this.pause()
    //   }
    // })
    // 监听游戏暂停与恢复的事件
    wx.onHide(() => {
      // console.log("游戏已暂停")
      // this.#isPaused = this.#gamePauseBtn.checked = true
      this.pause()
    })
    wx.onShow(() => {
      // console.log("游戏已切回，恢复运行了")
      // this.#isPaused = this.#gamePauseBtn.checked = false
      this.recover()
    })
    // 初始化游戏顶层UI
    // gameTopLayer.init()
    gameTopLayer.init({ game: this })
    gameTopLayer.on("gamePause", () => {
      this.#isPaused ? this.recover() : this.pause()
    })
  }

  /** 暂停游戏 */
  pause() {
    if (this.#isPaused) return
    console.log("游戏已暂停")
    this.#currentPage.pause()
    // this.#isPaused = this.#gamePauseBtn.checked = true
    // this.#isPaused = gameTopLayer.gamePauseBtn.checked = true
    this.#isPaused = true
    setTimeout(() => cancelAnimationFrame(this.#frameId), 50)
    new Task(Task.STOP_BG_AUDIO, this, "bg2").sendOutBy(this)
  }

  /** 恢复游戏 */
  recover() {
    if (!this.#isPaused) return
    console.log("游戏已切回，恢复运行了")
    this.#currentPage.recover()
    // this.#isPaused = this.#gamePauseBtn.checked = false
    // this.#isPaused = gameTopLayer.gamePauseBtn.checked = false
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
  }

  /** 游戏换页 */
  turnToPage(pageName) {
    this.#currentPage?.end()
    // this.#currentPage = PageBuildDirector.buildPage(pageName, { game: this, context: this.#context })
    this.#currentPage = PageFactory.createPage(pageName, this, this.#context)
    this.#currentPage.start()
  }

  /** 触摸事件移动中的回调函数 */
  #onTouchMove(res) {
    this.emit("touchMove", res)
  }

  /** 触摸事件结束时的回调函数 */
  #onTouchEnd(res) {
    this.emit("touchEnd", res)
    // this.#gamePauseBtn.onTouchEnd(res)
    gameTopLayer.onTouchEnd(res)
  }

  /** 渲染 */
  #render() {
    // 清屏
    this.#context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清除整张画布
    this.#currentPage.render(this.#context)
    // 渲染游戏控制按钮
    // this.#gamePauseBtn.render(this.#context)
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

  /** 游戏结束 */
  end() {
    this.#currentPage?.end()
    cancelAnimationFrame(this.#frameId)
    audioManager.stopBackgroundSound()
    this.off("playHitAudio")
  }
}

const game = Game.getInstance()
game.init()
game.start()