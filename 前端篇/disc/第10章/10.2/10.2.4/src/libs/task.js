// JS：src\libs\task.js
import Command from "command.js"

/** 任务对象 */
class Task extends Command {
  /** 播放单击音频 */
  static PLAY_HIT_AUDIO = "playHitAudio"

  constructor(name, processor = null) {
    super()
    this.name = name
    this.#processor = processor
  }

  /** 任务名称 */
  name
  /** 任务是否完成 */
  // isDone = false
  get isDone() {
    return this.$complete
  }
  set isDone(v) {
    if (v) this.markAsComplete()
  }
  /** 任务执行者 */
  #processor

  /** 发出这个任务
   * @param {EventDispatcher} processor 任务的起点，是一个事件派发者
   */
  sendOutBy(processor) {
    this.#processor = processor
    // processor.emit?.(this.name, this)
    this.execute()
  }

  execute() {
    this.#processor.emit?.(this.name, this)
  }
}

export default Task