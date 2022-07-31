// JS：src\libs\draw_line_command.js
import Command from "command.js"

/** 绘制分界线段的命令 */
class DrawLineCommand extends Command {
  constructor(context, startX, startY, gap = 10) {
    super()
    this.context = context
    this.startX = startX
    this.startY = startY
    this.gap = gap
  }

  /** 起始X坐标 */
  startX
  /** 起始Y坐标 */
  startY
  /** 线段间隔 */
  gap
  /** 渲染上下文对象 */
  context

  execute() {
    this.context.moveTo(this.startX, this.startY)
    this.context.lineTo(this.startX, this.startY + this.gap)
    this.markAsComplete()
  }
}

export default DrawLineCommand