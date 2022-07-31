// JS：src\libs\command.js
import EventDispatcher from "event_dispatcher.js"

/** 命令 */
class Command extends EventDispatcher {
  /** 是否已经完成 */
  get complete() {
    return this.$complete
  }
  $complete = false

  /** 执行 */
  execute() { }

  /** 标识命令完成 */
  markAsComplete() {
    this.$complete = true
    this.emit("complete")
  }
}

export default Command