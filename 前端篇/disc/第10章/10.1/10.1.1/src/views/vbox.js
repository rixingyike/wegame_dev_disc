// JS：src\views\vbox.js
import Box from "box.js"

/** 横向排列的容器盒子 */
class VBox extends Box {
  constructor() { super() }

  gap = 15

  /** 将子元素按竖排策略重新渲染 */
  render(context) {
    let startX = 0
      , startY = 0
      , elementX
      , elementY
      , maxWidth = 0

    const N = this.children.length

    for (let j = 0; j < N; j++) {
      const element = this.children[j]
      elementX = element.x
      elementY = element.y
      element.x = startX
      element.y = startY
      element.render(context)
      element.x = elementX // 将子元素位置数据复原
      element.y = elementY
      startY += this.gap + element.height
      if (element.width > maxWidth) maxWidth = element.width
    }

    // 重新计算盒子的尺寸
    if (N > 1) startY -= this.gap
    this.height = startY - this.getOffsetYToWindow()
    this.width = maxWidth
  }
}

export default VBox