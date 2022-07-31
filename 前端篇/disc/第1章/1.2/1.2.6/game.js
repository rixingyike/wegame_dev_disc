// JS：disc\第1章\1.2\1.2.6\game.js
import './js/libs/weapp-adapter'

// 获取主画布的渲染上下文对象
let mainContext = canvas.getContext("2d")

// 绘制网络图片
let image = wx.createImage()
image.src = "https://cdn.jsdelivr.net/gh/rixingyike/images/2021/20210829224044小游戏从0到1.png"
mainContext.drawImage(image, 0, 0)