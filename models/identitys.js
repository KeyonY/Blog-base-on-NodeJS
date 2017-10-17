var mongoose = require('mongoose');
var identitysSchema = require('../schemas/identitys');

mongoose.Promise = global.Promise;
var identitysConn = mongoose.createConnection('mongodb://localhost:27017/identitys');

var identitys = identitysConn.model('identitys',identitysSchema);

module.exports = identitys;