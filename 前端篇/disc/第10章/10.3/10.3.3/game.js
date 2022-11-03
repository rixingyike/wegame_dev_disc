/**
 * 《微信小游戏开发：前端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/

// JS：disc\第10章\10.3\10.3.3\game.js
import "src/consts.js" // 引入常量
import audioManager from "src/managers/audio_manager.js" // 音频管理者单例
import EventDispatcher from "src/libs/event_dispatcher.js"
import Task from "src/libs/task.js"
// import PageFactory from "src/views/page_abstract_factory.js" // 引入页面抽象工厂
import PageBuildDirector from "src/views/page_build_director.js" // 引入页面建造指挥者

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
  }

  /** 开始游戏 */
  start() {
    this.turnToPage("index")
    this.#loop()
    this.on(Task.PLAY_HIT_AUDIO, task => {
      if (!task.isDone) task.sendOutBy(audioManager)
    })
  }

  /** 游戏换页 */
  turnToPage(pageName) {
    this.#currentPage?.end()
    // this.#currentPage = PageFactory.createPage(pageName, { game: this, context: this.#context })
    this.#currentPage = PageBuildDirector.buildPage(pageName, { game: this, context: this.#context })
    this.#currentPage.start()
  }

  /** 触摸事件移动中的回调函数 */
  #onTouchMove(res) {
    this.emit("touchMove", res)
  }

  /** 触摸事件结束时的回调函数 */
  #onTouchEnd(res) {
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
    this.off("playHitAudio")
  }
}

const game = Game.getInstance()
game.init()
game.start()