// JS：disc\第3章\3.2\3.2.1_2\index.js
// 获取画布及2D渲染上下文对象
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const radius = 10 // 小球半径，提升为文件常量

// 加载材质填充对象
let panelPattern = "white" // 挡板材质填充对象，默认为白色
const panelHeight = 50
const img = document.getElementById("mood")
img.onload = function () {
  panelPattern = context.createPattern(img, "no-repeat")
}

// 渲染
function render() {
  // 添加阴影效果
  context.shadowBlur = 1
  context.shadowOffsetY = 2
  context.shadowOffsetX = 2
  context.shadowColor = "grey"

  // 绘制不透明背景
  context.fillStyle = "whitesmoke"
  context.fillRect(0, 0, canvas.width, canvas.height)

  // 绘制分界线
  context.strokeStyle = "whitesmoke"
  context.lineWidth = 2
  const startX = canvas.width / 2
  let posY = 0,
    set = new Set()
  for (let i = 0; ; i++) {
    if (i % 2) continue // 取模操作，逢奇数跳过
    posY = i * 10
    set.add(() => {
      let y = posY
      console.log(`posY=${y}`) // Output：posY=160
      drawLine(context, startX, y)
    })
    if (posY > canvas.height) break
  }
  context.beginPath()
  for (let f of set) f() // 循环元素调用函数，这个位置仍然可以访问文件变量 posY
  context.stroke()
  // 独立的绘制直线函数
  function drawLine(context, x, y) {
    context.moveTo(x, y)
    context.lineTo(x, y + 10)
  }

  // 实现从上向下颜色渐变
  context.font = "italic 800 20px STHeiti"
  const txtWidth = context.measureText("挡板小游戏").width
    , txtHeight = context.measureText("M").width
    , xpos = (canvas.width - txtWidth) / 2
    , ypos = (canvas.height - txtHeight) / 2
    , grd = context.createLinearGradient(0, ypos, 0, ypos + txtHeight)
  grd.addColorStop(0, "red") // 添加渐变颜色点
  grd.addColorStop(.5, "white")
  grd.addColorStop(1, "yellow")
  context.fillStyle = grd
  context.textBaseline = "top" // 设置文本绘制基线
  context.fillText("挡板小游戏", xpos, ypos)

  // 绘制右挡板
  const panelHeight = 50
  context.fillStyle = panelPattern
  context.fillRect(canvas.width - 5, (canvas.height - panelHeight) / 2, 5, panelHeight)

  // 绘制左挡板
  context.fillRect(0, (canvas.height - panelHeight) / 2, 5, panelHeight)

  // 依据位置绘制小球
  // const radius = 10
  context.fillStyle = "white"
  context.beginPath()
  context.arc(ballPos.x, ballPos.y, radius, 0, 2 * Math.PI)
  context.fill()
}

// 使用定时器让球动起来
let ballPos = { x: canvas.width / 2, y: canvas.height / 2 } // 球的起始位置是画布中心
// let speedX = 8
// let speedY = 4
let speedX = 2
let speedY = 1

// 小球与墙壁的四周碰撞检查，优化版本
function testHitWall() {
  if (ballPos.x > canvas.width - radius) {// 触达右边界
    speedX = -speedX
  } else if (ballPos.x < radius) {// 触达左边界
    speedX = -speedX
  }
  if (ballPos.y > canvas.height - radius) {// 触达右边界
    speedY = -speedY
  } else if (ballPos.y < radius) {// 触达左边界
    speedY = -speedY
  }
}

// 用定时器实现重绘
// setInterval(function () {
//   context.clearRect(0, 0, canvas.width, canvas.height) // 清除整张画布
//   testHitWall()
//   ballPos.x += speedX // 计算小球新位置
//   ballPos.y += speedY
//   render()
// }, 500)

// 运行
function run() {
  // 清屏
  context.clearRect(0, 0, canvas.width, canvas.height) // 清除整张画布
  testHitWall()
  ballPos.x += speedX
  ballPos.y += speedY
  render()
  requestAnimationFrame(run) // 循环执行
}
run()