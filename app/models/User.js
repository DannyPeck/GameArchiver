var mongodb = require ('@onehilltech/blueprint-mongodb')
  ;

var schema = new mongodb.Schema({
  email: {type: String, required: true, trim: true},
  username: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true}
});

const COLLECTION_NAME = 'user';
module.exports = exports = mongodb.model (COLLECTION_NAME, schema);
