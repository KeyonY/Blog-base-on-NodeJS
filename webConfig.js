const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();
const fs = require('fs');
const underscore = require('underscore');
const ueditor = require('ueditor');
var blogsModel = require('./models/blogs.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const identity = require('./config/identity.js');
const routerBlog = require('./config/blog.js');

app.locals.pretty = true;
// app.locals.debug = true;

app.set('views','./dist/views/pages');
app.set('view engine','jade');
// app.set('view options',{debug:true,pretty:true});

app.use(session({
	secret: 'xilan',
	name: 'admin',
	cookie: {maxAge: 7*24*60*60*1000},
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({
		url: 'mongodb://localhost/sessions'
	})
}));
app.use(bodyParser.urlencoded({	//用来验证form表单中的json数据
	extended: true
}))
app.use(bodyParser.json());
app.use(cookieParser('xilan'));
app.use(express.static(__dirname,{index:'dist/'}));	//设置静态文件的根目录
app.use("/dist/ueditor/ue",ueditor(path.join(__dirname,''),function(req,res,next){
	//ueditor客户发起上传图片请求
	if(req.query.action === 'uploadimage'){
		//这里可以获得上传图片的信息
		var foo = req.ueditor;

		//图片保存到的路径，以(path.join(__dirname,'Temp')为根目录
		var img_url = '/Temp/ueditor/upload/images';
		res.ue_up(img_url);
	}
	//客户端发起图片列表请求
	else if(req.query.action === 'listimage'){
		//要展示给客户端的文件夹路径
		res.ue_list(img_url);
	}
	//客户端发起其他请求
	else{
		res.setHeader('Content-Type','application/json');
		//这里填写 ueditor.config.json 这个文件的路径
		res.redirect('/dist/ueditor/ueditor.config.json');
	}
}))
app.use('/',identity);	//身份验证路由
app.use('/',routerBlog);	//blog路由
app.listen(port);

console.log('Started on port '+port);



//后台未登录时，重定向
app.get('/manage',function(req,res,next){
	identity.requireAuthentication(req,res,next);
})

