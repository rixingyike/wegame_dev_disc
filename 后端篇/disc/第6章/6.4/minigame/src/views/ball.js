// JS：src/views/ball.js
import BallRectangle from "hitTest/ball_rectangle.js"
import { vibrate } from "../utils.js"

/** 小球 */
// class Ball {
export class Ball {
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
    // return this.#pos.x
    return this.rectangle.x
  }
  get y() {
    // return this.#pos.y
    return this.rectangle.y
  }
  /** 小于碰撞检测对象 */
  rectangle = new BallRectangle()
  // #pos // 球的起始位置
  #speedX = 4 // X方向分速度
  #speedY = 2 // Y方向分速度

  /** 初始化 */
  init(options) {
    // this.#pos = options?.ballPos ?? { x: GameGlobal.CANVAS_WIDTH / 2, y: GameGlobal.CANVAS_HEIGHT / 2 } 
    // const defaultPos = { x: this.#pos.x, y: this.#pos.y }
    // this.reset = () => {
    //   this.#pos.x = defaultPos.x
    //   this.#pos.y = defaultPos.y
    // }
    this.rectangle.x = options?.x ?? GameGlobal.CANVAS_WIDTH / 2
    this.rectangle.y = options?.y ?? GameGlobal.CANVAS_HEIGHT / 2
    this.#speedX = options?.speedX ?? 4
    this.#speedY = options?.speedY ?? 2
    const defaultArgs = Object.assign({}, this.rectangle)
    this.reset = () => {
      this.rectangle.x = defaultArgs.x
      this.rectangle.y = defaultArgs.y
      this.#speedX = 4
      this.#speedY = 2
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
    // context.arc(this.#pos.x, this.#pos.y, GameGlobal.RADIUS, 0, 2 * Math.PI)
    context.arc(this.rectangle.x, this.rectangle.y, GameGlobal.RADIUS, 0, 2 * Math.PI)
    context.stroke()
    context.fill()
  }

  /** 运行 */
  run() {
    // 小球运动数据计算
    // this.#pos.x += this.#speedX
    // this.#pos.y += this.#speedY
    this.rectangle.x += this.#speedX
    this.rectangle.y += this.#speedY
  }

  testHitWall(hitedObject) {
    const res = this.rectangle.hitTest(hitedObject)
    if (res === 4 || res === 8) {
      this.#speedX = -this.#speedX
      if (res === 8) vibrate()
    } else if (res === 16 || res === 32) {
      this.#speedY = -this.#speedY
    }
  }

  /** 转变X方向速度的正负值 */
  switchSpeedX() {
    this.#speedX = -this.#speedX
  }
}

export default Ball.getInstance()