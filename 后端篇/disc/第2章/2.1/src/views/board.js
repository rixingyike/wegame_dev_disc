// JS：src\views\board.js
import { drawText } from "../utils.js"
import VBox from "vbox.js"

/** 记分板基类 */
class Board extends VBox {
  constructor() { super() } // 有constructor，super不能省略

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