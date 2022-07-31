// JS：disc\第9章\9.1\9.1.2\game.js
import "src/consts.js" // 引入常量
import audioManager from "src/managers/audio_manager.js" // 音频管理者单例
import GameOverPage from "src/views/game_over_page.js"
import GameIndexPage from "src/views/game_index_page.js"
import EventDispatcher from "src/libs/event_dispatcher.js"

/** 游戏对象 */
// class Game {
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

  /** 主屏画布 */
  #canvas
  /** 2D渲染上下文对象 */
  #context
  /** 游戏结束页面 */
  #gameOverPage = new GameOverPage(this)
  /** 游戏主页页面 */
  #gameIndexPage = new GameIndexPage(this)
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
    // 初始化游戏主页对象
    this.#gameIndexPage.init({ context: this.#context })

    // 监听触摸结束事件
    wx.onTouchEnd(this.#onTouchEnd.bind(this))
    // 监听鼠标移动事件
    wx.onTouchMove(this.#onTouchMove.bind(this))
  }

  /** 开始游戏 */
  start() {
    this.turnToPage("index")
    this.#loop()
  }

  /** 游戏换页 */
  turnToPage(pageName) {
    this.#currentPage?.end()
    switch (pageName) {
      case "gameOver": {
        this.#currentPage = this.#gameOverPage
        this.#currentPage.start()
        break;
      }
      case "index":
      default: {
        this.#currentPage = this.#gameIndexPage
        this.#currentPage.start()
        break;
      }
    }
  }

  /** 触摸事件移动中的回调函数 */
  #onTouchMove(res) {
    // this.#currentPage.onTouchMove(res)
    this.emit("touchMove", res)
  }

  /** 触摸事件结束时的回调函数 */
  #onTouchEnd(res) {
    // this.#currentPage.onTouchEnd(res)
    this.emit("touchEnd", res)
  }

  /** 渲染 */
  #render() {
    // 清屏
    this.#context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清除整张画布
    this.#currentPage.render(this.#context)
  }

  /** 运行 */
  #run() {
    this.#currentPage.run()
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
  }
}

// const game = new Game()
const game = Game.getInstance()
game.init()
game.start()