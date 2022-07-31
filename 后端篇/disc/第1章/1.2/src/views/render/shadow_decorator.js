// JS：src\views\render\shadow_decorator.js
import RenderDecorator from "render_decorator.js"

/** 阴影效果装饰器对象 */
class ShadowDecorator extends RenderDecorator {
  constructor(target, shadowColor = "black") {
    super(target)
    this.shadowColor = shadowColor
  }

  /** 阴影颜色 */
  shadowColor

  render(context) {
    context.shadowColor = this.shadowColor
    context.shadowOffsetX = 2
    context.shadowOffsetY = 4
    super.render(context)
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
  }
}

export default ShadowDecorator