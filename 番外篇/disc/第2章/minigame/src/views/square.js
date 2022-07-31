// JS：src\views\square.js
import Component from "component.js"

/** 一个用于测试的颜色方块 */
class Square extends Component {
  constructor(color = "red") {
    super()
    this.#color = color
    this.width = this.height = 30
  }

  #color

  render(context) {
    // 取相对定位的位置
    const x = this.getOffsetXToWindow()
      , y = this.getOffsetYToWindow()
    context.fillStyle = this.#color
    context.fillRect(x, y, this.width, this.height)
  }
}

export default Square