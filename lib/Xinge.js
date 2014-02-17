/**
 * 信鸽node api
 * @author huangnaiang
 * @version  
 * Copyright © 1998 - 2014 Tencent. All Rights Reserved. 腾讯公司 版权所有
 */

//引入相关模块
var http = require('http');
var url  = require('url');
var util = require('util');
var querystring = require('querystring');
var crypto = require('crypto');

//定义api地址
var API_PUSH_TO_SINGLE_DEVICE  = 'http://openapi.xg.qq.com/v2/push/single_device';
var API_PUSH_TO_SINGLE_ACCOUNT = 'http://openapi.xg.qq.com/v2/push/single_account';
var API_PUSH_TO_ALL_DEVICES    = 'http://openapi.xg.qq.com/v2/push/all_device';
var API_PUSH_BY_TAGS           = 'http://openapi.xg.qq.com/v2/push/tags_device';
var API_QUERY_PUSH_STATUS      = 'http://openapi.xg.qq.com/v2/push/get_msg_status';
var API_QUERY_DEVICE_COUNT     = 'http://openapi.xg.qq.com/v2/application/get_app_device_num';
var API_QUERY_APP_TAGS         = 'http://openapi.xg.qq.com/v2/tags/query_app_tags';
var API_CANCEL_TIMING_TASK     = 'http://openapi.xg.qq.com/v2/push/cancel_timing_task';


/**
 * 一个实例代表一个信鸽app
 * @param {string} accessId  应用的唯一标识符，在提交应用时管理系统返回
 * @param {string} secretKey 应用的secret key，可在配置信息中查看
 */
function XingeApp(accessId, secretKey){

	//效验accessId和secretKey是否为非空字符串
	if(typeof accessId !== 'string' || accessId.trim().length === 0){
		throw new Error('accessId is invalid');
	}else{
		accessId = accessId.trim();
	}

	if(typeof secretKey !== 'string' || secretKey.trim().length === 0){
		throw new Error('secretKey is invalid');
	}else{
		secretKey = secretKey.trim();
	}

	this.accessId  = accessId;
	this.secretKey = secretKey;

	/**
	 * 推送消息给单个设备
	 * @param  {string}   deviceToken           针对某一设备推送
	 * @param  {Message}  message               推送的消息
	 * @param  {int}      validTime             配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.pushToSingleDevice = function(deviceToken, message, validTime, callback){

		//效验deviceToken合法性
		if(typeof deviceToken !== 'string' || deviceToken.trim().length === 0){
			throw new Error('deviceToken is invalid');
		}else{
			deviceToken = deviceToken.trim();
		}

		//效验message合法性
		if(!(message instanceof Message)){
			throw new Error('message is invalid');
		}

		//效验validtime合法性
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造请求参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			expire_time: message.expireTime,
			send_time: message.formatSendTime(),
			device_token: deviceToken,
			message_type: message.type,
			message: message.format()
		};

		//调用API
		callAPI(API_PUSH_TO_SINGLE_DEVICE, params, "POST", this.secretKey, callback);
	};

	/**
	 * 推送消息给单个账户或别名
	 * @param  {int}      deviceType            消息推送的适配平台
	 * @param  {string}   account               账户或别名
	 * @param  {Message}  message               推送的消息
	 * @param  {int}      validTime             配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.pushToSingleAccount = function(deviceType, account, message, validTime, callback){

		//效验deviceType
		if(deviceType !== exports.DEVICE_TYPE_ALL && deviceType !== exports.DEVICE_TYPE_BROWSER && 
			deviceType !== exports.DEVICE_TYPE_PC && deviceType !== exports.DEVICE_TYPE_ANDROID && 
			deviceType !== exports.DEVICE_TYPE_IOS && deviceType !== exports.DEVICE_TYPE_WINPHONE){

			throw new Error('deviceType is invalid');
		}

		//效验account是否为非空字符串
		if(typeof account !== 'string' || account.trim().length === 0){
			throw new Error('account is invalid');
		}else{
			account = account.trim();
		}

		//效验message
		if(!(message instanceof Message)){
			throw new Error('message is invalid');
		}

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造请求参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			expire_time: message.expireTime,
			send_time: message.sendTime,
			device_type: deviceType,
			account: account,
			message_type: message.type,
			message: message.format()
		};

		//调用API
		callAPI(API_PUSH_TO_SINGLE_ACCOUNT, params, "POST", this.secretKey, callback);

	};

	/**
	 * 推送消息到所有设备
	 * @param  {int}      deviceType            消息推送的适配平台
	 * @param  {Message}  message               推送的消息
	 * @param  {int}      validTime             配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.pushToAllDevices = function(deviceType, message, validTime, callback){

		//效验deviceType
		if(deviceType !== exports.DEVICE_TYPE_ALL && deviceType !== exports.DEVICE_TYPE_BROWSER && 
			deviceType !== exports.DEVICE_TYPE_PC && deviceType !== exports.DEVICE_TYPE_ANDROID && 
			deviceType !== exports.DEVICE_TYPE_IOS && deviceType !== exports.DEVICE_TYPE_WINPHONE){

			throw new Error('deviceType is invalid');
		}

		//效验message
		if(!(message instanceof Message)){
			throw new Error('message is invalid');
		}

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造请求参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			expire_time: message.expireTime,
			send_time: message.sendTime,
			device_type: deviceType,
			message_type: message.type,
			message: message.format()
		};

		//调用API
		callAPI(API_PUSH_TO_ALL_DEVICES, params, "POST", this.secretKey, callback);

	};

	/**
	 * 根据指定的tag推送消息
	 * @param  {int}      deviceType            消息推送的适配平台
	 * @param  {array}    tags                  指定推送目标的tag列表，每个tag是一个string
	 * @param  {string}   tagOperation          多个tag的运算关系，取值为AND或OR
	 * @param  {Message}  message               推送的消息
	 * @param  {int}      validTime             配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600       
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.pushByTags = function(deviceType, tags, tagOperation, message, validTime, callback){

		//效验deviceType
		if(deviceType !== exports.DEVICE_TYPE_ALL && deviceType !== exports.DEVICE_TYPE_BROWSER && 
			deviceType !== exports.DEVICE_TYPE_PC && deviceType !== exports.DEVICE_TYPE_ANDROID && 
			deviceType !== exports.DEVICE_TYPE_IOS && deviceType !== exports.DEVICE_TYPE_WINPHONE){

			throw new Error('deviceType is invalid');
		}

		//效验tags
		if(!util.isArray(tags) || tags.length === 0){
			throw new Error('tags is invalid');
		}else{
			for(var i=0; i < tags.length; i++){
				if(!typeof tags[i] !== 'string' || tags[i].trim().length === 0){
					throw new Error('tags is invalid');
				}else{
					tags[i] = tags[i].trim();
				}
			}
		}

		//效验tagOperation
		if(tagOperation !== exports.TAG_OPERATION_AND && tagOperation !== exports.TAG_OPERATION_OR){
			throw new Error('tagOperation is invalid');
		}

		//效验message
		if(!(message instanceof Message)){
			throw new Error('message is invalid');
		}

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造请求参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			expire_time: message.expireTime,
			send_time: message.sendTime,
			device_type: deviceType,
			tags_list: tags,
			tags_op: tagOperation,
			message_type: message.type,
			message: message.format()
		};

		//调用API
		callAPI(API_PUSH_BY_TAGS, params, "POST", this.secretKey, callback);

	};

	/**
	 * 批量查询推送状态
	 * @param  {array}    pushIds               推送id数组
	 * @param  {int}      validTime             配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.queryPushStatus = function(pushIds, validTime, callback){

		var arrPushIds = [];

		//效验pushIds
		if(typeof pushIds === 'string' || parseInt(pushIds) === pushIds){

			if(pushIds.toString().trim().length === 0){
				throw new Error('pushIds is invalid');
			}else{
				arrPushIds.push({'push_id': pushIds.toString().trim()});
			}

		}else if(util.isArray(pushIds)){

			if(pushIds.length === 0){
				throw new Error('pushIds is invalid');
			}else{
				for(var i=0; i<pushIds.length; i++){
					var pushId = pushIds[i];
					if((typeof pushId !== 'string' || pushId.trim().length === 0) && (parseInt(pushId) !== pushId)){
						throw new Error('pushIds is invalid');
					}else{
						arrPushIds.push({'push_id': pushId.toString().trim()});
					}
				}
			}

		}else{
			throw new Error('pushIds is invalid');
		}

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造请求参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			push_ids: JSON.stringify(arrPushIds)
		};

		//调用API
		callAPI(API_QUERY_PUSH_STATUS, params, "POST", this.secretKey, callback);

	};

	/**
	 * 查询设备数
	 * @param  {int}   validTime                配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.queryDeviceCount = function(validTime, callback){

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造查询参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime
		};

		//调用API
		callAPI(API_QUERY_DEVICE_COUNT, params, "POST", this.secretKey, callback);

	};

	/**
	 * 查询应用标签
	 * @param  {int}   start                    开始位置
	 * @param  {int}   limit                    查询数量
	 * @param  {int}   validTime                配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.queryAppTags = function(start, limit, validTime, callback){

		//效验start
		if(parseInt(start) !== start || start < 0){
			start = 0;
		}

		//效验limit
		if(parseInt(limit) !== limit || limit < 1){
			limit = 100;
		}

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造查询参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			start: start,
			limit: limit
		};

		//调用API
		callAPI(API_QUERY_APP_TAGS, params, "POST", this.secretKey, callback);

	};

	/**
	 * 取消尚未触发的定时推送任务
	 * @param  {int}   pushId                   消息推送id
	 * @param  {int}   validTime                配合timestamp确定请求的有效期，单位为秒，最大值为600，默认值600
	 * @param  {Function} callback(err, result) 回调函数
	 */
	this.cancelTimingTask = function(pushId, validTime, callback){

		//效验pushId
		if((typeof pushId !== 'string' || pushId.trim().length === 0) && (parseInt(pushId) !== pushId)){
			throw new Error('pushId is invalid');
		}else{
			pushId = pushId.toString().trim();
		}

		//效验validTime
		if(parseInt(validTime) !== validTime || validTime < 0 || validTime > 600){
			validTime = 600;
		}

		//构造查询参数
		var params = {
			access_id: this.accessId,
			timestamp: Math.round((new Date()).getTime() / 1000),
			valid_time: validTime,
			push_id: pushId
		};

		//调用API
		callAPI(API_CANCEL_TIMING_TASK, params, "POST", this.secretKey, callback);

	};

}

/**
 * 消息类
 */
function Message(){

	//标题，必须为字符串
	this.title = '';
	//内容，必须为字符串
	this.content = '';
	//类型，通知或消息，必须为Message.MESSAGE_TYPE_NOTIFICATION或Message.MESSAGE_TYPE_MESSAGE
	this.type = null;
	//消息离线存储时间，单位为秒，必须为整形，默认不存储, 最长为3天
	this.expireTime = 0;
	//推送时间的时间戳，单位为秒，必须为整形，如果小于当前时间戳则立即发送 
	this.sendTime = 0;
	//自定义的key:value参数，
	this.customContent = {};
	//允许推送给用户的时段，每个元素必须是TimeInterval的实例
	this.acceptTime = [];
	//消息风格，必须为Style的实例，仅对通知有效
	this.style = null;
	//点击动作，必须为ClickAction的实例，仅对通知有效
	this.action = null;

	/**
	 * 格式化sendTime
	 * @return {string} YYYY-MM-DD hh:mm:ss格式的sendTime
	 */
	this.formatSendTime = function(){

		var dateSendTime = new Date();
		dateSendTime.setTime(this.sendTime * 1000);
		
		var year = dateSendTime.getFullYear();
		
		var month = dateSendTime.getMonth() + 1;
		(month < 10) && (month = '0' + month);

		var day = dateSendTime.getDate();
		(day < 10) && (day = '0' + day);

		var hour = dateSendTime.getHours();
		(hour < 10) && (hour = '0' + hour);

		var minute = dateSendTime.getMinutes();
		(minute < 10) && (minute = '0' + minute);

		var second = dateSendTime.getSeconds();
		(second < 10) && (second = '0' + second);
		
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
	};

	/**
	 * 格式化message
	 * @return {string} 格式化后的message
	 */
	this.format = function(){

		isMessageValid(this);

		var mess = {
			content: this.content
		};

		if(this.title.trim().length > 0){
			mess.title = this.title;
		}

		if(!isEmptyObj(this.customContent)){
			mess.custom_content = this.customContent;
		}

		if(this.acceptTime.length > 0){
			mess.accept_time = this.acceptTime;
		}

		if(this.type === exports.MESSAGE_TYPE_NOTIFICATION){
			mess.builder_id = this.style.builderId;
			mess.ring = this.style.ring;
			mess.vibrate = this.style.vibrate;
			mess.clearable = this.style.clearable;
			mess.action = this.action;
		}

		return JSON.stringify(mess);

	}

	
}

/**
 * 表示一个允许推送的时间闭区间，从startHour：startMin到endHour：endMin
 * @param {int} startHour 开始小时
 * @param {int} startMin  开始分钟
 * @param {int} endHour   结束小时
 * @param {int} endMin    结束分钟
 */
function TimeInterval(startHour, startMin, endHour, endMin){

	this.start.hour;
	this.start.min;
	this.end.hour;
	this.end.min;

	//效验时间合法性
	if(parseInt(startHour) !== startHour || startHour < 0 || startHour > 23 || 
		parseInt(startMin) !== startMin || startMin < 0 || startMin > 59 || 
		parseInt(endHour) !== endHour || endHour < 0 || endHour > 23 || 
		parseInt(endMin) !== endMin || endMin < 0 || endMin > 59){

		throw new Error('startHour or startMin or endHour or endMin is invalid');
	}

	this.start.hour = startHour;
	this.start.min = startMin;
	this.end.hour = endHour;
	this.end.min = endMin;

}

/**
 * 定义消息的展示风格
 * @param {int} builderId 本地通知样式，必填。含义参见终端SDK文档
 * @param {int} ring      是否响铃，0否，1是。选填，默认0
 * @param {int} vibrate   是否振动，0否，1是。选填，默认0
 * @param {int} clearable 通知栏是否可清除，0否，1是。选填，默认1
 */
function Style(builderId, ring, vibrate, clearable){

	this.builderId;
	this.ring;
	this.vibrate;
	this.clearable;

	if(parseInt(builderId) !== builderId){
		throw('builderId is invalid');
	}

	this.builderId = builderId;

	if(ring === undefined){
		this.ring = 0;
	}else if(ring === 0 || ring === 1){
		this.ring = ring;
	}else{
		throw new Error('ring is invalid');
	}

	if(vibrate === undefined){
		this.vibrate = 0;
	}else if(vibrate === 0 || vibrate === 1){
		this.vibrate = vibrate;
	}else{
		throw new Error('vibrate is invalid');
	}

	if(clearable === undefined){
		this.clearable = 1;
	}else if(clearable === 0 || clearable === 1){
		this.clearable = clearable;
	}else{
		throw new Error('clearable is invalid');
	}
}

/**
 * 通知消息被点击时触发的事件
 * @param {int}    actionType 点击后的动作
 * @param {string} app        要打开的app或者activity   
 * @param {string} url        要打开的url
 * @param {int}    confirm    是否需要用户确认，0为否，1为是
 * @param {string} intent     要打开的intent
 */
function ClickAction(actionType, activity, url, confirm, intent){
	
	this.actionType;
	this.browser = {
		url: '',
		confirm: ''
	};
	this.activity = '';
	this.intent = '';

	//效验参数合法性
	switch(actionType){

		case exports.ACTION_TYPE_APP:
			if(typeof activity !== 'string' || activity.trim().length === 0){
				throw new Error('activity is invalid');
			}else{
				this.activity = activity;
			}
			break;

		case exports.ACTION_TYPE_BROWSER:
			if(typeof url !== 'string' || url.trim().length === 0){
				throw new Error('url is invalid');
			}else{
				this.browser.url = url;
			}
			if(confirm !== 0 && confirm !== 1){
				throw new Error('confirm is invalid');
			}else{
				this.browser.confirm = confirm;
			}
			break;

		case ACTION_TYPE_APP.ACTION_TYPE_INTENT:
			if(typeof intent !== 'string' || intent.trim().length === 0){
				throw new Error('intent is invalid');
			}else{
				this.intent = intent;
			}
			break;

		default:
			throw new Error('actionType is invalid');
		}

		this.actionType = actionType;

}

/**
 * 检查message对象是否合法
 * @param  {[type]}  message 待检查的message对象
 * @return {Boolean}         检查结果
 */
function isMessageValid(message){

	if(!(message instanceof Message)){
		throw new Error('message is invalid');
	}

	if(typeof message.content !== 'string' || message.content.trim().length === 0){
		throw new Error('content is invalid');
	}

	if(message.type !== exports.MESSAGE_TYPE_NOTIFICATION && message.type !== exports.MESSAGE_TYPE_MESSAGE){
		throw new Error('type is invalid');
	}

	if(parseInt(message.expireTime) !== message.expireTime || message.expireTime < 0 || message.expireTime > 60*60*24*3){
		throw new Error('expireTime is invalid');
	}

	if(parseInt(message.sendTime) !== message.sendTime || message.sendTime < 0){
		throw new Error('sendTime is invalid');
	}

	if(!isCustomContentValid(message.customContent)){
		throw new Error('customContent is invalid');
	}

	if(!isAccessTimeValid(message.acceptTime)){
		throw new Error('acceptTime is invalid');
	}

	if(message.type === exports.MESSAGE_TYPE_NOTIFICATION){
		
		//效验通知合法性
		
		if(typeof message.title !== 'string' || message.title.trim().length === 0){
			throw new Error('title is invalid');
		}

		if(!(message.style instanceof Style)){
			throw new Error('style is invalid');
		}

		if(!(message.action instanceof ClickAction)){
			throw new Error('action is invalid');
		}

	}else{

		//效验消息合法性
		if(typeof message.title !== 'string'){
			throw new Error('title is invalid');
		}		
	}

	return true;
}

/**
 * 检查acceptTime是否合法
 * @param  {array} acceptTime 待检查的acceptTime数组
 * @return {Boolean}          检查结果
 */
function isAccessTimeValid(acceptTime){

	var isValid = true;

	if(!util.isArray(acceptTime)){
		isValid = false;
	}else{
		for(var i=0; i < acceptTime.length; i++){
			if(!(acceptTime[i] instanceof TimeInterval)){
				isValid = false;
				break;
			}
		}
	}

	return isValid;
}

/**
 * 检查customContent是否合法
 * @param  {object} customContent 待检查的customContent对象
 * @return {Boolean}              检查结果
 */
function isCustomContentValid(customContent){
	
	var isValid = true;

	if(typeof customContent !== 'object'){
		isValid = false;
	}else{
		for(var key in customContent){
			var type = typeof customContent.key;
			if(type !== 'string' && type !=='number' && type !== 'boolean'){
				isValid = false;
				break;
			}
		}
	}

	return isValid;
}

/**
 * 调用API
 * @param  {string}   api                   api地址
 * @param  {object}   params                参数对象
 * @param  {string}   method                请求方法，GET或POST
 * @param  {string}   secretKey             应用的secretKey
 * @param  {Function} callback(err, result) 回调函数
 */
function callAPI(api, params, method, secretKey, callback){

	try{
		//将method转为大写
		method = method.toUpperCase();
		//效验method
		if(method !== 'GET' && method !== 'POST'){
			throw new Error('method is invalid');
		}

		//生成sign
		params.sign = generateSign(api, params, method, secretKey);
		
		//将参数urlencode
		for(var key in params){
			var value = params[key];
			//params[key] = encodeURIComponent(value);
			params[key] = value;
		}
		var strParams = querystring.stringify(params);

		var urlParams = url.parse(api);
		var host = urlParams.host;
		var path = urlParams.path;

		if(method === 'GET'){
			path += '?' + strParams;
		}

		var requestOption = {
			host: host,
			path: path,
			method: method,
			headers: {
				'Content-Type': 'application/json; charsert=utf-8'
			}
		};

		if(method === 'POST'){
			requestOption.headers['Content-Length'] = strParams.length;
		}

	}catch(e){
		return typeof callback === 'function' && callback(e);
	}
	

	var req = http.request(requestOption, function(res){
		res.setEncoding('utf8');
		res.on('data', function(data){
			//data = JSON.parse(data);
			typeof callback === 'function' && callback(null, data);
		});
	});

	req.on('error', function(e){
		typeof callback === 'function' && callback(e);
	});

	if(method === 'GET'){
		req.write();
	}else{
		req.write(strParams);
	}

	req.end();
}

/**
 * 生成sign
 * @param  {string} api       api地址
 * @param  {object} params    参数对象
 * @param  {string} method    请求方法，GET或POST
 * @param  {string} secretKey 应用的secretKey
 * @return {string}           生成的sign
 */
function generateSign(api, params, method, secretKey){

	//将method转为大写
	method = method.toUpperCase();
	if(method !== 'GET' && method !== 'POST'){
		throw new Error('method is invalid');
	}

	if(typeof params !== 'object'){
		throw new Error('params is invalid');
	}

	//提取host和path
	var urlParams = url.parse(api);
	var hostPath  = urlParams.host + urlParams.path;

	//对params里的key进行排序
	var arrKey = [];
	for(var key in params){
		arrKey.push(key);
	}
	arrKey.sort();

	//拼接参数字符串
	var strParams = '';
	for(var i=0; i < arrKey.length; i++){
		var value = params[arrKey[i]];
		strParams += arrKey[i] + '=' + value;
	}

	return md5(method + hostPath + strParams + secretKey);
}

/**
 * 检查是否空对象
 * @param  {object}  obj 待检查对象
 * @return {Boolean}     检查结果
 */
function isEmptyObj(obj){
	if(typeof obj !== 'object'){
		return false;
	}else{
		for(var attr in obj){
			return false;
		}
		return true;
	}
}

/**
 * md5加密
 * @param  {string} str 需要进行加密的字符串
 * @return {string}     加密后的字符串
 */
function md5(str){
	if(typeof str !== 'string'){
		return false;
	}
	return crypto.createHash('md5').update(str).digest('hex');
}

//导出模块

//常量定义

//消息类型：通知
exports.MESSAGE_TYPE_NOTIFICATION = 1;
//消息类型：透传消息
exports.MESSAGE_TYPE_MESSAGE = 2;

//消息推送适配平台：不限
exports.DEVICE_TYPE_ALL = 0;
//消息推送适配平台：浏览器
exports.DEVICE_TYPE_BROWSER = 1;
//消息推送适配平台：PC
exports.DEVICE_TYPE_PC = 2;
//消息推送适配平台：Android
exports.DEVICE_TYPE_ANDROID = 3;
//消息推送适配平台：iOS
exports.DEVICE_TYPE_IOS = 4;
//消息推送适配平台：winPhone
exports.DEVICE_TYPE_WINPHONE = 5;

//tag运算关系：AND
exports.TAG_OPERATION_AND = 'AND';
//tag运算关系：OR
exports.TAG_OPERATION_OR = 'OR';

//点击动作：打开Activity或APP
exports.ACTION_TYPE_APP = 1;
//点击动作：打开浏览器
exports.ACTION_TYPE_BROWSER = 2;
//点击动作：打开Intent
exports.ACTION_TYPE_INTENT = 3;


exports.XingeApp = XingeApp;
exports.Message = Message;
exports.TimeInterval = TimeInterval;
exports.Style = Style;
exports.ClickAction = ClickAction;



