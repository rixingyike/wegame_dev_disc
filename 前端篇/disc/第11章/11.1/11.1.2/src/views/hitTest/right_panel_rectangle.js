// JS：src\views\hitTest\right_panel_rectangle.js
import HitedObjectRectangle from "hited_object_rectangle.js"

/** 被碰撞对象右挡板的大小数据 */
class RightPanelRectangle extends HitedObjectRectangle {
  constructor() {
    super(GameGlobal.CANVAS_WIDTH - GameGlobal.PANEL_WIDTH, (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2, GameGlobal.PANEL_WIDTH, GameGlobal.PANEL_HEIGHT)
  }
}

export default RightPanelRectangle