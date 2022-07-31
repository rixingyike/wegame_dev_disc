// JS：src/views/panel.js
/** 挡板基类 */
class Panel {
  constructor() { }

  x // 挡板的起点X坐标
  y // 挡板的起点Y坐标
  // #leftPanelY // 左挡板变化数据，左挡板的起点Y坐标
  // #rightPanelY // 右挡板起始位置是居中位置
  // #rightPanelSpeedY = 0.5 // 右挡板Y轴方向的移动速度
  panelPattern = "white" // 挡板材质填充对象，默认为白色

  /** 初始化 */
  init(options) {
    // if (!!this.initialized) return; this.initialized = true // 避免重复初始化

    // const defaulLeftPanelY = this.#leftPanelY = options?.leftPanelY ?? GameGlobal.CANVAS_HEIGHT / 2 - GameGlobal.PANEL_HEIGHT / 2 // 左挡板变化数据，左挡板的起点Y坐标
    // const defaultRightPanelY = this.#rightPanelY = options?.rightPanelY ?? (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2 // 右挡板起始位置是居中位置
    // this.reset = () => {
    //   this.#leftPanelY = defaulLeftPanelY
    //   this.#rightPanelY = defaultRightPanelY
    //   this.#rightPanelSpeedY = 0.5
    // }

    // 加载材质填充对象
    const context = options.context
    const img = wx.createImage()
    // img.onload = function() {
    img.onload = () => {
      this.panelPattern = context.createPattern(img, "repeat")
    }
    img.src = options.patternImageSrc || "static/images/mood.png"
  }

  /** 重设 */
  reset(){}

  /** 渲染 */
  // render(context) {
  //   // 绘制右挡板
  //   this.#drawPanel(context, GameGlobal.CANVAS_WIDTH  - GameGlobal.PANEL_WIDTH, this.#rightPanelY, this.#panelPattern, GameGlobal.PANEL_HEIGHT)

  //   // 绘制左挡板
  //   this.#drawPanel(context, 0, this.#leftPanelY, this.#panelPattern, GameGlobal.PANEL_HEIGHT)
  // }

  /** 渲染 */
  render(context) {
    // 绘制挡板
    this.drawPanel(context, this.x, this.y, this.panelPattern, GameGlobal.PANEL_HEIGHT)
  }

  /** 运算 */
  // run() {
  //   // 右挡板运动数据计算
  //   this.#rightPanelY += this.#rightPanelSpeedY
  //   const centerY = (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2
  //   if (this.#rightPanelY < centerY - GameGlobal.RIGHT_PANEL_MOVE_RANGE || this.#rightPanelY > centerY + GameGlobal.RIGHT_PANEL_MOVE_RANGE) {
  //     this.#rightPanelSpeedY = -this.#rightPanelSpeedY
  //   }
  // }

  /** 运算 */
  run() { }

  /** 
   * 挡板碰撞检测
   * @param {Ball} ball
   * @return {number} 0：未碰撞，1：碰撞了左挡板，2：碰撞了右挡板
   */
  // testHitBall(ball) {
  //   if (ball.x > (GameGlobal.CANVAS_WIDTH  - GameGlobal.RADIUS - GameGlobal.PANEL_WIDTH)) { // 碰撞右挡板
  //     if (ball.y > this.#rightPanelY && ball.y < (this.#rightPanelY + GameGlobal.PANEL_HEIGHT)) {
  //       return 2
  //     }
  //   } else if (ball.x < GameGlobal.RADIUS + GameGlobal.PANEL_WIDTH) { // 触达左挡板
  //     if (ball.y > this.#leftPanelY && ball.y < (this.#leftPanelY + GameGlobal.PANEL_HEIGHT)) {
  //       return 1
  //     }
  //   }
  //   return 0
  // }

  /** 处理触摸移动事件 */
  // onTouchMove(res) {
  //   let touch = res.touches[0] || { clientY: 0 }
  //   let y = touch.clientY - GameGlobal.PANEL_HEIGHT / 2
  //   if (y > 0 && y < (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT)) { // 溢出检测
  //     this.#leftPanelY = y
  //   }
  // }

  /** 绘制挡板的函数 */
  // #drawPanel(context, x, y, pat, height, width = GameGlobal.PANEL_WIDTH) {
  //   context.fillStyle = pat
  //   context.fillRect(x, y, width, height)
  // }

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