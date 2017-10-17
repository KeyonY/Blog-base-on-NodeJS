const express = require('express');
const router = express.Router();
const crypto = require('crypto');	//加密模块
const path = require('path');
const underscore = require('underscore');
const identityModel = require('../models/identitys.js');
const mongoose = require('mongoose');

function hashAP(name,pwd){
	var hash = crypto.createHash('md5');
	hash.update(name + pwd);
	return hash.digest('hex');
}

var userdb;
identityModel.fetch().then(function(res){
	userdb = res;
});

function getLastLoginTime(name){
	for(var i = 0;i<userdb.length;i++){
		var user = userdb[i];
		if(name === user.name){
			return user.last;
		}
	}
	return '';
}

function updateLastLoginTime(name){
	for(var i = 0;i < userdb.length;i++){
		var user = userdb[i];
		if(name === user.name){
			user.last = Date().toString();
			return;
		}
	}
}

function authenticate(req,name,hash){
	for(var i = 0;i < userdb.length;i++){
		var user = userdb[i];
		if(name === user.account){
			if(hash === user.hash){
				req.session.user = user;
				return 0;
			}else{
				return 1;
			}
		}
	}
	return 2;
}

function isLogined(req){
	if(req.session.user){
		return true;
	}
	return false;
}

router.requireAuthentication = function(req,res,next){
	if(req.session.user){
		res.redirect('/stage');
		return;
	}
	res.sendFile(path.resolve(__dirname,'../dist/views/admin/login.html'));
}

router.post('/login',function(req,res,next){
	var name = req.body.account;
	var hash = hashAP(name,req.body.password);
	switch(authenticate(req,name,hash)){
		case 0: //success
			var lastTime = getLastLoginTime(name);
			updateLastLoginTime(name);
			// res.cookie('account',{account:name,hash:hash,last:lastTime},{maxAge:1*24*60*60*1000});
			res.redirect('/stage');
			break;
		case 1: //password error
			res.json({success:false,message:'密码错误'});
			break;
		case 2: //user not found
			res.json({success:false,message:'用户不存在'});
			break;
	}
})

router.get('/stage',function(req,res,next){
	if(isLogined(req)){
		res.sendFile(path.resolve(__dirname,'../dist/views/admin/layout.html'));
	}else{
		res.redirect('/manage');
	}
})

//修改密码接口
router.post('/manage/changepwd',function(req,res){
	var account = req.body.account;
	for(var i = 0;i < userdb.length;i++){
		if(account === userdb[i].account){
			var pwd = {
				account:req.body.account,
				hash:hashAP(req.body.account,req.body.pwd)
			}
			pwd = underscore.extend(userdb[i],pwd);
			pwd.save(function(err,pwd){
				if(err){
					console.log(err);
					res.json({success:false,message:err});
					return;
				}
				res.json({success:true,message:'修改密码成功'});
			})
			return;
		}
	}
})

module.exports = router;