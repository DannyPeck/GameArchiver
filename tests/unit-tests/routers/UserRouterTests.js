var blueprint = require ('@onehilltech/blueprint')
  , request   = require ('supertest')
  , expect    = require ('chai').expect
  ;

var appPath = require ('../../fixtures/appPath')
  , users = require ('../../fixtures/users')
  ;

describe ('UserRouter', function () {
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

        request(blueprint.app.server.app)
          .post ('/users')
          .send (userData)
          .expect (200)
          .end (function (err, res) {
            if (err) { return done (err); }

            expect (userData.user.email).to.equal (res.body.user.email);
            return done ();
          });
      });
    });

  });
});

