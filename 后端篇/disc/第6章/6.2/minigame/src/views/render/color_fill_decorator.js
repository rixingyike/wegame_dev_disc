// JS：src\views\render\color_fill_decorator.js
import RenderDecorator from "render_decorator.js"

/** 颜色填充装饰器对象 */
class ColorFillDecorator extends RenderDecorator {
  /** 
   * @constructor
   * @param {object} target 有一个render(context)方法
   * @param {string} color 填充色，默认为白色
   */
  constructor(target, color = "white") {
    super(target)
    this.fillStyle = color
  }

  /** 填充样式，默认为颜色（白色） */
  fillStyle

  render(context) {
    context.fillStyle = this.fillStyle
    super.render(context)
  }
}

export default ColorFillDecorator