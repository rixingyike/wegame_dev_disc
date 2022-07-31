// JS：src\views\page.js
import Box from "box.js"
import Task from "../libs/task.js"

/** 页面基类 */
// class Page {
class Page extends Box {
  constructor(game) {
    super()
    this.game = game
  }

  game

  /** 负责初始化 */
  init(options) { }

  /** 负责计算 */
  run() { }

  /** 负责页面开始事件 */
  start() {
    this.game.on("touchMove", res => this.onTouchMove.call(this, res))
    this.game.on("touchEnd", res => this.onTouchEnd.call(this, res))
    this.on(Task.PLAY_HIT_AUDIO, task => {
      if (!task.isDone) task.sendOutBy(this.game)
    })
  }

  /** 负责页面结束事件 */
  end() {
    this.game.off("touchMove")
    this.game.off("touchEnd")
    this.off("playHitAudio")
  }
}

export default Page