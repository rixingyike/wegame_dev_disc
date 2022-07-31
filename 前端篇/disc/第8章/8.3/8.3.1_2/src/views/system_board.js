// JS：src\views\system_board.js
import Board from "board.js"
class SystemBoard extends Board {
  constructor() {
    super()
  }

  /** 渲染 */
  render(context) {
    // 绘制角色分数
    context.font = "100 12px STHeiti"
    context.fillStyle = "gray"
    const sysScoreText = `系统 ${this.score}` // 使用模板字符串
    this.drawText(context, GameGlobal.CANVAS_WIDTH - 20 - context.measureText(sysScoreText).width, GameGlobal.CANVAS_HEIGHT - 20, sysScoreText)
  }
}

export default new SystemBoard()