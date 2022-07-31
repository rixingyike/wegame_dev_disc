// JS：disc\第4章\4.1\4.1.2\game.js
import './libs/weapp-adapter'

// 画布大小
console.log("画布大小", canvas.width, canvas.height) // Output：375 667
wx.getSystemInfo({
  success: (res) => {
    console.log("屏幕尺寸", res.screenWidth, res.screenHeight)
  }
})

const sysInfo = wx.getSystemInfoSync()
console.log("同步接口获取屏幕尺寸", sysInfo.screenWidth, sysInfo.screenHeight)