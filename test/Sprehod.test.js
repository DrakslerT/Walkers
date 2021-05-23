const {
    app,
    supertestRequest,
    faker,
    createActivationCode,
  } = require("../src/server/test.exports.js");

  describe("Create Sprehod", () => {
      let userile = {
          email: "ile.tavcioski@gmail.com",
          password: "987654321",
      };

      let userilija = {
          email: "ilija.tavcioski@gmail.com",
          password: "123456789",
      };

      it(`Login ile`,(done) => {
        supertestRequest(app)
        .post('/api/login')
        .send(userile)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            token = res.body.accessToken;
            userile = { ...userile, token };
            return done();
        });
    });
      it(`Get walks`,(done) => {
          supertestRequest(app)
          .post('/api/walkNotifications')
          .set("Authorization", `Bearer ${userile.token}`)
          .expect(200)
          .end(function(err, res) {
              if (err) {
                  console.error(err);
                  return done(err);
              }
              return done();
          });
      });

      it(`Get oglasi`,(done) => {
        supertestRequest(app)
        .get('/api/oglas/me')
        .set("Authorization", `Bearer ${userile.token}`)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            return done();
        });
    });
  });