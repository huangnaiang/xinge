var Xinge = require('../lib/Xinge');
var XingeApp = new Xinge.XingeApp('2100001932', 'ebaf10ce868fec205efc0706e8bc5312');

var style = new Xinge.Style(0,1,1,1);
var action = new Xinge.ClickAction(Xinge.ACTION_TYPE_BROWSER, null, 'http://xg.qq.com', 1);

var message = new Xinge.Message();
message.type = Xinge.MESSAGE_TYPE_NOTIFICATION;
message.title = '1';
message.content = '2';
message.sendTime = 1387446540;
message.style = style;
message.action = action;

XingeApp.pushToSingleDevice('c682191aa2aedbc44fbabe5dff99eb037c696338', message, 400, function(err, result){
 	console.log(result);
});
 

XingeApp.pushToAllDevices(Xinge.DEVICE_TYPE_ALL, message, 400, function(err, result){
	console.log(result);
});

XingeApp.queryPushStatus([516, 517, 518], 400, function(err, result){
	console.log(result);
});

XingeApp.queryDeviceCount(400, function(err, result){
	console.log(result);
});

XingeApp.queryAppTags(0, 100, 400, function(err, result){
	console.log(result);
});

XingeApp.cancelTimingTask('1', 400, function(err, result){
	console.log(result);
});