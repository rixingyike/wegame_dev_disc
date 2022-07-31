// JS：src\managers\audio_manager.js

/** 音频管理者，负责管理背景音乐及控制按钮 */
class AudioManager {
  /** 单例 */
  static getInstance() {
    if (!this.instance) {
      this.instance = new AudioManager()
    }
    return this.instance
  }

  constructor() { }

  /** 背景音乐是否在播放（只读） */
  get bgMusicIsPlaying() {
    return this.#bgAudio.duration > 0 && !this.#bgAudio.paused
  }

  /** 背景音乐对象 */
  #bgAudio = wx.createInnerAudioContext()

  /** 按钮按下态图像Url */
  #musicBtnOnImageUrl
  /** 按钮弹起态图像Url */
  #musicBtnOffImageUrl
  /** 背景音乐按钮的边界 */
  #bgMusicBtnRect
  /** 按钮按下态图像 */
  #musicBtnOnImage
  /** 按钮弹起态图像 */
  #musicBtnOffImage

  /** 初始化 */
  init(options) {
    // 初始化背景音乐按钮的边界
    this.#bgMusicBtnRect = options?.bgMusicBtnRect ?? { x1: 5, y1: 5, x2: 25, y2: 25 }
    // 初始化背景音乐按钮的二态图片地址
    this.#musicBtnOnImageUrl = options.musicBtnOnImageUrl || "static/images/sound_on.png"
    this.#musicBtnOffImageUrl = options.musicBtnOffImageUrl || "static/images/sound_off.png"
    // 背景音乐对象初始化
    this.#bgAudio.src = options.bjAudioSrc || "static/audios/bg.mp3"
    this.#bgAudio.autoplay = true // 加载完成后自动播放
    this.#bgAudio.loop = true // 循环播放
    this.#bgAudio.obeyMuteSwitch = false
  }

  /** 渲染 */
  render(context) {
    this.#drawBgMusicButton(context)
  }

  /** 触摸结束事件回调函数 */
  onTouchEnd(res) {
    // 切换背景音乐按钮的状态
    const touch = res.changedTouches[0] || { clientX: 0, clientY: 0 }
    const pos = { x: touch.clientX, y: touch.clientY } // offsetX、offsetY不复存在
    if (pos.x > this.#bgMusicBtnRect.x1 && pos.x < this.#bgMusicBtnRect.x2 && pos.y > this.#bgMusicBtnRect.y1 && pos.y < this.#bgMusicBtnRect.y2) {
      console.log("单击了背景音乐按钮")
      this.bgMusicIsPlaying ? this.stopBackgroundSound() : this.playBackgroundSound()
    }
  }

  /** 播放背景音乐 */
  playBackgroundSound() {
    this.#bgAudio.seek(0)
    this.#bgAudio.play()
  }

  /** 停止背景音乐 */
  stopBackgroundSound() {
    this.#bgAudio.stop()
  }

  /** 依据播放状态绘制背景音乐按钮 */
  #drawBgMusicButton(context) {
    const img = this.bgMusicIsPlaying ? this.#musicBtnOnImage : this.#musicBtnOffImage
    const draw = img => context.drawImage(img, 0, 0, 28, 28, this.#bgMusicBtnRect.x1, this.#bgMusicBtnRect.y1, this.#bgMusicBtnRect.x2, this.#bgMusicBtnRect.y2)
    if (img) {
      draw(img)
    } else {
      const img = wx.createImage()
      this.bgMusicIsPlaying ? this.#musicBtnOnImage = img : this.#musicBtnOffImage = img
      img.src = this.bgMusicIsPlaying ? this.#musicBtnOnImageUrl : this.#musicBtnOffImageUrl
      img.onload = () => draw(img)
    }
  }
}

export default AudioManager.getInstance()