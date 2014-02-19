var Xinge = require('../lib/Xinge');
var XingeApp = new Xinge.XingeApp(2100000000, 'eb32f10ce868fec205efccd46e8bc53ds');

var style = new Xinge.Style(0,1,1,1);
var action = new Xinge.ClickAction(Xinge.ACTION_TYPE_BROWSER, null, 'http://xg.qq.com', 1);

var message = new Xinge.Message();
message.type = Xinge.MESSAGE_TYPE_NOTIFICATION;
message.title = '你好';
message.content = '这是一条来自Node API的测试消息';
message.style = style;
message.action = action;
message.sendTime = Date.parse('2014-02-19 15:33:30') / 1000;
message.expireTime = 86400;
message.acceptTime.push(new Xinge.TimeInterval(7, 0, 8, 0));
message.acceptTime.push(new Xinge.TimeInterval(13, 0, 23, 59));
message.customContent = {
	'key': 'value',
	'name': 'huangnaiang',
	'age': '24'
};

//推送消息给指定设备
XingeApp.pushToSingleDevice('token', message, function(err, result){
 	console.log(result);
});

//推送消息给指定账户或别名
XingeApp.pushToSingleAccount(Xinge.DEVICE_TYPE_ALL, 'account', message, function(err, result){
	console.log(result);
});
 
//推送消息给所有设备
XingeApp.pushToAllDevices(Xinge.DEVICE_TYPE_ANDROID, message, function(err, result){
	console.log(result);
});

//推送消息给指定tag
XingeApp.pushByTags(Xinge.DEVICE_TYPE_IOS, ['123', 'abc'], Xinge.TAG_OPERATION_OR, message, function(err, result){
	console.log(result);
});

//批量查询消息推送状态
XingeApp.queryPushStatus(['703', 704, '702'], function(err, result){
	console.log(result);
});

//查询设备数量
XingeApp.queryDeviceCount(function(err, result){
	console.log(result);
}); 

//查询tag
XingeApp.queryTags(0, 100, function(err, result){
	console.log(result);
});

//取消未触发的定时任务
XingeApp.cancelTimingTask(718, function(err, result){
	console.log(result);
});