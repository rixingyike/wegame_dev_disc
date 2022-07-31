// JS：src\libs\command_group.js
import Command from "command.js"

/** 复合命令基类 */
class CommandGroup extends Command {
  constructor(subCommands = []) {
    super()
    this.subCommands = subCommands
  }

  /** 子命令集合 */
  subCommands

  /** 添加子命令 */
  addCommand(c) {
    this.subCommands.push(c)
    return this
  }

  /** 移除子命令 */
  removeCommand(c) {
    const index = this.subCommands.indexOf(c)
    if (index) this.subCommands.splice(index, 1)
    return this
  }

  /** 重设所有子命令对象状态 */
  resetAllSubCommands() {
    this.subCommands.forEach(c => c.off("complete"))
    return this
  }
}

export default CommandGroup