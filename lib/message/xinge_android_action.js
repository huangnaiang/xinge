/*
 * @Author: xing.wu
 * @Mail: 329106954@qq.com
 * @Date: 2020-01-15 17:13:33
 * @Last Modified by:   xing,wu
 * @Last Modified time: 2020-01-15 17:13:33
 */
const { XingeActionType } = require('../const/xinge_const')
const XingeUntils = require('../const/xinge_const')

class XingeAndroidAction {
  constructor() {
    /*
     点击后的动作
     XingeActionType.activity    打开Activity或APP
     XingeActionType.browser      打开浏览器
     XingeActionType.intent       打开intent
     */
    this.actionType = XingeActionType.activity

    // 要打开的app或者activity,当actionType ＝ XingeActionType.activity 生效
    this.activity = ''
    // 当actionType ＝ XingeActionType.activity生效
    this.atyAttr = {
      // Intent的Flag属性
      if: '',
      // PendingIntent的Flag属性
      pf: ''
    }

    // 当actionType ＝ ACTION_TYPE_BROWSER生效
    this.browser = {
      // 要打开的url
      url: '',
      // 是否需要用户确认，0为否，1为是
      confirm: 0
    }

    // 要打开的intent,当actionType ＝ XingeActionType.intent生效
    // SDK版本需要大于等于3.2.3，然后在客户端的intent配置data标签，并设置scheme属性
    this.intent = ''
  }

  formatAction() {
    const action = {
      action_type: this.actionType
    }

    switch (action.action_type) {
      default:
      case XingeActionType.activity:
        if (this.activity.trim() !== '') {
          action.activity = this.activity.trim()
        }
        if (this.atyAttr.if.trim() !== '' || this.atyAttr.pf.trim() !== '') {
          action.aty_attr = {
            if: this.atyAttr.if.trim(),
            pf: this.atyAttr.pf.trim()
          }
        }
        break
      case XingeActionType.browser:
        if (this.browser.url.trim() !== '') {
          action.browser = {
            url: this.browser.url.trim(),
            confirm: parseInt(this.browser.confirm, 0)
          }
        }
        break
      case XingeActionType.intent:
        if (this.intent.trim() !== '') {
          action.intent = this.intent.trim()
        }
        break
    }

    return action
  }

  checkAction() {
    // 校验action
    if (
      this.actionType !== XingeActionType.activity &&
      this.actionType !== XingeActionType.browser &&
      this.actionType !== XingeActionType.intent
    ) {
      XingeUntils.handleError('action.actionType is invalid')
    }
  }
}

module.exports = XingeAndroidAction
