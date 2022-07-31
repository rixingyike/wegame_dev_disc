// JS：src\libs\parallel_command_group.js
import CommandGroup from "command_group.js"
import Iterator from "iterator.js"

/** 并发复合命令，所有子命令一起执行，直接最后一个完成 */
class ParallelCommandGroup extends CommandGroup {
  #completedNumber = 0

  execute() {
    // this.subCommands.forEach(c => {
    //   c.once("complete", () => {
    //     if (++this.#completedNumber >= this.subCommands.length) {
    //       this.markAsComplete()
    //     }
    //   })
    //   c.execute()
    // })
    const iterator = new Iterator(this.subCommands)
    let item = iterator.next()
    while (!item.done) {
      const c = item.value
      // c.once.bind(c)
      c.once("complete", () => {
        if (++this.#completedNumber >= this.subCommands.length) {
          this.markAsComplete()
        }
      })
      c.execute()
      item = iterator.next()
    }
  }

  resetAllSubCommands() {
    super.resetAllSubCommands()
    this.#completedNumber = 0
  }
}

export default ParallelCommandGroup