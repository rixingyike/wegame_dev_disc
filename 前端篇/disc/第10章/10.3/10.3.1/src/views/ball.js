// JS：src/views/ball.js
/** 小球 */
class Ball {
  static #instance
  /** 单例 */
  static getInstance() {
    if (!this.#instance) {
      this.#instance = new Ball()
    }
    return this.#instance
  }

  constructor() { }

  get x() {
    return this.#pos.x
  }
  get y() {
    return this.#pos.y
  }
  #pos // 球的起始位置
  #speedX = 4 // X方向分速度
  #speedY = 2 // Y方向分速度

  /** 初始化 */
  init(options) {
    this.#pos = options?.ballPos ?? { x: GameGlobal.CANVAS_WIDTH / 2, y: GameGlobal.CANVAS_HEIGHT / 2 } // 这里使用了可选链操作符和空值合并操作符
    const defaultPos = { x: this.#pos.x, y: this.#pos.y }
    this.reset = () => {
      this.#pos.x = defaultPos.x
      this.#pos.y = defaultPos.y
    }
  }

  /** 重设 */
  reset() { }

  /** 渲染 */
  render(context) {
    // 依据位置绘制小球
    context.fillStyle = "white"
    context.strokeStyle = "gray"
    context.lineWidth = 2
    context.beginPath()
    context.arc(this.#pos.x, this.#pos.y, GameGlobal.RADIUS, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
  }

  /** 运行 */
  run() {
    // 小球运动数据计算
    this.#pos.x += this.#speedX
    this.#pos.y += this.#speedY
  }

  /** 小球与墙壁的四周碰撞检查 */
  testHitWall() {
    if (this.#pos.x > GameGlobal.CANVAS_WIDTH - GameGlobal.RADIUS) { // 触达右边界
      this.#speedX = -this.#speedX
    } else if (this.#pos.x < GameGlobal.RADIUS) { // 触达左边界
      this.#speedX = -this.#speedX
    }
    if (this.#pos.y > GameGlobal.CANVAS_HEIGHT - GameGlobal.RADIUS) { // 触达右边界
      this.#speedY = -this.#speedY
    } else if (this.#pos.y < GameGlobal.RADIUS) { // 触达左边界
      this.#speedY = -this.#speedY
    }
  }

  /** 转变X方向速度的正负值 */
  switchSpeedX() {
    this.#speedX = -this.#speedX
  }
}

export default Ball.getInstance()