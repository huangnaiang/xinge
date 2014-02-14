var Xinge = require('../lib/Xinge');
var XingeApp = new Xinge.XingeApp('1', '2');

var style = new Xinge.Style(0,1,1,1);
var action = new Xinge.ClickAction(2, null, 'http://xg.qq.com', 1);

var message = new Xinge.Message();
message.type = Xinge.MESSAGE_TYPE_NOTIFICATION;
message.title = 'my title';
message.content = 'my content';
message.style = style;
message.action = action;

//XingeApp.PushSingleDevice('3', message, 400, function(err, result){
	//console.log(result);
//});

XingeApp.pushSingleAccount();


