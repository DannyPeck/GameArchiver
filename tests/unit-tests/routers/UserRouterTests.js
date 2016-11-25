var blueprint = require ('@onehilltech/blueprint')
  , request   = require ('supertest')
  , expect    = require ('chai').expect
  ;

var appPath = require ('../../fixtures/appPath')
  , users = require ('../../fixtures/users')
  ;

describe ('UserRouter', function () {

  var user;
  var userToken;

  before (function (done) {
    blueprint.testing.createApplicationAndStart (appPath, done);
  });

  after (function (done) {
    blueprint.app.models.User.remove ({}, done);
  });

  describe ('/users', function () {

    describe ('POST', function () {
      it ('should create a user with valid input', function (done) {
        var userData = users[0];

        request (blueprint.app.server.app)
          .post ('/users')
          .send (userData)
          .expect (200)
          .end (function (err, res) {
            if (err) { return done (err); }

            user = res.body.user;

            expect (userData.user.email).to.equal (user.email);
            return done ();
          });
      });
    });
  });

  describe ('/v1/users', function () {

    before (function (done) {
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
          return done ();
        });
    });

    describe ('GET', function () {
      it ('should retrieve all users', function (done) {
        request (blueprint.app.server.app)
          .get ('/v1/users')
          .set ('Authorization', 'bearer ' + userToken)
          .expect (200, done);
      });
    });
  });
});

