// JS：src\views\user_board_boxed.js
import Board from "board.js"
import Component from "component.js"

/** 用户头像组件 */
class UserAvatar extends Component {
  constructor(userAvatarImg) {
    super()
    // this.#userAvatarImg = userAvatarImg
    this.width = this.height = 45
    this.render = context => {
      // 取相对定位的位置
      const x = this.getOffsetXToWindow()
        , y = this.getOffsetYToWindow()
      context.drawImage(userAvatarImg, x, y, this.width, this.height)
    }
  }

  /** 用户头像 Image 对象 */
  // #userAvatarImg

  // render(context) {
  //   // 取相对定位的位置
  //   const x = this.getOffsetXToWindow()
  //     , y = this.getOffsetYToWindow()
  //   context.drawImage(this.#userAvatarImg, x, y, this.width, this.height)
  // }
}

/** 用户分数文本组件 */
class UserScoreText extends Component {
  constructor(drawText) {
    super()
    this.render = context => {
      // 取相对定位的位置
      const x = this.getOffsetXToWindow()
        , y = this.getOffsetYToWindow()
        , scoreText = `用户 ${this.parentElement.score}`
      context.font = "100 12px STHeiti"
      context.fillStyle = "gray"
      drawText(context, x, y, scoreText)
      // 文本变化后重新测算文本所占的区域大小
      this.width = context.measureText(scoreText).width
      this.height = context.measureText("M").width
    }
  }
}

/** 用户记分板，代替user_board.js的另一种实现 */
class UserBoard extends Board {
  constructor() {
    super()
  }

  /** 用户头像 Image 对象 */
  // #userAvatarImg

  /** 初始化 */
  init(options) {
    // 检查用户授权情况，拉取用户头像并绘制
    wx.getSetting({
      success: (res) => {
        const authSetting = res.authSetting
        if (authSetting["scope.userInfo"]) { // 已有授权
          wx.getUserInfo({
            success: (res) => {
              const userInfo = res.userInfo
                , avatarUrl = userInfo.avatarUrl
              console.log("用户头像", avatarUrl)
              this.#downloadUserAvatarImage(avatarUrl) // 加载用户头像
            }
          })
        } else { // 首次进入小游戏或拒绝过授权，需重新授权
          this.#getUserAvatarUrlByUserInfoButton()
        }
      }
    })

    // 初始化用户分数文本子元素
    this.addElement(new UserScoreText(this.drawText))
    // 设置盒子坐标偏移量
    this.x = 45
    this.y = 15
  }

  /** 初始化 */
  // render(context) {
  //   // 绘制角色分数
  //   context.font = "100 12px STHeiti"
  //   context.fillStyle = "gray"
  //   this.drawText(context, 20, GameGlobal.CANVAS_HEIGHT - 20, `用户 ${this.score}`)

  //   // 绘制用户头像到画布上
  //   if (this.#userAvatarImg) context.drawImage(this.#userAvatarImg, 40, 5, 45, 45)
  // }

  /** 从头像地址加载用户头像 */
  #downloadUserAvatarImage(avatarUrl) {
    const img = wx.createImage()
    img.src = avatarUrl
    img.onload = (res) => {
      // this.#userAvatarImg = img // 加载完成后赋值用户头像图像变量
      this.addElement(new UserAvatar(img), 0)
    }
  }

  /** 通过 UserInfoButton 拉取用户头像地址 */
  #getUserAvatarUrlByUserInfoButton() {
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
        borderRADIUS: 4
      }
    })

    userInfoButton.onTap((res) => {
      if (res.errMsg === "getUserInfo:ok") {
        const userInfo = res.userInfo
          , avatarUrl = userInfo.avatarUrl
        console.log("用户头像", avatarUrl)
        this.#downloadUserAvatarImage(avatarUrl) // 加载用户头像
        userInfoButton.destroy()
      } else {
        console.log("接口调用失败", res.errMsg)
      }
    })
  }
}

export default new UserBoard()