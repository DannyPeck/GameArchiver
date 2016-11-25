var blueprint = require ('@onehilltech/blueprint')
  , mongodb = require ('@onehilltech/blueprint-mongodb')
  , ResourceController = mongodb.ResourceController
  ;

var Game = require ('../models/Game')
  ;

function GameController () {
  ResourceController.call (this, {name: 'game', model: Game});
}

blueprint.controller (GameController, ResourceController);

module.exports = exports = GameController;