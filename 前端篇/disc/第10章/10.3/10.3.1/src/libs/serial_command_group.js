// JS：src\libs\serial_command_group.js
import CommandGroup from "command_group.js"

/** 串发复合命令，子命令依次执行，直至所有完成 */
class SerialCommandGroup extends CommandGroup {
  /** 当前执行的子命令索引 */
  #currentIndex = -1

  execute() {
    const executeNextCommand = () => {
      if (++this.#currentIndex < this.subCommands.length) {
        const c = this.subCommands[this.#currentIndex]
        c.once("complete", () => {
          executeNextCommand()
        })
        c.execute()
      } else {
        this.markAsComplete()
      }
    }
    executeNextCommand()
  }

  resetAllSubCommands() {
    super.resetAllSubCommands()
    this.#currentIndex = -1
  }
}

export default SerialCommandGroup