/*
 * @Author: xing.wu
 * @Date: 2020-01-09 14:23:43
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-10 17:25:50
 */

/**
 * ios普通消息
 * 静默：{
    "ios":{
        "aps": {
            "content-available": 1
        },
        "custom": {
            "key1": "value1",
            "key2": "value2"
        },
        "xg": "oops"
    }
    普通：
    {
    "title": "xxx",
    "content": "xxxxxxxxx",
    "ios":{
        "aps": {
            "alert": {
                "subtitle": "my subtitle"
            },
            "badge_type": 5,
            "category": "INVITE_CATEGORY"
        },
        "custom1": "bar",
        "custom2": [
            "bang",
            "whiz"
        ],
        "xg": "oops"
    }
}
}
 */
const { XingePlatform, XingeMessageType, XingeEnv } = require('../const/xinge_const');
const XingeUntils = require('../untils/xinge_untils');

class XingeIOSMessage {
  constructor() {
    // ----------必须需要的公共参数------------//
    // 枚举里取
    // this.audienceType = null;
    // 枚举里取
    this.platform = XingePlatform.ios;
    // 枚举里取
    this.messageType = XingeMessageType.notify;
    // this.message 本身的参数就是构造这些
    // ----------必须需要的公共参数------------//

    // ----------必须需要的业务参数------------//
    this.title = '';
    this.content = '';
    // ----------必须需要的业务参数------------//

    // ----------可选的业务参数------------//
    // 自定义的key:value参数，
    this.customContent = {};
    // aps:https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1
    this.alert;
    // 整形或null，设置角标数值。定义详见APNS payload中的badge字段
    this.badge = null;
    // 推送声音
    this.sound = null;
    // 推送环境
    this.environment = XingeEnv.product;
    // 用户设置角标数字，仅限iOS 平台使用,放在aps字段内
    // 1) -1: 角标数字不变
    // 2) -2: 角标数字自动加1
    // 3) >= 0: 设置「自定义」角标数字
    this.badgeType = -2;
    this.category = null;
    // ----------可选的业务参数------------//

    // ----------高级可选参数------------//
    //     消息离线存储时间（单位为秒）,最长72小时
    // 1）若expire_time=0，则表示实时消息
    // 2）若expire_time大于0且小于800s，则系统会重置为800s
    // 3）若expire_time>=800s，按实际设置时间存储，最长72小时
    // 4)设置的最大值不得超过2147483647，否则会导致推送失败
    this.expireTime = 0;
    // 调用方给时间戳，通过格式化方法格式化为yyyy - MM - DD HH: MM: SS格式
    // 指定推送时间
    // 1）格式为yyyy - MM - DD HH: MM: SS
    // 2）若小于服务器当前时间，则会立即推送
    // 3）仅全量推送和标签推送支持此字段
    this.sendTime = 0;
    // 循环任务重复次数
    // 1）仅支持全推、标签推
    // 2）建议取值[1, 15]
    this.loopTimes = 0;
    // 循环执行消息下发的间隔
    // 1）必须配合loop_times使用
    // 2）以天为单位，取值[1, 14]
    // 3）loop_times和loop_interval一起表示消息下发任务的循环规则
    this.loopInterval = 0;
    // 统计标签，用于聚合统计
    // 使用场景(示例) ：现在有一个活动id：active_picture_123
    // 需要给10000个设备通过单推接口（或者列表推送等推送形式）下发消息
    // 同时设置该字段为active_picture_123
    // 推送完成之后可以使用v3统计查询接口
    // 根据该标签active_picture_123 查询这10000个设备的实发、抵达、展示、点击数据
    this.statTag = null;
    // 接口调用时，在应答包中信鸽会回射该字段，可用于异步请求
    // 使用场景：异步服务中可以通过该字段找到server端返回的对应应答包
    this.seq = null;
    // 单账号推送时可选
    // 1) 0: 往单个账号的最新的device上推送信息
    // 2) 1: 往单个账号关联的所有device设备上推送信息
    this.accountPushType = null;
    // 单账号推送时可选
    // 1）账号类型，参考后面账号说明
    // 2）必须与账号绑定时设定的账号类型一致
    this.accountType = null;
    // ----------高级可选参数------------//
  }

  /**
   * 格式化sendTime
   * @return {string} YYYY-MM-DD hh:mm:ss格式的sendTime
   */
  formatSendTime() {
    const dateSendTime = new Date();
    dateSendTime.setTime(this.sendTime * 1000);

    const year = dateSendTime.getFullYear();

    let month = dateSendTime.getMonth() + 1;
    month < 10 && (month = `0${month}`);

    let day = dateSendTime.getDate();
    day < 10 && (day = `0${day}`);

    let hour = dateSendTime.getHours();
    hour < 10 && (hour = `0${hour}`);

    let minute = dateSendTime.getMinutes();
    minute < 10 && (minute = `0${minute}`);

    let second = dateSendTime.getSeconds();
    second < 10 && (second = `0${second}`);

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  /**
   * 格式化message
   * @return {string} 格式化后的message
   */
  format() {
    // 检测自身
    this.checkIOSMessageValid();
    const mess = {};
    if (this.messageType === XingeMessageType.notify) {
      // 普通消息
      if (this.title.trim().length > 0) {
        mess.title = this.title;
      }
      mess.content = this.content;
      const aps = {
        alert: this.alert,
      };
      aps.badge_type = this.badgeType;
      if (this.category != null && this.category.length > 0) {
        aps.category = this.category;
      }
      if (this.sound != null && this.sound.length > 0) {
        aps.sound = this.sound;
      }
      mess.ios = {
        aps,
      };
      if (!XingeUntils.checkObject(this.customContent)) {
        mess.ios.custom = this.customContent;
      }
    } else {
      // 静默消息
      // TODO
    }
    return mess;
  }

  // 检查iOS对象是否合法
  // eslint-disable-next-line class-methods-use-this
  checkIOSMessageValid() {
    // if (!(message instanceof XingeIOSMessage)) {
    //   XingeUntils.handleError('message is invalid');
    // }
    // 推送类型推断
    if (this.messageType === XingeMessageType.notify) {
      // 通知类型
      // 效验通知合法性
      if (!XingeUntils.checkString(this.title)) {
        XingeUntils.handleError('title is invalid');
      }
    } else if (this.messageType === XingeMessageType.message) {
      // TODO:效验消息合法性,校验静默消息
      if (typeof this.title !== 'string') {
        XingeUntils.handleError('title is invalid');
      }
    } else {
      XingeUntils.handleError('messageType is invalid');
    }
    // 判断内容是否为空
    if (!XingeUntils.checkString(this.content)) {
      XingeUntils.handleError('content is invalid');
    }
    // 判断alert
    // if (typeof message.alert !== 'string' && typeof message.alert !== 'object') {
    if (!XingeUntils.checkString(this.alert) && !XingeUntils.checkObject(this.alert)) {
      XingeUntils.handleError('alert is invalid');
    }
    // 判断badge

    if (this.badge !== null && parseInt(this.badge, 0) !== this.badge) {
      XingeUntils.handleError('badge is invalid');
    }
    // 判读sound

    if (!XingeUntils.checkString(this.sound)) {
      XingeUntils.handleError('sound is invalid');
    }
    // 判断环境
    if (!XingeUntils.checkEnv(this.environment)) {
      XingeUntils.handleError('environment is invalid');
    }
    // 判断badgeType
    if (this.badgeType < 0 && !(this.badgeType !== -1 || this.badgeType !== -2)) {
      XingeUntils.handleError('badgeType is invalid');
    }
    // 判断自定义参数
    if (!XingeUntils.checkCustomContent(this.customContent)) {
      XingeUntils.handleError('customContent is invalid');
    }
    // 判断expireTime消息离线存储时间
    if (
      parseInt(this.expireTime, 0) !== this.expireTime
      || this.expireTime < 0
      || this.expireTime > 60 * 60 * 24 * 3
    ) {
      XingeUntils.handleError('expireTime is invalid');
    }
    if (parseInt(this.sendTime, 0) !== this.sendTime || this.sendTime < 0) {
      XingeUntils.handleError('sendTime is invalid');
    }
    if (!XingeUntils.checkLoopTimes(this.loopTimes)) {
      XingeUntils.handleError('loopTimes is invalid');
    }
    if (!XingeUntils.checkloopInterval(this.loopInterval)) {
      XingeUntils.handleError('loopInterval is invalid');
    }
    if (this.statTag !== null && !XingeUntils.checkString(this.statTag)) {
      XingeUntils.handleError('statTag is invalid');
    }
    if (this.seq !== null && !XingeUntils.checkSeq(this.seq)) {
      XingeUntils.handleError('seq is invalid');
    }
    // 单账号情况下检查,考虑到推送类型由方法决定，此处暂不检查
    // if (!XingeUntils.checkAccountPushType(this.accountPushType)) {
    //   XingeUntils.handleError('accountPushType is invalid');
    // }
    // if (!XingeUntils.checkAccountType(this.accountType)) {
    //   XingeUntils.handleError('accountType is invalid');
    // }
    return true;
  }
}

module.exports = XingeIOSMessage;
