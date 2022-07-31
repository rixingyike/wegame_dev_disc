// JS：src\views\strategy\panel_uniform_speed_y_strategy.js
/** 挡板移动的匀速策略 */
class PanelUniformSpeedYStrategy {
  constructor(startSpeedY = 0.5) {
    const centerY = (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2
    this.speedY = this.startSpeedY = startSpeedY
    this.minY = centerY - GameGlobal.RIGHT_PANEL_MOVE_RANGE
    this.maxY = centerY + GameGlobal.RIGHT_PANEL_MOVE_RANGE
  }

  minY
  maxY
  /** 当前速度 */
  speedY
  /** 默认起始速度 */
  startSpeedY = 0

  getValue(y) {
    if (y < this.minY || y > this.maxY) {
      this.speedY = -this.speedY
    }
    return this.speedY
  }
}

export default PanelUniformSpeedYStrategy