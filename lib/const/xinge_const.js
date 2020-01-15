/*
 * @Author: xing.wu
 * @Mail: 329106954@qq.com
 * @Date: 2020-01-09 13:46:02
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-15 18:19:24
 */
// 信鸽的静态变量相关
const API_PUSH = 'https://openapi.xg.qq.com/v3/push/app'
const API_TAG = 'https://openapi.xg.qq.com/v3/device/tag'
const API_ACCOUNT = 'https://openapi.xg.qq.com/v3/device/account/batchoperate'
const API_QUERY = 'https://openapi.xg.qq.com/v3/device/account/query'
// -------------------------------------//
// 平台
const XingePlatform = {
  ios: 'ios',
  android: 'android'
}
// 推送目标枚举类型
const XingeAudienceType = {
  all: 'all',
  tag: 'tag',
  token: 'token',
  // 最多1000 个token
  token_list: 'token_list',
  account: 'account',
  // 最多1000 account
  account_list: 'account_list'
}
// 消息类型，XingeMessageType
const XingeMessageType = {
  // 通知
  notify: 'notify',
  // 透传消息/静默消息
  message: 'message'
}
// 信鸽的环境，ios专用
const XingeEnv = {
  product: 'product',
  dev: 'dev'
}

// Android的action动作定义
const XingeActionType = {
  activity: 1,
  browser: 2,
  intent: 3
}

// tag推送逻辑关系
const XingeTagOperation = {
  or: 'OR',
  and: 'AND'
}
// -------------------------------------//
const XingeTagOperatorType = {
  // 操作类型
  // 1）1：增加单个tag，对单个token而言
  addTagForToken: 1,
  // 2）2：删除单个tag，对单个token而言
  delTagForToken: 2,
  // 3）3：增加多个tag，对单个token而言
  addTagsForToken: 3,
  // 4）4：删除多个tag，对单个token而言
  delTagsForToken: 4,
  // 5）5：删除所有标签，对单个token而言
  delAllTagsForToken: 5,
  // 6）6：标签覆盖接口（支持多个标签），对单个token而言
  updateTagsForToken: 6,
  // 7）7：添加单个tag，对多个token而言
  addTagForTokens: 7,
  // 8）8：删除单个tag，对多个token而言
  delTagForTokens: 8,
  // 9）9：批量添加标签（每次调用最多允许设置20对，每个对里面标签在前，token在后）
  addTagsForTokens: 9,
  // 10）10：批量删除标签（每次调用最多允许设置20对，每个对里面标签在前，token在后）
  delTagsForTokens: 10
}
// -------------------------------------//
const XingeAccountOperatorType = {
  // 1：token 追加设置account
  addAccount: 1,
  // 2：token覆盖设置account
  updateAccount: 2,
  // 3 : token删除绑定的多个account
  delAccounts: 3,
  // 4：token 删除绑定的所有account
  delAllAccounts: 4,
  // 5：account 删除绑定的所有token
  delAccountToken: 5
}
// 操作员类别
const XingeOpType = {
  qq: 'qq',
  rtx: 'rtx',
  email: 'email',
  other: 'other'
}

const XingeAccountType = {
  unknow: 0,
  phone: 1,
  mail: 2,
  wechatOpenid: 1000,
  qqOpenId: 1001,
  weiBo: 1002,
  aliPay: 1003,
  taoBao: 1004,
  douBan: 1005,
  facebook: 1006,

  twitter: 1007,
  google: 1008,
  baiDu: 1009,
  jingDong: 1010,
  // 领英
  linkedIn: 1011,
  other: 1999,
  // 游客
  tourists: 2000,
  // 自定义2001以上,可自行拓展
  diy: 2002
}

const XingeAccountQueryType = {
  //   1：根据account 批量查询对应token
  // 2：根据 token查询account
  account2Token: 1,
  token2Account: 2
}
// XingeEnv
exports.XingeUrls = {
  API_PUSH,
  API_TAG,
  API_ACCOUNT,
  API_QUERY
}

exports.XingeAudienceType = XingeAudienceType
exports.XingePlatform = XingePlatform
exports.XingeMessageType = XingeMessageType
exports.XingeEnv = XingeEnv
exports.XingeActionType = XingeActionType
exports.XingeTagOperation = XingeTagOperation

exports.XingeTagOperatorType = XingeTagOperatorType

exports.XingeAccountOperatorType = XingeAccountOperatorType
exports.XingeOpType = XingeOpType
exports.XingeAccountType = XingeAccountType
exports.XingeAccountQueryType = XingeAccountQueryType
