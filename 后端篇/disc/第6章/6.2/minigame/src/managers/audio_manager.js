// JS：src\managers\audio_manager.js
import EventDispatcher from "../libs/event_dispatcher.js"
import Task from "../libs/task.js"
import FlyweightFactory from "../libs/flyweight_factory.js"
import { promisify } from "../utils.js"

/** 音频管理者，负责管理背景音乐及控制按钮 */
class AudioManager extends EventDispatcher {
  /** 单例 */
  static getInstance() {
    if (!this.instance) {
      this.instance = new AudioManager()
    }
    return this.instance
  }

  // constructor() { }

  /** 背景音乐是否在播放（只读） */
  get bgMusicIsPlaying() {
    return this.#bgAudio.duration > 0 && !this.#bgAudio.paused
  }
  /** 背景音乐对象 */
  #bgAudio // = wx.createInnerAudioContext()
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
    const bgAudioUrl = options.bjAudioSrc || "static/audios/bg2.mp3"
    this.#bgAudio = FlyweightFactory.create(`audio${encodeURIComponent(bgAudioUrl)}`, { src: bgAudioUrl, autoplay: false, loop: true }, () => wx.createInnerAudioContext())
    // 监听播放单击音频的任务
    const onTask = task => {
      if (task.isDone) return
      task.isDone = true

      const { name: taskName, audioName } = task
      let source = (() => {
        switch (taskName) {
          case Task.PLAY_HIT_AUDIO:
          case Task.PLAY_BG_AUDIO:
            return "play"
          case Task.STOP_HIT_AUDIO:
          case Task.STOP_BG_AUDIO:
          default:
            return "stop"
        }
      })()

      switch (audioName) {
        case "bg2":
          source += "/bg/static/audios/bg2.mp3"
          break
        case "bg": // 默认背景音乐
          source += "/bg/static/audios/bg.mp3"
          break
        case "hit2":
          source += "/small/static/audios/click2.mp3"
          break
        case "hit": // 默认单击音乐
        default:
          source += "/small/static/audios/click.mp3"
      }

      this.play(source)
    }
    this.on(Task.PLAY_HIT_AUDIO, onTask)
    this.on(Task.STOP_HIT_AUDIO, onTask)
    this.on(Task.PLAY_BG_AUDIO, onTask)
    this.on(Task.STOP_BG_AUDIO, onTask)

    // 监听音频中断事件的开始与结束
    wx.onAudioInterruptionBegin((res) => {
      console.log("音频中断开始，背景音乐停止了")
    })
    wx.onAudioInterruptionEnd((res) => {
      console.log("音频中断结束，背景音乐开始恢复")
      if (this.#bgAudio.paused) this.#bgAudio.play()
    })
  }

  /** 
   * 播放或停止一个声音，source格式：[play|stop]/[bg|small]/audio_url
   * 
   * 可用的单击音效有：
   * "static/audios/click.mp3"
   * "static/audios/click2.mp3"
   * 
   * 背景音乐有：
   * "static/audios/bg.mp3"
   * "static/audios/bg2.mp3"
   */
  play(source) {
    const arr = /^(stop|play)?\/(bg|small)\/(\S+)?$/.exec(source)
    if (arr) {
      const action = arr[1] // play or stop
        , isBgAudio = arr[2] === "bg"
        , audioUrl = arr[3] // 音频文件网络地址
        , innerAudioContext = FlyweightFactory.create(`audio${encodeURIComponent(audioUrl)}`, { src: audioUrl }, () => wx.createInnerAudioContext())

      if (action === "play") {
        if (!innerAudioContext.listenedEvent) {
          innerAudioContext.onError(err => console.log(`play audio error:${err}`))
          innerAudioContext.listenedEvent = true
        }
        if (isBgAudio) {
          innerAudioContext.autoplay = true
          innerAudioContext.loop = true
        }
        innerAudioContext.seek(0)
        // innerAudioContext.play()
        promisify(innerAudioContext.play)().catch(console.log)
      } else if (action === "stop") {
        innerAudioContext.stop()
      }
    }
  }

  /** 渲染 */
  render(context) {
    this.#drawBgMusicButton(context)
  }

  /** 触摸结束事件回调函数 */
  onTouchEnd(res) {
    // 切换背景音乐按钮的状态
    const touch = res.changedTouches[0] || { clientX: 0, clientY: 0 }
    const pos = { x: touch.clientX, y: touch.clientY }
    if (pos.x > this.#bgMusicBtnRect.x1 && pos.x < this.#bgMusicBtnRect.x2 && pos.y > this.#bgMusicBtnRect.y1 && pos.y < this.#bgMusicBtnRect.y2) {
      console.log("单击了背景音乐按钮")
      this.bgMusicIsPlaying ? this.stopBackgroundSound() : this.playBackgroundSound()
    }
  }

  /** 播放背景音乐 */
  playBackgroundSound() {
    // this.#bgAudio.seek(0)
    // this.#bgAudio.play()
    this.play("play/bg/static/audios/bg2.mp3")
    // new Task(Task.PLAY_BG_AUDIO, this, "bg2").execute()
  }

  /** 停止背景音乐 */
  stopBackgroundSound() {
    // this.#bgAudio.stop()
    this.play("stop/bg/static/audios/bg2.mp3")
    // new Task(Task.STOP_BG_AUDIO, this, "bg2").execute()
  }

  /** 播放单击音效 */
  playHitAudio() {
    // const audio = wx.createInnerAudioContext()
    // audio.src = "static/audios/click.mp3"
    // audio.play()
    this.play("play/small/static/audios/click.mp3")
    // new Task(Task.PLAY_HIT_AUDIO, this, "hit").execute()
    // this.play("play/small/static/audios/click2.mp3")
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