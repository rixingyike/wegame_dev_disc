// JS：src/views/panel.js
/** 挡板基类 */
class Panel {
  constructor() { }

  x // 挡板的起点X坐标
  y // 挡板的起点Y坐标
  panelPattern = "white" // 挡板材质填充对象，默认为白色

  /** 初始化 */
  init(options) {
    // 加载材质填充对象
    const context = options.context
    const img = wx.createImage()
    img.onload = () => {
      this.panelPattern = context.createPattern(img, "repeat")
    }
    img.src = options.patternImageSrc || "static/images/mood.png"
  }

  /** 渲染 */
  render(context) {
    // 绘制挡板
    this.drawPanel(context, this.x, this.y, this.panelPattern, GameGlobal.PANEL_HEIGHT)
  }

  /** 重设 */
  reset() { }

  /** 运算 */
  run() { }

  /** 
   * 挡板碰撞检测
   * @param {Ball} ball
   * @return {number} 0：未碰撞，1：碰撞了左挡板，2：碰撞了右挡板
   */
  testHitBall(ball) { }

  /** 绘制挡板的函数 */
  drawPanel(context, x, y, pat, height, width = GameGlobal.PANEL_WIDTH) {
    context.fillStyle = pat
    context.fillRect(x, y, width, height)
  }
}

export default Panel