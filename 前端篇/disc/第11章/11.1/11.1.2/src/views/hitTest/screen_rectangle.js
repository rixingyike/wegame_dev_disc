// JS：src\views\hitTest\screen_rectangle.js
import HitedObjectRectangle from "hited_object_rectangle.js"

/** 被碰撞对象屏幕的大小数据 */
class ScreenRectangle extends HitedObjectRectangle {
  constructor() {
    super(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)
  }
}

export default ScreenRectangle