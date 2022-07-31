// JS：src\views\hitTest\screen_rectangle.js
import HitedObjectRectangle from "hited_object_rectangle.js"

/** 被碰撞对象屏幕的大小数据 */
class ScreenRectangle extends HitedObjectRectangle {
  constructor() {
    super(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)
  }

  visit(hitObject) {
    let res = 0
    if (hitObject.right > this.right) { // 触达右边界返回4
      res = 1 << 2
    } else if (hitObject.left < this.left) { // 触达左边界返回8
      res = 1 << 3
    }
    if (hitObject.top < this.top) { // 触达上边界返回16
      res = 1 << 4
    } else if (hitObject.bottom > this.bottom) { // 触达下边界返回32
      res = 1 << 5
    }
    return res
  }
}

export default ScreenRectangle