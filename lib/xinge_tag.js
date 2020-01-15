/*
 * @Author: xing.wu
 * @Date: 2020-01-09 13:44:35
 * @Last Modified by: xing,wu
 * @Last Modified time: 2020-01-14 18:26:45
 */
// 信鸽tag相关
const XingeUntils = require('./untils/xinge_untils')
const {
  XingePlatform,
  XingeTagOperatorType,
  XingeUrls
} = require('./const/xinge_const')

class XingeTag {
  // 增加单个tag，对单个token而言
  // eslint-disable-next-line class-methods-use-this
  static addTagForToken(token, tag, platform, appId, secretKey, callback) {
    // 检测token是否合规
    if (!XingeUntils.checkString(token)) {
      XingeUntils.handleError('token is invalid')
    }
    if (!XingeUntils.checkString(tag)) {
      XingeUntils.handleError('tag is invalid')
    }
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 检测platform是否合格
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.addTagForToken,
      platform,
      [token],
      [tag]
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 删除单个tag，对单个token而言
  static delTagForToken(token, tag, platform, appId, secretKey, callback) {
    // 检测token是否合规
    if (!XingeUntils.checkString(token)) {
      XingeUntils.handleError('token is invalid')
    }
    // 检测tags
    if (!XingeUntils.checkString(tag)) {
      XingeUntils.handleError('tag is invalid')
    }
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.addTagForToken,
      platform,
      [token],
      [tag]
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 增加多个tag，对单个token而言
  static addTagsForToken(token, tags, platform, appId, secretKey, callback) {
    // 检测token是否合规
    if (!XingeUntils.checkString(token)) {
      XingeUntils.handleError('token is invalid')
    }
    // // 检测tags
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
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.addTagsForToken,
      platform,
      [token],
      tags
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 删除多个tag，对单个token而言
  static delTagsForToken(token, tags, platform, appId, secretKey, callback) {
    // 检测token是否合规
    if (!XingeUntils.checkString(token)) {
      XingeUntils.handleError('token is invalid')
    }
    // // 检测tags
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
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.delTagsForToken,
      platform,
      [token],
      tags
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 删除所有标签，对单个token而言
  static delAllTagsForToken(token, platform, appId, secretKey, callback) {
    // 检测token是否合规
    if (!XingeUntils.checkString(token)) {
      XingeUntils.handleError('token is invalid')
    }
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.delTagsForToken,
      platform,
      [token],
      []
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 标签覆盖接口（支持多个标签），对单个token而言
  static updateTagsForToken(token, tags, platform, appId, secretKey, callback) {
    // 检测token是否合规
    if (!XingeUntils.checkString(token)) {
      XingeUntils.handleError('token is invalid')
    }
    // 检测tags
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
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.updateTagsForToken,
      platform,
      [token],
      tags
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 添加单个tag，对多个token而言
  static addTagForTokens(tokens, tag, platform, appId, secretKey, callback) {
    // 检测tokens
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
    // 检测token是否合规
    if (!XingeUntils.checkString(tag)) {
      XingeUntils.handleError('tag is invalid')
    }
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.addTagForTokens,
      platform,
      tokens,
      [tag]
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 删除单个tag，对多个token而言
  static delTagForTokens(tokens, tag, platform, appId, secretKey, callback) {
    // 检测tokens
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
    // 检测token是否合规
    if (!XingeUntils.checkString(tag)) {
      XingeUntils.handleError('tag is invalid')
    }
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.delTagForTokens,
      platform,
      tokens,
      [tag]
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 批量添加tag
  static addTagsForTokens(tagstokens, platform, appId, secretKey, callback) {
    // 检测tokens
    if (!XingeUntils.checkArray(tagstokens)) {
      XingeUntils.handleError('tokens is invalid')
    } else {
      for (let i = 0; i < tagstokens.length; i += 1) {
        if (!XingeUntils.checkArray(tagstokens[i])) {
          XingeUntils.handleError('tokens is invalid')
        } else {
          for (let j = 0; i < tagstokens[i].length; j += 1) {
            tagstokens[i][j] += ''
            tagstokens[i][j] = tagstokens[i][j].trim()
            if (tagstokens[i][j].length === 0) {
              XingeUntils.handleError('tags is invalid')
            }
          }
        }
      }
    }
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.addTagsForTokens,
      platform,
      [],
      [],
      tagstokens
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // 批量删除tag
  static delTagsForTokens(tagstokens, platform, appId, secretKey, callback) {
    // 检测tokens
    if (!XingeUntils.checkArray(tagstokens)) {
      XingeUntils.handleError('tokens is invalid')
    } else {
      for (let i = 0; i < tagstokens.length; i += 1) {
        if (!XingeUntils.checkArray(tagstokens[i])) {
          XingeUntils.handleError('tokens is invalid')
        } else {
          for (let j = 0; i < tagstokens[i].length; j += 1) {
            tagstokens[i][j] += ''
            tagstokens[i][j] = tagstokens[i][j].trim()
            if (tagstokens[i][j].length === 0) {
              XingeUntils.handleError('tags is invalid')
            }
          }
        }
      }
    }
    // 检测平台
    if (platform !== XingePlatform.ios && platform !== XingePlatform.android) {
      XingeUntils.handleError('platform is invalid')
    }
    // 增加单个tag，对单个token而言
    const param = this.commonParams(
      XingeTagOperatorType.delTagsForTokens,
      platform,
      [],
      [],
      tagstokens
    )
    XingeUntils.callAPI(
      XingeUrls.API_TAG,
      param,
      'POST',
      10000,
      appId,
      secretKey,
      callback
    )
  }

  // ------------ 构造参数-------------//
  // eslint-disable-next-line class-methods-use-this
  static commonParams(
    operator_type,
    platform,
    token_list,
    tag_list,
    tag_token_list
  ) {
    const param = {}
    param.operator_type = operator_type
    param.platform = platform

    // operator_type =9,10时必填
    if (
      param.operator_type === XingeTagOperatorType.delTagsForTokens ||
      param.operator_type === XingeTagOperatorType.addTagsForTokens
    ) {
      param.tag_token_list = tag_token_list
    } else {
      // operator_type =1,2,3,4,6,7,8时必填,最大不能超过20个值,=5时忽略
      param.token_list = token_list
      param.tag_list = tag_list
    }
    return param
  }
}

module.exports = XingeTag
