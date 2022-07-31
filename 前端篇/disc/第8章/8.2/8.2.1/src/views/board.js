// JS：src\views\board.js
import { drawText } from "../utils.js"

/** 记分板基类 */
class Board {
  constructor() { }

  /** 分数 */
  get score() {
    return this.$score
  }
  $score = 0

  /** 增加分数 */
  increaseScore() {
    this.$score++
  }

  /** 重设 */
  reset() {
    this.$score = 0
  }

  drawText = drawText
}

export default Board