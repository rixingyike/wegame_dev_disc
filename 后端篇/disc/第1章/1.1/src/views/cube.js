// JS：src\views\cube.js
import { Ball } from "ball.js"
import CubeRectangle from "hitTest/cube_rectangle.js"

/** 红色立方块 */
class Cube extends Ball {
  constructor() {
    super()
    this.rectangle = new CubeRectangle()
  }

  /** 渲染 */
  render(context) {
    context.fillStyle = "red"
    context.beginPath()
    context.rect(this.rectangle.left, this.rectangle.top, this.rectangle.width, this.rectangle.height)
    context.fill()
  }
}

export default new Cube()