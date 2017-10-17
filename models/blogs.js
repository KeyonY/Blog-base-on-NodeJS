var mongoose = require('mongoose');
var blogsSchema = require('../schemas/blogs');

mongoose.Promise = global.Promise;
var blogsConn = mongoose.createConnection('mongodb://localhost:27017/blogs');

//将Schema发布为Model
var blogs = blogsConn.model('Blogs',blogsSchema);

module.exports = blogs;

/*//用model创建Entity
var worksEntity = new worksModel({name:'worksList'});
//打印实体的名字
console.log(worksEntity.name);
worksEntity.save(function(err,worksEntity){
	if(err) return console.error(err);
	worksEntity.success();
})
worksModel.find(function(err,item){
	if(err) return console.error(err);
	console.log(item);
})*/