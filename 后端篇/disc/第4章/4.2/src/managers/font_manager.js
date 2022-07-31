// JS：src\managers\font_manager.js
import { promisify } from "../utils.js"

/** 字体管理者 */
class FontManager {
  // 字体
  get fontFamily() {
    return this.#fontFamily
  }
  #fontFamily = "STHeiti"

  async init(options) {
    if (!!this.initialized) return; this.initialized = true

    // 加载并使用自定义字体
    const res = await promisify(wx.downloadFile)({
      url: options?.webFontUrl ?? "https://cloud-1252822131.cos.ap-beijing.myqcloud.com/fonts/webfont.ttf"
    })
    if (res.statusCode === 200 && res.errMsg === "downloadFile:ok") {
      const fontFamily = wx.loadFont(res.tempFilePath)
      console.log("已加载自定义字体", fontFamily) // Farrington-7B-Qiqi
      if (fontFamily) {
        this.#fontFamily = fontFamily
      }
    }
  }
}

export default new FontManager()