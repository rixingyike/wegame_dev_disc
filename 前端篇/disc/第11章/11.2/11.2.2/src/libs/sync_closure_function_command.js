// JS：src\libs\sync_closure_function_command.js
import ClosureFunctionCommand from "closure_function_command.js"

/** 执行不占用时间的同步闭包命令，执行后马上完成 */
class SyncClosureFunctionCommand extends ClosureFunctionCommand {
  execute() {
    super.execute()
    this.markAsComplete()
  }
}

export default SyncClosureFunctionCommand