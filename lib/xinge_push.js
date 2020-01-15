/*
 * @Author: xing.wu
 * @Date: 2020-01-09 13:43:25
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-14 18:31:18
 */

const XingeUntils = require('./untils/xinge_untils')
const XingeAndroidMessage = require('./message/xinge_android_message')
const XingeIOSMessage = require('./message/xinge_ios_message')
const {
  XingePlatform,
  XingeAudienceType,
  XingeMessageType,
  XingeUrls,
  XingeTagOperation
} = require('./const/xinge_const')
// 信鸽推送相关
class XingePush {
  /**
   *
   * @param {int} accessId  应用的唯一标识符，在提交应用时管理系统返回
   * @param {string} secretKey 应用的secret key，可在配置信息中查看
   * @param {string} appId 应用的appId，可在配置信息中查看
   * @param {array} tokens 信鸽的tokenlist
   * @param {AndroidMessage/IOSMessage} message
   * @param {XingeEnv} environment ios必须
   * @param {func} callback 回调函数
   */
  // eslint-disable-next-line class-methods-use-this
  static pushToTokens(
    { accessId, secretKey, appId },
    tokens,
    message,
    environment,
    callback
  ) {
    XingeUntils.formatXingeNeeds(accessId, secretKey, appId)
    // 校验tokens
    if (!XingeUntils.checkArray(tokens)) {
      XingeUntils.handleError('tokens is invalid')
    } else {
      for (let i = 0; i < tokens.length; i += 1) {
        tokens[i] += ''
        tokens[i] = tokens[i].trim()
        if (tokens[i].length === 0) {
          XingeUntils.handleError('tokens is invalid')
        }
      }
    }
    // 校验message
    if (
      !(message instanceof XingeAndroidMessage) &&
      !(message instanceof XingeIOSMessage)
    ) {
      XingeUntils.handleError('message is invalid')
    }
    // 校验环境
    if (
      message instanceof XingeIOSMessage &&
      !XingeUntils.checkEnv(environment)
    ) {
      XingeUntils.handleError('environment is invalid')
    }
    // // 如果是Android，可能使用的人不会传environment，需要改变callback参数的位置
    // if (message instanceof XingeAndroidMessage && arguments.length === 3) {
    //   // callback = arguments[2];
    //   callback = environment;
    // }
    const param = this.commonParam(message, environment)
    // 设置推送方式
    param.audience_type = XingeAudienceType.token_list
    // 设置批量推送用的token
    param.token_list = tokens
    XingeUntils.callAPI(
      XingeUrls.API_PUSH,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  /**
   *
   * @param {array} tags taglist
   * @param {XingeTagOperation} tagOperation 与和或的关系
   * @param {AndroidMessage/IOSMessage} message
   * @param {XingeEnv} enviroment ios必须
   * @param {func} callback
   */
  // eslint-disable-next-line class-methods-use-this
  static pushToTags(
    { accessId, secretKey, appId },
    tags,
    tagOperation,
    message,
    environment,
    callback
  ) {
    XingeUntils.formatXingeNeeds(accessId, secretKey, appId)
    // 检验tags
    if (!XingeUntils.checkArray(tags)) {
      XingeUntils.handleError('tags is invalid')
    } else {
      for (let i = 0; i < tags.length; i += 1) {
        tags[i] += ''
        tags[i] = tags[i].trim()
        if (tags[i].length === 0) {
          XingeUntils.handleError('tags is invalid')
        }
      }
    }
    // 检验tagOperation
    if (
      tagOperation !== XingeTagOperation.and &&
      tagOperation !== XingeTagOperation.or
    ) {
      XingeUntils.handleError('tagOperation is invalid')
    }
    // 校验message
    if (
      !(message instanceof XingeAndroidMessage) &&
      !(message instanceof XingeIOSMessage)
    ) {
      XingeUntils.handleError('message is invalid')
    }
    // 校验环境
    if (
      message instanceof XingeIOSMessage &&
      !XingeUntils.checkEnv(environment)
    ) {
      XingeUntils.handleError('environment is invalid')
    }
    // 构造请求参数
    const param = this.commonParam(message, environment)
    // 设置推送方式
    param.audience_type = XingeAudienceType.tag
    // 设置批量推送用的token
    param.tag_list = {
      tags,
      op: tagOperation
    }
    XingeUntils.callAPI(
      XingeUrls.API_PUSH,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // eslint-disable-next-line class-methods-use-this
  static pushToAccounts(
    { accessId, secretKey, appId },
    accounts,
    message,
    environment,
    callback
  ) {
    XingeUntils.formatXingeNeeds(accessId, secretKey, appId)
    // 检验accounts
    if (!XingeUntils.checkArray(accounts)) {
      XingeUntils.handleError('accounts is invalid')
    } else {
      for (let i = 0; i < accounts.length; i += 1) {
        accounts[i] += ''
        accounts[i] = accounts[i].trim()
        if (accounts[i].length === 0) {
          XingeUntils.handleError('accounts is invalid')
        }
      }
    }
    // 检测message
    if (
      !(message instanceof XingeAndroidMessage) &&
      !(message instanceof XingeIOSMessage)
    ) {
      XingeUntils.handleError('message is invalid')
    }
    // 校验环境
    if (
      message instanceof XingeIOSMessage &&
      !XingeUntils.checkEnv(environment)
    ) {
      XingeUntils.handleError('environment is invalid')
    }
    // 构造请求参数
    const param = this.commonParam(message, environment)
    param.audience_type = XingeAudienceType.account_list
    param.account_list = accounts
    param.push_id = '0'
    XingeUntils.callAPI(
      XingeUrls.API_PUSH,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  static pushToAll(
    { accessId, secretKey, appId },
    message,
    environment,
    callback
  ) {
    XingeUntils.formatXingeNeeds(accessId, secretKey, appId)
    // 检测message
    if (
      !(message instanceof XingeAndroidMessage) &&
      !(message instanceof XingeIOSMessage)
    ) {
      XingeUntils.handleError('message is invalid')
    }
    // 校验环境
    if (
      message instanceof XingeIOSMessage &&
      !XingeUntils.checkEnv(environment)
    ) {
      XingeUntils.handleError('environment is invalid')
    }
    // 构造请求参数
    const param = this.commonParam(message, environment)
    param.audience_type = XingeAudienceType.all
    param.push_id = '0'
    XingeUntils.callAPI(
      XingeUrls.API_PUSH,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 公共类参数构造
  // eslint-disable-next-line class-methods-use-this
  static commonParam(message, environment) {
    // 校验message
    const param = {}
    if (message instanceof XingeAndroidMessage) {
      param.platform = XingePlatform.android
      param.multi_pkg = message.multiPkg
    } else {
      param.platform = XingePlatform.ios
      param.environment = environment
    }
    // 设置推送方式，是应用内推送还是非应用内推送（普通/静默透传）
    param.message_type = message.messageType
    if (param.message_type === XingeMessageType.notify) {
      // 通知
      param.message = {}
      param.message.title = message.title
      param.message.content = message.content
      // 判断Android还是ios
      if (message instanceof XingeAndroidMessage) {
        // TODOandroid
        const mess = message.format()
        param.message.android = mess.android
      } else if (message instanceof XingeIOSMessage) {
        const mess = message.format()
        param.message.ios = mess.ios
      }
    } else {
      // TODO:放静默
    }

    // ------------------可选参数------------------//
    //     消息离线存储时间（单位为秒）,最长72小时
    // 1）若expire_time=0，则表示实时消息
    // 2）若expire_time大于0且小于800s，则系统会重置为800s
    // 3）若expire_time>=800s，按实际设置时间存储，最长72小时
    // 4)设置的最大值不得超过2147483647，否则会导致推送失败
    param.expire_time = message.expireTime
    //     指定推送时间
    // 1）格式为yyyy-MM-DD HH:MM:SS
    // 2）若小于服务器当前时间，则会立即推送
    // 3）仅全量推送和标签推送支持此字段
    if (
      message.messageType === XingeAudienceType.all ||
      message.messageType === XingeAudienceType.tag
    ) {
      param.send_time = message.sendTime
      // 重复推送
      //  循环任务重复次数
      // 1）仅支持全推、标签推
      // 2）建议取值[1, 15]
      // 循环执行消息下发的间隔
      // 1）必须配合loop_times使用
      // 2）以天为单位，取值[1, 14]
      // 3）loop_times和loop_interval一起表示消息下发任务的循环规则
      if (
        // eslint-disable-next-line eqeqeq
        parseInt(message.loopTimes, 0) == message.loopTimes &&
        // eslint-disable-next-line eqeqeq
        parseInt(message.loopInterval, 0) == message.loopInterval
      ) {
        param.loop_times = parseInt(message.loopTimes, 0)
        param.loop_interval = parseInt(message.loopInterval, 0)
      }
    }
    // 角标设置 统计标签，用于聚合统计
    // 使用场景(示例)：现在有一个活动id：active_picture_123，
    // 需要给10000个设备通过单推接口（或者列表推送等推送形式）下发消息，
    // 同时设置该字段为active_picture_123，推送完成之后可以使用v3统计查询接口，
    // 根据该标签active_picture_123 查询这10000个设备的实发、抵达、展示、点击数据

    param.stat_tag = message.statTag
    param.seq = message.seq
    return param
  }
}

module.exports = XingePush
