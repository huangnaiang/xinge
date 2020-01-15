/*
 * @Author: xing.wu
 * @Mail: 329106954@qq.com
 * @Date: 2020-01-09 16:08:54
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-15 17:13:43
 */
// android的style
const XingeUntils = require('../const/xinge_const')

class XingeAndroidStyle {
  // 样式表
  constructor() {
    // 通知消息对象的唯一标识（只对信鸽通道生效）
    // 1）大于0：会覆盖先前相同id的消息
    // 2）等于0：展示本条通知且不影响其他消息
    // 3）等于 - 1：将清除先前所有消息，仅展示本条消息
    this.nId = 0
    // 本地通知样式标示，详情见终端文档
    this.builderId = 0
    // 是否有铃声
    // 1）0：没有铃声
    // 1）1：有铃声
    this.ring = 1
    // 为空则是默认铃声,指定Android工程里raw目录中的铃声文件名，不需要后缀名
    this.ringRaw = ''
    // 是否使用震动
    // 1）0：没有震动
    // 2）1：有震动
    this.vibrate = 1
    // 是否使用呼吸灯
    // 1）0：不使用呼吸灯
    // 2）1：使用呼吸灯
    this.lights = 1
    // 通知栏是否可清除，0否，1是
    this.clearable = 1
    // 通知栏图标文件类型，0是本地文件，1是网络图片
    this.iconType = 0
    // 通知栏图片地址，可填本地文件名或图片http地址，为空则是app icon
    this.iconRes = ''
    // 样式表优先级，当样式表与推送样式冲突时，0表示以新设置的推送样式为准，1表示以样式表为准
    this.styleId = 1
    // 状态栏图标文件，为空则是app icon
    this.smallIcon = ''
  }

  // 检测style是否正确
  // eslint-disable-next-line class-methods-use-this
  checkStyle() {
    if (parseInt(this.nId, 0) !== this.nId || this.nId < -1) {
      XingeUntils.handleError('style.nId is invalid')
    }
    if (parseInt(this.builderId, 0) !== this.builderId) {
      XingeUntils.handleError('style.builderId is invalid')
    }
    if (parseInt(this.ring, 0) !== 0 && parseInt(this.ring, 0) !== 1) {
      XingeUntils.handleError('style.ring is invalid')
    }
    // Android本地工程地址不进行检测判断

    if (parseInt(this.vibrate, 0) !== 0 && parseInt(this.vibrate, 0) !== 1) {
      XingeUntils.handleError('style.vibrate is invalid')
    }

    if (parseInt(this.lights, 0) !== 0 && parseInt(this.lights, 0) !== 1) {
      XingeUntils.handleError('style.lights is invalid')
    }
    if (
      parseInt(this.clearable, 0) !== 0 &&
      parseInt(this.clearable, 0) !== 1
    ) {
      XingeUntils.handleError('style.clearable is invalid')
    }
    if (parseInt(this.iconType, 0) !== 0 && parseInt(this.iconType, 0) !== 1) {
      XingeUntils.handleError('style.iconType is invalid')
    }
    // iconRes不予判断

    if (parseInt(this.styleId, 0) !== 0 && parseInt(this.styleId, 0) !== 1) {
      XingeUntils.handleError('style.styleId is invalid')
    }
    // 状态栏图标不与判断
  }
}

module.exports = XingeAndroidStyle
