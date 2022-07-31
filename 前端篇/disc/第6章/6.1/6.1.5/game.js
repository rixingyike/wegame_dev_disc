// JS：disc\第6章\6.1\6.1.5\game.js
// 获取画布及2D渲染上下文对象
const canvas = wx.createCanvas()
  , context = canvas.getContext("2d")
  // , radius = 15 // 小球半径
  // , panelHeight = 150 // 挡板高度
  // , panelWidth = 10 // 挡板宽度
  // , rightPanelMoveRange = 20 // 右挡板上下移动数值范围    
  , RADIUS = 15 // 小球半径
  , PANEL_HEIGHT = 150 // 挡板高度
  , PANEL_WIDTH = 10 // 挡板宽度
  , RIGHT_PANEL_MOVE_RANGE = 20 // 右挡板上下移动数值范围
  , bgMusicBtnRect = { x1: 5, y1: 5, x2: 25, y2: 25 } // 背景音乐按钮的边界
  , bgAudio = wx.createInnerAudioContext() // 背景音乐对象

let leftPanelY = canvas.height / 2 - PANEL_HEIGHT / 2 // 左挡板变化数据，左挡板的起点Y坐标
  , ballPos = { x: canvas.width / 2, y: canvas.height / 2 } // 球的起始位置是画布中心
  , speedX = 4 // 2
  , speedY = 2 // 1
  , rightPanelY = (canvas.height - PANEL_HEIGHT) / 2 // 右挡板起始位置是居中位置
  , rightPanelSpeedY = 0.5 // 右挡板Y轴方向的移动速度
  , gameOverTimerId // 游戏限时定时器ID
  , userScore = 0 // 用户分数
  , systemScore = 0 // 系统分数
  , gameIsOver = false // 游戏是否结束
  , userAvatarImg // 用户头像 Image 对象
  , panelPattern = "white" // 挡板材质填充对象，默认为白色

// 背景音乐对象初始化
{
  bgAudio.src = "static/audios/bg.mp3"
  bgAudio.autoplay = true // 加载完成后自动播放
  bgAudio.loop = true // 循环播放
}

// 加载材质填充对象
{
  const img = wx.createImage()
  img.onload = function () {
    panelPattern = context.createPattern(img, "repeat")
  }
  img.src = "static/images/mood.png"
}

// 监听触摸结束事件，切换背景音乐按钮的状态与重启游戏
wx.onTouchEnd((res) => {
  // 切换背景音乐按钮的状态
  const touch = res.changedTouches[0] || { clientX: 0, clientY: 0 }
  const pos = { x: touch.clientX, y: touch.clientY } // offsetX、offsetY不复存在
  if (pos.x > bgMusicBtnRect.x1 && pos.x < bgMusicBtnRect.x2 && pos.y > bgMusicBtnRect.y1 && pos.y < bgMusicBtnRect.y2) {
    console.log("单击了背景音乐按钮")
    const bgMusicIsPlaying = bgAudio.currentTime > 0 && !bgAudio.paused
    bgMusicIsPlaying ? stopBackgroundSound() : playBackgroundSound()
  }
  // 重启游戏
  if (gameIsOver) {
    start()
  }
})

// 监听触摸移动事件，控制左挡板
wx.onTouchMove((res) => {
  let touch = res.touches[0] || { clientY: 0 }
  let y = touch.clientY - PANEL_HEIGHT / 2
  if (y > 0 && y < (canvas.height - PANEL_HEIGHT)) { // 溢出检测
    leftPanelY = y
  }
})

// 检查用户授权情况
wx.getSetting({
  success: (res) => {
    const authSetting = res.authSetting
    if (authSetting["scope.userInfo"]) { // 已有授权
      wx.getUserInfo({
        success: (res) => {
          const userInfo = res.userInfo
            , avatarUrl = userInfo.avatarUrl
          console.log("用户头像", avatarUrl)
          downloadUserAvatarImage(avatarUrl) // 加载用户头像
        }
      })
    } else { // 首次进入小游戏或拒绝过授权，需重新授权
      getUserAvatarUrlByUserInfoButton()
    }
  }
})

start()

// 渲染
function render() {
  // 绘制不透明背景
  context.fillStyle = "whitesmoke"
  context.fillRect(0, 0, canvas.width, canvas.height)

  // 将函数当作变量使用绘制分界线，开始用闭包解决
  context.strokeStyle = "lightgray"
  context.lineWidth = 2
  const startX = canvas.width / 2
  let posY = 0,
    set = new Set()
  for (var i = 0; ; i++) {
    if (i % 2) continue // 取模操作，逢奇数跳过
    posY = i * 10
    let y = posY
    set.add(() => {
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

  // 实现从上向下颜色渐变绘制游戏标题
  context.font = "800 20px STHeiti"
  const txtWidth = context.measureText("挡板小游戏").width
  const txtHeight = context.measureText("M").width
  const xpos = (canvas.width - txtWidth) / 2
  const ypos = (canvas.height - txtHeight) / 2
  context.fillStyle = "gray"
  context.textBaseline = "top" // 设置文本绘制基线
  context.fillText("挡板小游戏", xpos, ypos)

  // 绘制右挡板
  drawPanel(context, canvas.width - PANEL_WIDTH, rightPanelY, panelPattern, PANEL_HEIGHT)

  // 绘制左挡板
  drawPanel(context, 0, leftPanelY, panelPattern, PANEL_HEIGHT)

  // 绘制角色分数
  context.font = "100 12px STHeiti"
  context.fillStyle = "gray"
  drawText(context, 20, canvas.height - 20, `用户 ${userScore}`)
  const sysScoreText = `系统 ${systemScore}` // 使用模板字符串
  drawText(context, canvas.width - 20 - context.measureText(sysScoreText).width, canvas.height - 20, sysScoreText)

  // 依据位置绘制小球
  context.fillStyle = "white"
  context.strokeStyle = "gray"
  context.lineWidth = 2
  context.beginPath()
  context.arc(ballPos.x, ballPos.y, RADIUS, 0, 2 * Math.PI)
  context.stroke()
  context.fill()

  // 调用函数绘制背景音乐按钮
  drawBgMusicButton()

  // 绘制用户头像到画布上
  if (userAvatarImg) context.drawImage(userAvatarImg, 40, 5, 45, 45)
}

// 绘制背景音乐按钮
function drawBgMusicButton() {
  const img = wx.createImage()
  let bgMusicIsPlaying = bgAudio.currentTime > 0 && !bgAudio.paused
  if (bgMusicIsPlaying) {
    img.src = "static/images/sound_on.png"
  } else {
    img.src = "static/images/sound_off.png"
  }
  context.drawImage(img, 0, 0, 28, 28, bgMusicBtnRect.x1, bgMusicBtnRect.y1, bgMusicBtnRect.x2, bgMusicBtnRect.y2)
}

// 在指定位置绘制文本
function drawText(context, x, y, text) {
  context.fillText(text, x, y)
}

function drawPanel(context, x, y, pat, height, width = PANEL_WIDTH) {
  context.fillStyle = pat
  context.fillRect(x, y, width, height)
}

// 小球与墙壁的四周碰撞检查，优化版本
function testHitWall() {
  if (ballPos.x > canvas.width - RADIUS) {// 触达右边界
    speedX = -speedX
  } else if (ballPos.x < RADIUS) {// 触达左边界
    speedX = -speedX
  }
  if (ballPos.y > canvas.height - RADIUS) {// 触达右边界
    speedY = -speedY
  } else if (ballPos.y < RADIUS) {// 触达左边界
    speedY = -speedY
  }
}

// 运行
function run() {
  // 清屏
  context.clearRect(0, 0, canvas.width, canvas.height) // 清除整张画布
  testHitPanel()
  testHitWall()
  // 小球运动数据计算
  ballPos.x += speedX
  ballPos.y += speedY
  // 右挡板运动数据计算
  rightPanelY += rightPanelSpeedY
  const centerY = (canvas.height - PANEL_HEIGHT) / 2
  if (rightPanelY < centerY - RIGHT_PANEL_MOVE_RANGE || rightPanelY > centerY + RIGHT_PANEL_MOVE_RANGE) {
    rightPanelSpeedY = -rightPanelSpeedY
  }
  render()
  if (!gameIsOver) {
    requestAnimationFrame(run) // 循环执行
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height) // 清屏
    context.fillStyle = "whitesmoke" // 绘制背景色
    context.fillRect(0, 0, canvas.width, canvas.height)
    const txt = "游戏结束"
    context.font = "900 26px STHeiti"
    context.fillStyle = "black"
    context.textBaseline = "middle"
    drawText(context, canvas.width / 2 - context.measureText(txt).width / 2, canvas.height / 2, txt)
    // 提示用户单击屏幕重启游戏
    const restartTip = "单击屏幕重新开始"
    context.font = "12px FangSong"
    context.fillStyle = "gray"
    drawText(context, canvas.width / 2 - context.measureText(restartTip).width / 2, canvas.height / 2 + 25, restartTip)
    stopBackgroundSound()
    // 游戏结束的模态弹窗提示
    wx.showModal({
      title: "游戏结束",
      content: "单击【确定】重新开始",
      success(res) {
        if (res.confirm) {
          start()
        }
      }
    })
  }
}

// 重新开始游戏
function start() {
  playHitAudio()
  userScore = 0 // 重设游戏变量
  systemScore = 0
  gameIsOver = false
  ballPos = { x: canvas.width / 2, y: canvas.height / 2 } // 重设小球位置
  run()
  playBackgroundSound()
  // 限制游戏时间
  gameOverTimerId = setTimeout(function () {
    gameIsOver = true
  }, 1000 * 30)
}

// 播放背景音乐
function playBackgroundSound() {
  bgAudio.seek(0)
  bgAudio.play()
}

// 停止背景音乐
function stopBackgroundSound() {
  bgAudio.stop()
}

// 挡板碰撞检测
function testHitPanel() {
  if (ballPos.x > (canvas.width - RADIUS - PANEL_WIDTH)) { // 碰撞右挡板
    if (ballPos.y > rightPanelY && ballPos.y < (rightPanelY + PANEL_HEIGHT)) {
      speedX = -speedX
      console.log("当！碰撞了右挡板")
      systemScore++
      checkScore()
      playHitAudio()
    }
  } else if (ballPos.x < RADIUS + PANEL_WIDTH) { // 触达左挡板
    if (ballPos.y > leftPanelY && ballPos.y < (leftPanelY + PANEL_HEIGHT)) {
      speedX = -speedX
      console.log("当！碰撞了左挡板")
      userScore++
      checkScore()
      playHitAudio()
      // 玩家得分提示
      wx.showToast({
        title: "1分",
        duration: 1000,
        mask: true,
        icon: "none",
        // image: "static/images/add.png",
        image: "static/images/add64.png"
      })
    }
  }
}

// 播放单击音效
function playHitAudio() {
  const audio = wx.createInnerAudioContext()
  audio.src = "static/audios/click.mp3"
  audio.play()
}

// 依据分数判断游戏状态是否结束
function checkScore() {
  if (systemScore >= 3 || userScore >= 1) { // 逻辑或运算
    gameIsOver = true // 游戏结束
    clearTimeout(gameOverTimerId) // 清除定时器ID
    console.log("游戏结束了")
  }
}

// 从头像地址加载用户头像
function downloadUserAvatarImage(avatarUrl) {
  const img = wx.createImage()
  img.src = avatarUrl
  img.onload = (res) => {
    userAvatarImg = img // 加载完成后赋值用户头像图像变量
  }
}

// 通过 UserInfoButton 拉取用户头像地址
function getUserAvatarUrlByUserInfoButton() {
  const userInfoButton = wx.createUserInfoButton({
    type: "text",
    text: "拉取用户信息",
    style: {
      left: 40,
      top: 5,
      width: 100,
      height: 25,
      lineHeight: 25,
      backgroundColor: "#ff0000",
      color: "#ffffff",
      textAlign: "center",
      fontSize: 14,
      borderRadius: 4
    }
  })
  userInfoButton.onTap((res) => {
    if (res.errMsg === "getUserInfo:ok") {
      const userInfo = res.userInfo
        , avatarUrl = userInfo.avatarUrl
      console.log("用户头像", avatarUrl)
      downloadUserAvatarImage(avatarUrl) // 加载用户头像
      userInfoButton.destroy()
    } else {
      console.log("接口调用失败", res.errMsg)
    }
  })
}