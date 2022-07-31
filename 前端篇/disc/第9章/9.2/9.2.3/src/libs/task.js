// JS：src\libs\task.js

/** 任务对象 */
class Task {
  /** 播放单击音频 */
  static PLAY_HIT_AUDIO = "playHitAudio"

  constructor(name) {
    this.name = name
  }

  /** 任务名称 */
  name
  /** 任务是否完成 */
  isDone = false

  /** 发出这个任务
   * @param {EventDispatcher} processor 任务的起点，是一个事件派发者
   */
  sendOutBy(processor) {
    processor.emit?.(this.name, this)
  }
}

export default Task