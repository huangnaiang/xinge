/*
 * @Author: xing.wu
 * @Date: 2020-01-09 16:39:20
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-10 10:30:48
 */
const XingeUntils = require('../const/xinge_const');

class TimeIntervalV3 {
  /**
   * 表示一个允许推送的时间闭区间，从startHour：startMin到endHour：endMin
   * @param {int} startHour 开始小时
   * @param {int} startMin  开始分钟
   * @param {int} endHour   结束小时
   * @param {int} endMin    结束分钟
   */
  constructor(startHour, startMin, endHour, endMin) {
    this.start = {
      hour: null,
      min: null,
    };
    this.end = {
      hour: null,
      min: null,
    };

    // 效验时间合法性
    if (
      parseInt(startHour, 0) !== startHour
      || startHour < 0
      || startHour > 23
      || parseInt(startMin, 0) !== startMin
      || startMin < 0
      || startMin > 59
      || parseInt(endHour, 0) !== endHour
      || endHour < 0
      || endHour > 23
      || parseInt(endMin, 0) !== endMin
      || endMin < 0
      || endMin > 59
    ) {
      XingeUntils.handleError('startHour or startMin or endHour or endMin is invalid');
    }

    this.start.hour = `${startHour}`;
    this.start.min = `${startMin}`;
    this.end.hour = `${endHour}`;
    this.end.min = `${endMin}`;
  }
}

module.exports = TimeIntervalV3;
