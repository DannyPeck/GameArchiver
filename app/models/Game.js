var mongodb = require ('@onehilltech/blueprint-mongodb')
  ;

var User = require ('./User')
  ;

var schema = new mongodb.Schema ({
  user: {type: mongodb.Schema.ObjectId, ref: User.modelName, required: false},
  title: {type: String, required: true, trim: true},
  system: {type: String, required: true, trim: true},
  year: {type: Number, required: false, trim: true}
});

const COLLECTION_NAME = 'game';

module.exports = exports = mongodb.model (COLLECTION_NAME, schema);
