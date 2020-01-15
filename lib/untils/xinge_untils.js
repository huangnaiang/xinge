/*
 * @Author: xing.wu
 * @Mail: 329106954@qq.com
 * @Date: 2020-01-09 13:44:45
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-15 17:13:28
 */
// 信鸽的工具类
const util = require('util')
const request = require('request')
const { XingeEnv } = require('../const/xinge_const')
const TimeIntervalV3 = require('../message/xinge_android_timeinterval')

class XingeUntils {
  static handleError(message = '') {
    throw new Error(message)
  }

  static checkAccessId(accessId) {
    if (parseInt(accessId, 0) !== accessId) {
      XingeUntils.handleError('accessId is invalid')
    }
    return true
  }

  static checkString(secretKey) {
    if (typeof secretKey !== 'string' || secretKey.trim().length === 0) {
      return false
    }
    return true
  }

  static checkArray(array) {
    if (!util.isArray(array) || array.length === 0) {
      return false
    }
    return true
  }

  static checkObject(obj) {
    if (typeof obj !== 'object') {
      return false
    }
    if (Object.keys(obj).length === 0) {
      return false
    }
    return true
  }

  static checkEnv(env) {
    if (env !== XingeEnv.product && env !== XingeEnv.dev) {
      return false
    }
    return true
  }

  /**
   * 判断Android自定义参数
   * @param {object} customContent
   */
  static checkCustomContent(customContent) {
    let isValid = true

    if (typeof customContent !== 'object') {
      isValid = false
    } else {
      for (const key in customContent) {
        if (typeof customContent[key] !== 'string') {
          isValid = false
          break
        }
      }
    }
    return isValid
  }

  static checkLoopTimes(loopTimes) {
    let isValid = true
    if (loopTimes !== null && parseInt(loopTimes, 0) !== loopTimes) {
      isValid = false
    }
    //  TODO:添加参数范围设置,1-15

    return isValid
  }

  static checkloopInterval(loopInterval) {
    let isValid = true
    if (loopInterval !== null && parseInt(loopInterval, 0) !== loopInterval) {
      isValid = false
    }
    //  TODO:添加参数范围设置,1-14

    return isValid
  }

  static checkAccountPushType(accountPushType) {
    let isValid = true
    if (
      accountPushType !== null &&
      (accountPushType !== 0 || accountPushType !== 1)
    ) {
      isValid = false
    }
    return isValid
  }

  // 1）账号类型，参考后面账号说明
  // 2）必须与账号绑定时设定的账号类型一致,因此不做强校验
  static checkAccountType(accountType) {
    let isValid = true
    if (accountType !== null && parseInt(accountType, 0) !== accountType) {
      isValid = false
    }
    return isValid
  }

  static checkSeq(seq) {
    let isValid = true
    if (seq !== null && parseInt(seq, 0) !== seq) {
      isValid = false
    }
    return isValid
  }

  static checkAccessTime(acceptTime) {
    let isValid = true

    if (!util.isArray(acceptTime)) {
      isValid = false
    } else {
      for (let i = 0; i < acceptTime.length; i += 1) {
        if (!(acceptTime[i] instanceof TimeIntervalV3)) {
          isValid = false
          break
        }
      }
    }

    return isValid
  }

  /**
   * 检查富媒体文件
   * @param {array} mediaResources
   * @return {Boolean}          检查结果
   */
  static checkMediaResources(mediaResources) {
    //
    let isValid = true

    if (!util.isArray(mediaResources)) {
      isValid = false
    } else if (mediaResources.length > 5) {
      isValid = false
    } else {
      for (let i = 0; i < mediaResources.length; i += 1) {
        if (typeof mediaResources[i] !== 'string') {
          isValid = false
          break
        }
      }
    }

    return isValid
  }

  /**
   * 拼接aith授权的字符串
   * @param {string} appid
   * @param {string} secretkey
   */
  static base64Auth(appid, secretkey) {
    const authstring = `${appid}:${secretkey}`
    // eslint-disable-next-line new-cap
    const authBase64 = new Buffer.from(authstring)
    const result = authBase64.toString('base64')
    return result
  }

  // 请求
  static callAPI(api, params, method, timeout, appid, secretKey, callback) {
    // 生成校验码
    const authorization = this.base64Auth(appid, secretKey)
    //
    request(
      {
        url: api,
        // method: 'POST',
        method,
        json: true,
        headers: {
          'content-type': 'application/json',
          Authorization: `Basic ${authorization}`
        },
        body: params
      },
      (error, response, body) => {
        if (error) {
          typeof callback === 'function' && callback(error)
        } else {
          console.log(body) // 请求成功的处理逻辑
          typeof callback === 'function' && callback(null, body)
        }
      }
    )
  }

  // -------------------------------//
  static getCommonOptions(appid, secretKey, method) {
    const authorization = this.base64Auth(appid, secretKey)
    const result = {
      method,
      json: true,
      headers: {
        'content-type': 'application/json',
        Authorization: `Basic ${authorization}`
      }
    }
    return result
  }

  // 格式化信鸽数据
  static formatXingeNeeds(accessId, secretKey, appId) {
    console.log('初始化信鸽push服务')
    // 检测accessId，secretKey，appId
    if (!XingeUntils.checkAccessId(accessId)) {
      XingeUntils.handleError('accessId is invalid')
    }
    if (!XingeUntils.checkString(secretKey)) {
      XingeUntils.handleError('secretKey is invalid')
    } else {
      secretKey = secretKey.trim()
    }
    if (!XingeUntils.checkString(appId)) {
      XingeUntils.handleError('appId is invalid')
    } else {
      appId = appId.trim()
    }
    return { accessId, secretKey, appId }
    // this.accessId = accessId;
    // this.secretKey = secretKey;
    // this.appId = appId;
  }
}
module.exports = XingeUntils
