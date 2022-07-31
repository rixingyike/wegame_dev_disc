// JS：src\views\hitTest\ball_rectangle.js
import HitObjectRectangle from "hit_object_rectangle.js"

/** 碰撞对象的具体实现部分，球的大小及运动数据对象 */
class BallRectangle extends HitObjectRectangle {
  constructor() {
    super(GameGlobal.RADIUS * 2, GameGlobal.RADIUS * 2)
  }
}

export default BallRectangle