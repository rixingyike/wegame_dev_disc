// JS：src\views\strategy\panel_accelerated_speed_y_strategy.js
import PanelUniformSpeedYStrategy from "panel_uniform_speed_y_strategy.js"

/** 挡板移动的单摆式变速策略 */
class PanelAcceleratedSpeedYStrategy extends PanelUniformSpeedYStrategy {
  constructor(startSpeedY = 4) {
    super(startSpeedY)
  }

  /** 加速度 */
  acceleration = -0.08

  getValue(y) {
    if (this.speedY < -this.startSpeedY || this.speedY > this.startSpeedY) {
      this.acceleration = -this.acceleration
    }
    return (this.speedY += this.acceleration)
  }
}

export default PanelAcceleratedSpeedYStrategy