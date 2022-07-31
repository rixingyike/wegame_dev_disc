// JS：src\views\hbox.js
import Box from "box.js"

/** 横向排列的容器盒子 */
class HBox extends Box {
  constructor() { super() }

  gap = 15

  /** 将子元素按横排策略重新渲染 */
  render(context) {
    let startX = 0
      , startY = 0
      , elementX
      , elementY
      , maxHeight = 0

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
      startX += this.gap + element.width
      if (element.height > maxHeight) maxHeight = element.height
    }

    // 重新计算盒子的尺寸
    if (N > 1) startX -= this.gap
    this.width = startX - this.getOffsetXToWindow()
    this.height = maxHeight
  }
}

export default HBox