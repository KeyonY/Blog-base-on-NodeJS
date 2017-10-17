var mongoose = require('mongoose');
var assert = require('assert');

function hashAP(name,pwd){
	var hash = crypto.createHash('md5');
	hash.update(name + pwd);
	return hash.digest('hex');
}
var identitySchema = new mongoose.Schema({
	account:String,
	hash:String,
	last:String
})

identitySchema.statics = {
	fetch: function(cb){
		var query = this.find({});
		mongoose.Promise = global.Promise;
		assert.equal(query.exec().constructor,global.Promise);
		return query.exec(cb);
	},
	findById: function(name,cb){
		return this.findOne({account:name}).exec(cb);
	}
}

module.exports = identitySchema;