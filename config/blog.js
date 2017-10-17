const express = require('express');
const router = express.Router();
const path = require('path');
const underscore = require('underscore');
const blogsModel = require('../models/blogs.js');
const mongoose = require('mongoose');
const fs = require('fs');
const img = require('images');

//首页-blogList 列表页
router.get('/',function(req,res){
	blogsModel.fetch().then(function(res2){
		blogsModel.findClassCount({tag:0}).then(function(res3){
			blogsModel.findClassCount({tag:1}).then(function(res4){
				blogsModel.findClassCount({tag:2}).then(function(res5){
					blogsModel.findClassCount({tag:3}).then(function(res6){
						blogsModel.findClassCount({tag:4}).then(function(res7){
							blogsModel.findClassCount({tag:5}).then(function(res8){
								res.render('index',{
									title: 'Keyon Y的个人站——首页',
									blogs: res2,
									classCount: [res3,res4,res5,res6,res7,res8]
								})
							})
						})	
					})
				})
			})
		})
	})
})
//按分类搜索blog的路由
router.get('/blogList*',function(req,res){
	blogsModel.findByCls({tag:req.query.tag}).then(function(res2){
		blogsModel.findClassCount({tag:0}).then(function(res3){
			blogsModel.findClassCount({tag:1}).then(function(res4){
				blogsModel.findClassCount({tag:2}).then(function(res5){
					blogsModel.findClassCount({tag:3}).then(function(res6){
						blogsModel.findClassCount({tag:4}).then(function(res7){
							blogsModel.findClassCount({tag:5}).then(function(res8){
								res.render('index',{
									title: 'Keyon Y的个人站——首页',
									blogs: res2,
									classCount: [res3,res4,res5,res6,res7,res8]
								})
							})
						})	
					})
				})
			})
		})
	})
})
//blog详情页
router.get('/blog*',function(req,res){
	blogsModel.findById(req.query.id,function(err,res2){
		if(err){console.log(err);}
		res2.scan++;
		res2.save(function(err,res3){
			if(err){console.log(err);}
		})
		res.render('blogDetail',{
			title: res2.title+'-Keyon Y',
			blog: res2
		})
	})
})
//blog详情页点赞功能接口
router.get('/custom/blog/good*',function(req,res){
	blogsModel.findById(req.query.id,function(err,res2){
		if(err){console.log(err);}
		res2.smallzan++;
		res2.save(function(err,res3){
			if(err){console.log(err);}
		})
		res.json({success:true,message:'谢谢鼓励！'});
	})
})

//保存blog
router.post('/manage/blog/create',function(req,res){
	var id = req.body._id;
	var blogObj = req.body;
	var _blog;
	if(id != undefined){
		blogsModel.findById(id,function(err,res2){
			if(err){console.log(err);}
			_blog = underscore.extend(res2,blogObj);
			_blog.save(function(err,blog){
				if(err){console.log(err);}

				//如果更新了，就重定向到..
				// res.redirect('/manage#/BlogList');
				res.json({success:true,message:'成功',redirect:'/BlogList'});
			})
		})
	}else{
		_blog = new blogsModel({
			title: blogObj.title,
			intro: blogObj.intro,
			article: blogObj.article,
			tag: blogObj.tag
		})
		_blog.save(function(err,blog){
			if(err){console.log(err);}
			res.json({success:true,message:'成功',redirect:'/BlogList'});
		})
	}
})

//获取blog列表 接口
router.get('/access/blogList',function(req,res){
	if(req.query.id){
		blogsModel.findById(req.query.id,function(err,blog){
			if(err){console.log(err);}
		}).then(function(res2){
			res.json(res2);
		})
	}else{
		blogsModel.fetch().then(function(res2){
			res.json(res2);
		})
	}
})

//获取blog内容，以编辑blog
router.get('/access/blog\?*',function(req,res){
	blogsModel.findById(req.query.id,function(err,blog){
		if(err){console.log(err);}
	}).then(function(res2){
		res.json(res2);
	})
})

module.exports = router;