// JS：src\views\board.js
import { drawText } from "../utils.js"

/** 记分板基类 */
class Board {
  constructor() { }

  /** 分数 */
  score = 0

  /** 重设 */
  reset() {
    this.score = 0
  }

  /** 在指定位置绘制文本 */
  // drawText(context, x, y, text) {
  //   context.fillText(text, x, y)
  // }
  drawText = drawText
}

export default Board