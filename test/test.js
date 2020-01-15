const {
  XingePush,
  XingeUrls,
  XingeAccount,
  XingeAccountOperatorType,
  XingeAccountType,
  XingeActionType,
  XingeAndroidAction,
  XingeAndroidMessage,
  XingeAndroidStyle,
  XingeAudienceType,
  XingeEnv,
  XingeIOSMessage,
  XingeMessageType,
  XingeOpType,
  XingePlatform,
  XingeTag,
  XingeTagOperation,
  XingeTagOperatorType,
  XingeUntils
} = require('../xinge/index')

// 定义测试需要的东西
let appId = 'fcfc16e65ae8f'
let secretKey = '33fa59724a001b1993243def4f16e3fc'
let accessId = 2200342874
let token = 'a0188cecbd0a6523c4af0cb11219c98acb0762f3f42e75b8574ddb603d356370'

// iOSMessage
let iOSMessage = new XingeIOSMessage()
iOSMessage.title = '测试1'
iOSMessage.content = '测试1'
iOSMessage.customContent = {
  type: '123'
}

// tokenlist推送
// XingePush.pushToTokens(
//   {
//     accessId: accessId,
//     secretKey: secretKey,
//     appId: appId
//   },
//   [token],
//   iOSMessage,
//   XingeEnv.dev,
//   (error, body) => {
//     console.log('输出结果'+ JSON.stringify(body))
//   }
// )

// 设置tag
// XingeTag.updateTagsForToken(
//   token,
//   ['wx'],
//   XingePlatform.ios,
//   appId,
//   secretKey,
//   (error, body) => {
//     console.log('输出结果' + JSON.stringify(body))
//   }
// )

// tag推送
// XingePush.pushToTags(
//   {
//     accessId: accessId,
//     secretKey: secretKey,
//     appId: appId
//   },
//   ['wx'],
//   XingeTagOperation.or,
//   iOSMessage,
//   XingeEnv.dev,
//   (error, body) => {
//     console.log('输出结果' + JSON.stringify(body))
//   }
// )

// 设置account
// token_accounts格式
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
// XingeAccount.addAccounts(
//   appId,
//   secretKey,
//   XingePlatform.ios,
//   [
//     {
//       token: token,
//       account_list: [
//         {
//           account: 'wxx',
//           account_type: XingeAccountType.diy
//         }
//       ]
//     }
//   ],
//   null,
//   null,
//   (error, body) => {
//     console.log('输出结果' + JSON.stringify(body))
//   }
// )

// account推送
// XingePush.pushToAccounts(
//   { accessId: accessId, secretKey: secretKey, appId: appId }
//   ['wxx'],
//   iOSMessage,
//   XingeEnv.dev,
//   (error, body) => {
//     console.log('输出结果' + JSON.stringify(body))
//   }
// )

// account查询
// XingeAccount.queryAccounts2Token(
//   appId,
//   secretKey,
//   XingePlatform.ios,
//   [{ account: 'wxx', account_type: XingeAccountType.diy }],
//   (error, body) => {
//     console.log('输出结果' + JSON.stringify(body))
//   }
// )
