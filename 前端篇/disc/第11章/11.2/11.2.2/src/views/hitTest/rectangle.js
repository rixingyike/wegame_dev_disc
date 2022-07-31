// JS：src\views\hitTest\rectangle.js
/** 对象的矩形描述，默认将注册点放在左上角 */
class Rectangle {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  /** X坐标 */
  x = 0
  /** Y坐标 */
  y = 0
  /** X轴方向上所占区域 */
  width = 0
  /** Y轴方向上所占区域 */
  height = 0

  /** 顶部边界 */
  get top() {
    return this.y
  }
  /** 底部边界 */
  get bottom() {
    return this.y + this.height
  }
  /** 左边界 */
  get left() {
    return this.x
  }
  /** 右边界 */
  get right() {
    return this.x + this.width
  }
}

export default Rectangle