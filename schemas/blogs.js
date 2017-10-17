var mongoose = require('mongoose');
var assert = require('assert'); //断言

//定义一个Schema
var blogsSchema = new mongoose.Schema({
	blogID:String,
	title:String,		//定义一个属性name,类型为String
	intro:String,
	article:String,
	overTime:{type:String,default:'/Date('+new Date().getTime().toString()+')/'},
	tag: Number,
	scan: {type:Number,default:0},	//浏览次数
	smallzan: {type:Number,default:0} //blog被赞的次数
});
//每次调用save之前，执行此方法
/*blogsSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.overTime = Date.now();
	}else{
		this.meta.overTime = Date.now();
	}

	next();
})*/
//为Schema添加静态方法
blogsSchema.statics = {
	//查询所有数据的方法
	fetch: function(cb){
		var query = this.find({}).sort('overTime');
		mongoose.Promise = global.Promise;
		assert.equal(query.exec().constructor,global.Promise);
		return query.exec(cb);
	},
	//按分类查询的方法
	findByCls: function(cls,cb){
		var query = this.find(cls).sort('overTime');
		mongoose.Promise = global.Promise;
		assert.equal(query.exec().constructor,global.Promise);
		return query.exec(cb);
	},
	//按id查询的方法
	findById: function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	},
	//查询各分类文章数量
	findClassCount: function(type,cb){
		return this.count(type).exec(cb);
	}
}

module.exports = blogsSchema;