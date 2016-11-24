var blueprint = require ('@onehilltech/blueprint')
  , mongodb = require ('@onehilltech/blueprint-mongodb')
  , ResourceController = mongodb.ResourceController
  ;

var User = require ('../models/User')
  ;

function UserController () {
  ResourceController.call (this, {name: 'user', model: User});
}

blueprint.controller (UserController, ResourceController);

module.exports = exports = UserController;