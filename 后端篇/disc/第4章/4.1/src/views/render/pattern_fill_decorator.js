// JS：src\views\render\pattern_fill_decorator.js
import ColorFillDecorator from "color_fill_decorator.js"

/** 材质填充装饰器对象 */
class PatternFillDecorator extends ColorFillDecorator {
  constructor(target, context, patternImageSrc = "static/images/mood.png") {
    super(target)
    // 加载材质填充对象
    const img = wx.createImage()
    img.onload = () => {
      this.fillStyle = context.createPattern(img, "repeat")
    }
    img.src = patternImageSrc
  }
}

export default PatternFillDecorator