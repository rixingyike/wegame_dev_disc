// JS：src\libs\task.js
import Command from "command.js"

/** 任务对象 */
class Task extends Command {
  /** 播放单击音频 */
  static PLAY_HIT_AUDIO = "playHitAudio"
  /** 停止单击音频 */
  static STOP_HIT_AUDIO = "stopHitAudio"
  /** 播放背景音乐 */
  static PLAY_BG_AUDIO = "playBgAudio"
  /** 停止背景音乐 */
  static STOP_BG_AUDIO = "stopBgAudio"

  constructor(name, processor = null, audioName = "hit") {
    super()
    this.name = name
    this.#processor = processor
    this.audioName = audioName
  }

  /** 音频名称，例如bg、bg2、hit、hit2 */
  audioName
  /** 任务名称 */
  name
  /** 任务是否完成 */
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
    this.execute()
  }

  execute() {
    this.#processor.emit?.(this.name, this)
  }
}

export default Task