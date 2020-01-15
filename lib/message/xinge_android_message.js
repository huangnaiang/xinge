/*
 * @Author: xing.wu
 * @Date: 2020-01-09 14:20:54
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-13 16:13:19
 */
const { XingePlatform, XingeMessageType, XingeAudienceType } = require('../const/xinge_const');
const XingeUntils = require('../untils/xinge_untils');
const XingeAndroidStyle = require('./xinge_android_style');
const XingeAndroidAction = require('./xinge_android_action');

class XingeAndroidMessage {
  constructor() {
    // ------------------必须的公告参数-------------------//
    // 枚举里取
    // this.audienceType = null;
    // 从枚举取
    this.platform = XingePlatform.android;
    // 从枚举取,默认正常通知类型
    this.messageType = XingeMessageType.notify;
    // ------------------必须的公告参数-------------------//

    // ------------------必须的业务参数-------------------//
    // 标题，字符串,必须
    this.title = '';
    // 内容，字符串，必须
    this.content = '';
    // ------------------必须的业务参数-------------------//

    // ------------------可选参数-------------------//
    // 非必须，消息将在哪些时间段允许推送给用户，建议小于10个，不能为空;非必须
    // 每个元素必须是TimeIntervalV3的实例
    this.acceptTime = [];
    // 非必须，富媒体元素地址，建议小于5个（仅限SDK4.2.0及以上版本使用）
    this.xgMediaResources = [];
    // style，通知栏消息风格，StyleV3的实例
    this.style = new XingeAndroidStyle();
    // 设置点击通知栏之后的行为，默认为打开app,ClickAction的实例
    this.action = new XingeAndroidAction();
    // 自定义的key:value参数
    this.customContent = {};
    // ------------------可选参数-------------------//

    // ------------------高级选参数-------------------//
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
    // 多包名推送(ios无效)
    // 1）当app存在多个不同渠道包（例如应用宝、豌豆荚等），推送时如果是希望手机上安装任何一个渠道的app都能收到消息那么该值需要设置为true
    this.multiPkg = false;
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
  }

  // 格式化自身
  format() {
    // 先对自身做检验
    this.checkAndroidMessageValid();
    const mess = {
      content: this.content,
    };
    if (this.title.trim().length > 0) {
      mess.title = this.title.trim();
    }
    // 判断富媒体
    if (this.mediaResources != null && this.mediaResources.length > 0) {
      mess.xg_media_resources = '';
      // for (const index in this.mediaResources) {
      //   if (this.mediaResources.hasOwnProperty(index)) {
      //     const str = this.mediaResources[index];
      //     mess.xg_media_resources = `${str}`;
      //   }
      // }
      Object.keys(this.mediaResources).forEach((key) => {
        const str = this.mediaResources[key];
        mess.xg_media_resources = `${str}`;
      });
    }
    // 可接受时间
    if (this.acceptTime.length > 0) {
      mess.accept_time = this.acceptTime;
    }
    // Android的消息机制
    // 判断是普通还是透传
    if (this.type === XingeAudienceType.notify) {
      // 通知
      // style
      if (this.style != null) {
        mess.android = {};
        mess.android.n_id = this.style.nId;
        mess.android.builder_id = this.style.builderId;
        mess.android.ring = this.style.ring;
        mess.android.ring_raw = this.style.ringRaw;
        mess.android.vibrate = this.style.vibrate;
        mess.android.lights = this.style.lights;
        mess.android.clearable = this.style.clearable;
        mess.android.icon_type = this.style.iconType;
        mess.android.icon_res = this.style.iconRes;
        mess.android.style_id = this.style.styleId;
        mess.android.small_icon = this.style.smallIcon;
      }
      // action
      if (this.action != null) {
        mess.android.action = this.action.formatAction();
      }
      if (!XingeUntils.checkObject(this.customContent)) {
        mess.android.custom_content = this.customContent;
      }
    } else {
      // TODO:透传
    }
    return mess;
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

  // eslint-disable-next-line class-methods-use-this
  checkAndroidMessageValid() {
    if (this.messageType === XingeMessageType.notify) {
      // 判断title
      if (!XingeUntils.checkString(this.title)) {
        XingeUntils.handleError('title is invalid');
      }
      // 校验style
      if (!(this.style instanceof XingeAndroidStyle)) {
        throw Error('style is invalid');
      } else {
        this.style.checkStyle();
      }
      // 校验action
      if (!(this.action instanceof XingeAndroidAction)) {
        throw Error('style is invalid');
      } else {
        this.action.checkAction();
      }
    } else if (this.messageType === XingeMessageType.message) {
      // 效验消息合法性
      if (!XingeUntils.checkString(this.title)) {
        XingeUntils.handleError('title is invalid');
      }
    } else {
      XingeUntils.handleError('messageType is invalid');
    }
    // 判断内容是否为空
    if (!XingeUntils.checkString(this.content)) {
      XingeUntils.handleError('content is invalid');
    }
    // 判断acceptTime
    if (!XingeUntils.checkAccessTime(this.acceptTime)) {
      XingeUntils.handleError('acceptTime is invalid');
    }
    // 判断xgMediaResources
    if (!XingeUntils.checkMediaResources(this.xgMediaResources)) {
      XingeUntils.handleError('xgMediaResources is invalid');
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
    // TODO验证
    if (typeof this.multiPkg !== 'boolean') {
      XingeUntils.handleError('multiPkg is invalid');
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

module.exports = XingeAndroidMessage;
