/* eslint-disable guard-for-in */
/*
 * @Author: xing.wu
 * @Mail: 329106954@qq.com
 * @Date: 2020-01-09 13:44:25
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-15 18:22:10
 */
// 信鸽account相关https://xg.qq.com/docs/server_api/v3/account-api.html
const {
  XingeAccountOperatorType,
  XingeUrls,
  XingeAccountQueryType
} = require('./const/xinge_const')
const XingeUntils = require('./untils/xinge_untils')
/* token_accounts:[{
      "token": "token1",
      "account_list": [{
        "account": "926@126.com",
        "account_type": 2
      }, {
        "account": "1527000000",
        "account_type": 1
      }]
    }] */
class XingeAccount {
  // 1：token 追加设置accounts
  // eslint-disable-next-line class-methods-use-this
  static addAccounts(
    appId,
    secretKey,
    platform,
    token_accounts,
    op_type,
    op_id,
    callback
  ) {
    // 校验token_accounts
    this.checkTokenAccounts(token_accounts)
    // 构造参数
    const param = {}
    param.operator_type = XingeAccountOperatorType.addAccount
    param.platform = platform
    param.token_accounts = token_accounts
    // if (param.operator_type === XingeAccountOperatorType.delAccountToken) {
    //   // 账号标识集合，当operator_type=5 时有效，且必填每个元素包含account，以及account_type 字段。
    //   // 示例:
    //   // [{"account":"926@126.com","account_type":2},{"account":"1527000000","account_type":1}]?
    //   param.account_list = {};
    // } else if (param.operator_type === XingeAccountOperatorType.delAllAccounts) {
    //   param.token_list = token_list;
    // } else {
    //   param.token_accounts = token_accounts;
    // }
    // qq、rtx、email、other
    if (op_type !== null) param.op_type = op_type
    // id
    if (op_id !== null) param.op_id = op_id
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_ACCOUNT,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 2：token覆盖设置account
  static updateAccounts(
    appId,
    secretKey,
    platform,
    token_accounts,
    op_type,
    op_id,
    callback
  ) {
    // 校验token_accounts
    this.checkTokenAccounts(token_accounts)
    // 构造参数
    const param = {}
    param.operator_type = XingeAccountOperatorType.updateAccount
    param.platform = platform
    param.token_accounts = token_accounts
    // qq、rtx、email、other
    if (op_type !== null) param.op_type = op_type
    // id
    if (op_id !== null) param.op_id = op_id
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_ACCOUNT,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 3 : token删除绑定的多个account
  static delAccounts(
    appId,
    secretKey,
    platform,
    token_accounts,
    op_type,
    op_id,
    callback
  ) {
    // 校验token_accounts
    this.checkTokenAccounts(token_accounts)
    // 构造参数
    const param = {}
    param.operator_type = XingeAccountOperatorType.delAccounts
    param.platform = platform
    param.token_accounts = token_accounts
    // qq、rtx、email、other
    if (op_type !== null) param.op_type = op_type
    // id
    if (op_id !== null) param.op_id = op_id
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_ACCOUNT,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 4：token 删除绑定的所有account
  // eslint-disable-next-line class-methods-use-this
  static delAllAccounts(
    appId,
    secretKey,
    platform,
    token_list,
    op_type,
    op_id,
    callback
  ) {
    // 校验token_accounts
    if (!XingeUntils.checkArray(token_list))
      XingeUntils.handleError('token_list is invalid')
    // 构造参数
    const param = {}
    param.operator_type = XingeAccountOperatorType.delAllAccounts
    param.platform = platform
    param.token_list = token_list
    // qq、rtx、email、other
    if (op_type !== null) param.op_type = op_type
    // id
    if (op_id !== null) param.op_id = op_id
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_ACCOUNT,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 5：account 删除绑定的所有token
  static delAllTokens(
    appId,
    secretKey,
    platform,
    account_list,
    op_type,
    op_id
  ) {
    this.checkAccountList(account_list)
    // 构造参数
    const param = {}
    param.operator_type = XingeAccountOperatorType.delAccountToken
    param.platform = platform
    param.account_list = account_list
    // qq、rtx、email、other
    if (op_type !== null) param.op_type = op_type
    // id
    if (op_id !== null) param.op_id = op_id
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_ACCOUNT,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }
  // -----------------------------查询---------------------------------//

  // 批量查询Token 绑定的Account关系
  // 批量查询account 绑定的Token
  // 批量查询Token绑定的Account

  //   批量查询Account绑定的token关系
  static queryAccounts2Token(
    appId,
    secretKey,
    platform,
    account_list,
    callback
  ) {
    // 校验
    this.checkAccountList(account_list)
    const param = {}
    param.operator_type = XingeAccountQueryType.account2Token
    param.platform = platform
    param.account_list = account_list
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_QUERY,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 批量查询tokens绑定的accounts
  static queryTokens2Account(appId, secretKey, token_list, callback) {
    // 校验
    this.checkArray(token_list)
    const param = {}
    param.operator_type = XingeAccountQueryType.token2Account
    param.token_list = token_list
    // 获取header
    XingeUntils.callAPI(
      XingeUrls.API_QUERY,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }
  // ----------------------------构造参数
  // accounts_type
  // https://xg.qq.com/docs/server_api/v3/push_api_v3.html#%E8%B4%A6%E5%8F%B7%E7%B1%BB%E5%9E%8B
  // commonParam(operator_type, platform, token_accounts) {}

  // eslint-disable-next-line class-methods-use-this
  static checkTokenAccounts(token_accounts) {
    /* [{
      "token": "token1",
      "account_list": [{
        "account": "926@126.com",
        "account_type": 2
      }, {
        "account": "1527000000",
        "account_type": 1
      }]
    }] */
    // 检测array
    if (!XingeUntils.checkArray(token_accounts)) {
      XingeUntils.handleError('token_accounts必须为不为空的数组')
    } else {
      for (const key in token_accounts) {
        const element = token_accounts[key]
        if (!XingeUntils.checkObject(element)) {
          XingeUntils.handleError('token_accounts元素必须为不为空的对象')
        } else {
          const { token } = element
          const { account_list } = element
          if (!XingeUntils.checkString(token)) {
            XingeUntils.handleError('token_accounts的token有误')
          }
          this.checkAccountList(account_list)
        }
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  static checkAccountList(account_list) {
    if (!XingeUntils.checkArray(account_list))
      XingeUntils.handleError('account_list is invalid')
    for (const index in account_list) {
      const item = account_list[index]
      if (!XingeUntils.checkString(item.account)) {
        // XingeUntils.handleError('token_accounts的account_list中的account格式有误');
        XingeUntils.handleError('account_list中的account格式有误')
      }
      if (item.account_type === undefined) {
        // XingeUntils.handleError('token_accounts的account_list元素必须有account_type');
        XingeUntils.handleError('account_list元素必须有account_type')
      }
    }
  }
}

module.exports = XingeAccount
