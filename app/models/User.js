var mongodb = require ('@onehilltech/blueprint-mongodb')
  ;

var schema = new mongodb.Schema ({
  email: {type: String, required: true, trim: true},
  username: {type: String, required: true, trim: true},
  password: {type: String, required: true, trim: true},
  token: {type: String, required: false, trim: true}
});

const COLLECTION_NAME = 'user';

schema.methods.verifyPassword = function (password) {
  return (this.password == password);
};

module.exports = exports = mongodb.model (COLLECTION_NAME, schema);
