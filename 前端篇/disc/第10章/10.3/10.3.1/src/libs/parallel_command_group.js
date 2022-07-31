// JS：src\libs\parallel_command_group.js
import CommandGroup from "command_group.js"

/** 并发复合命令，所有子命令一起执行，直接最后一个完成 */
class ParallelCommandGroup extends CommandGroup {
  #completedNumber = 0

  execute() {
    this.subCommands.forEach(c => {
      c.once("complete", () => {
        if (++this.#completedNumber >= this.subCommands.length) {
          this.markAsComplete()
        }
      })
      c.execute()
    })
  }

  resetAllSubCommands() {
    super.resetAllSubCommands()
    this.#completedNumber = 0
  }
}

export default ParallelCommandGroup