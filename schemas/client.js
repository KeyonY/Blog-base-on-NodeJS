var mongoose = require('mongoose');
var assert = require('assert');
// mongoose.connect = ('mongodb://localhost:3000/blogs');

/*var db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误:'));
db.once('open',function(cb){
	//一次打开记录
	console.log('连接成功');
})*/

//定义一个Schema
var blogsSchema = new mongoose.Schema({
	blogsID:String,
	title:String,		//定义一个属性name,类型为String
	intro:String,
	cover:String,
	overTime:{type:Date,default:Date.now()},
	labs: Array
/*	meta:{
		overTime:{
			type: Date,
			default: Date.now()
		}
	}*/
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
		return query.exec();
	},
	//按id查询的方法
	findById: function(id,cb){
		return this.findOne({_id:id}).exec(cb);
	}
}

module.exports = blogsSchema;