// JS：src\views\background.js
import DrawLineCommand from "../libs/draw_line_command.js"
import ParallelCommandGroup from "../libs/parallel_command_group.js"
import FlyweightFactory from "../libs/flyweight_factory.js"
import fontMgr from "../managers/font_manager.js"

/** 背景对象 */
class Background {
  constructor() { }

  #img

  init(options) {
    const img = wx.createImage()
    img.src = options?.bgImageUrl ?? "https://cloud-1252822131.cos.ap-beijing.myqcloud.com/images/bg.png"
    img.onload = () => {
      this.#img = img
    }
    fontMgr.init()
  }

  /** 渲染 */
  render(context) {
    // 绘制背景图片与不透明背景
    if (this.#img) {
      const dw = GameGlobal.CANVAS_WIDTH
        , dh = GameGlobal.CANVAS_HEIGHT
        , sh = this.#img.height
        , sw = sh * dw / dh
        , sx = (this.#img.width - sw) / 2
      context.drawImage(this.#img, sx, 0, sw, sh, 0, 0, dw, dh)
    } else {
      context.fillStyle = "whitesmoke"
      context.fillRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)
    }

    // 绘制分界线
    context.strokeStyle = "lightgray"
    context.lineWidth = 2
    const startX = GameGlobal.CANVAS_WIDTH / 2
    let posY = 0
      , parallelCommandGroup = FlyweightFactory.create(`bgDrawLineParallelGroup${~~(Math.random(10) * 10)}`, {}, () => new ParallelCommandGroup())
    for (var i = 0; ; i++) {
      if (i % 2) continue // 取模操作，逢奇数跳过
      posY = i * 10
      let y = posY
      parallelCommandGroup.addCommand(FlyweightFactory.create(`bgDrawLineCommand${i}`, { startX, y }, () => new DrawLineCommand(context, startX, y)))
      if (posY > GameGlobal.CANVAS_HEIGHT) break
    }
    context.beginPath()
    parallelCommandGroup.once("complete", () => parallelCommandGroup.reset())
    parallelCommandGroup.execute()
    context.stroke()

    // 绘制游戏标题
    // context.font = "800 20px STHeiti"
    context.font = `800 20px ${fontMgr.fontFamily}`
    const txtWidth = context.measureText("挡板小游戏").width
    const txtHeight = context.measureText("M").width
    const xpos = (GameGlobal.CANVAS_WIDTH - txtWidth) / 2
    const ypos = (GameGlobal.CANVAS_HEIGHT - txtHeight) / 2
    context.fillStyle = "gray"
    context.textBaseline = "top" // 设置文本绘制基线
    context.fillText("挡板小游戏", xpos, ypos)
  }
}

export default new Background()