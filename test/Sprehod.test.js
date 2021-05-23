const {
    app,
    supertestRequest,
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
      it(`Login ilija`,(done) => {
        supertestRequest(app)
        .post('/api/login')
        .send(userilija)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            token = res.body.accessToken;
            userilija = { ...userilija, token };
            return done();
        });
    });
    it(`Get walks 1.5`,(done) => {
        supertestRequest(app)
        .post('/api/walkNotifications')
        .set("Authorization", `Bearer ${userilija.token}`)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            return done();
        });
    });

      it(`Get walks 1`,(done) => {
        supertestRequest(app)
        .get('/api/walks')
        .set("Authorization", `Bearer ${userilija.token}`)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            return done();
        });
    });

    it(`Get Send walks 1`,(done) => {
        supertestRequest(app)
        .post('/api/sendWalkRequest')
        .send({ IDoglasa: 40, dogId: 25 })
        .set("Authorization", `Bearer ${userilija.token}`)
        .expect(400)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            return done();
        });
    });

    it(`Get Send walks 2`,(done) => {
        supertestRequest(app)
        .post('/api/sendWalkRequest')
        .send({ IDoglasa: 40, dogId: 26 })
        .set("Authorization", `Bearer ${userilija.token}`)
        .expect(400)
        .end(function(err, res) {
            if (err) {
                console.error(err);
                return done(err);
            }
            return done();
        });
    });

    
  });