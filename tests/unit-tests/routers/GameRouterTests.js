var blueprint = require ('@onehilltech/blueprint')
  , request   = require ('supertest')
  , expect    = require ('chai').expect
  , async     = require ('async')
  ;

var appPath = require ('../../fixtures/appPath')
  , games = require ('../../fixtures/games')
  , users = require ('../../fixtures/users')
  ;

describe ('GameRouter', function () {

  var userId;
  var userToken;

  before (function (done) {
    blueprint.testing.createApplicationAndStart (appPath, done);
  });

  after (function (done) {
    blueprint.app.models.User.remove ({});
    blueprint.app.models.Game.remove ({}, done);
  });

  describe ('/v1/games', function () {

    before (function (done) {
      async.waterfall ([
        function (callback) {
          var userData = users[0];

          request (blueprint.app.server.app)
            .post ('/users')
            .send (userData)
            .end (function (err, res) {
              if (err) { return done (err); }

              var user = res.body.user;
              userId = user._id;

              callback (null, user);
            });
        },

        function (user, callback) {
          var credentials = {
            username: user.username,
            password: user.password
          };

          request (blueprint.app.server.app)
          .post ('/login')
          .send (credentials)
          .end (function (err, res) {
            if (err) { return done (err); }

            userToken = res.body.token;

            callback ();
          });
        }
      ], done);
    });

    describe ('POST', function () {
      it ('should successfully create a game', function (done) {
        var gameData = games[0];
        gameData.user = userId;

        request (blueprint.app.server.app)
          .post ('/v1/games')
          .set ('Authorization', 'bearer ' + userToken)
          .send (gameData)
          .expect (200)
          .end (function (err, res) {
            if (err) { return done (err); }

            var game = res.body.game;

            expect (gameData.game.title).to.equal (game.title);
            return done ();
          });
      });
    });
  });
});

