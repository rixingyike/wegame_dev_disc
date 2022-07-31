// JS：src\views\background.js
import DrawLineCommand from "../libs/draw_line_command.js"
import ParallelCommandGroup from "../libs/parallel_command_group.js"

/** 背景对象 */
class Background {
  constructor() { }

  /** 渲染 */
  render(context) {
    // 绘制不透明背景
    context.fillStyle = "whitesmoke"
    context.fillRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)

    // 将函数当作变量使用绘制分界线，开始用闭包解决
    context.strokeStyle = "lightgray"
    context.lineWidth = 2
    const startX = GameGlobal.CANVAS_WIDTH / 2
    let posY = 0
      // , set = new Set()
      , drawLineCommandInstance = new DrawLineCommand(context, 0, 0)
      , parallelCommandGroup = new ParallelCommandGroup()
    for (var i = 0; ; i++) {
      if (i % 2) continue // 取模操作，逢奇数跳过
      posY = i * 10
      let y = posY
      const c = {}
      c.__proto__ = drawLineCommandInstance
      c.context = context
      c.startX = startX
      c.startY = y
      // set.add(c)
      parallelCommandGroup.addCommand(c)
      if (posY > GameGlobal.CANVAS_HEIGHT) break
    }
    context.beginPath()
    // for (let c of set) c.execute()
    parallelCommandGroup.execute()
    context.stroke()

    // 实现从上向下颜色渐变绘制游戏标题
    context.font = "800 20px STHeiti"
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