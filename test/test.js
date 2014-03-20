var Xinge = require('../lib/Xinge');

var accessId  = 2200002957;
var secretKey = 'b406a22207c15f1278939d4e58e9dffe';
var XingeApp = new Xinge.XingeApp(accessId, secretKey);

//Android message start.
var style = new Xinge.Style(0, 1, 1, 1, 0);
var action = new Xinge.ClickAction(Xinge.ACTION_TYPE_BROWSER, null, 'http://xg.qq.com', 1);
var androidMessage = new Xinge.AndroidMessage();
androidMessage.type = Xinge.MESSAGE_TYPE_NOTIFICATION;
androidMessage.title = '1';
androidMessage.content = '2';
androidMessage.style = style;
androidMessage.action = action;
androidMessage.sendTime = Date.parse('2014-02-19 15:33:30') / 1000;
androidMessage.expireTime = 86400;
androidMessage.acceptTime.push(new Xinge.TimeInterval(0, 0, 23, 59));
androidMessage.customContent = {
	'name': 'huangnaiang'
};
androidMessage.multiPkg = 0;
//And message end.

//IOS message start.
var iOSMessage = new Xinge.IOSMessage();
iOSMessage.alert = 'av';
iOSMessage.badge = 22;
iOSMessage.sound = 'df';
iOSMessage.acceptTime.push(new Xinge.TimeInterval(0, 0, 23, 0));
iOSMessage.customContent = {
    key1: 'value1',
    key2: 'value2'
};
//IOS message end.

//推送消息给指定设备
XingeApp.pushToSingleDevice('e3ab84d2d0673c8776bb831a093fe61bea2180639993fa734bb5f0a686188eb5', iOSMessage, function(err, result){
	console.log(result);
}, exports.IOS_ENV_DEV);

//推送消息给指定账户或别名
XingeApp.pushToSingleAccount(Xinge.DEVICE_TYPE_ALL, 'account', androidMessage, function(err, result){
	console.log(result);
});

//推送消息给所有设备
XingeApp.pushToAllDevices(Xinge.DEVICE_TYPE_ALL, iOSMessage, function(err, result){
	console.log(result);
}, exports.IOS_ENV_DEV);

//推送消息给指定tag
XingeApp.pushByTags(Xinge.DEVICE_TYPE_IOS, ['av'], Xinge.TAG_OPERATION_OR, androidMessage, function(err, result){
	console.log(result);
});

//批量查询消息推送状态
XingeApp.queryPushStatus(['2824'], function(err, result){
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