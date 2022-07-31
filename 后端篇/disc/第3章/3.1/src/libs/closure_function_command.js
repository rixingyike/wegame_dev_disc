// JS：src\libs\closure_func_command.js
import Command from "command.js"

/** 执行一个闭包函数的命令 */
class ClosureFunctionCommand extends Command{
  constructor(closure, thisRef = null){
    super()
    this.#closure = closure 
    this.#thisRef = thisRef
  }

  #closure
  #thisRef

  execute(){
    this.#closure.call(this.#thisRef)
  }
}

export default ClosureFunctionCommand