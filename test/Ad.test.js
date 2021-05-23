const {
    app,
    supertestRequest,
    faker,
  } = require("../src/server/test.exports.js");

  describe("Logged in user add Ad", () => {
    let add = {
        lokacija: "Ljubljana",
        startDate: "2021-05-09T17:35:36.123",
        endDate: "2021-05-09T17:55:36.412",
        breed: 1
      };
      
      let user = {
        email: "ilija.tavcioski@gmail.com",
        password: "123456789",
      };
      let userWalkerWithMaxAd = {
        email: "ile.tavcioski@gmail.com",
        password: "987654321",
      };
    
      let userWalkerWithoutMaxAd = {
        email: "it8816@student.uni-lj.si",
        password: "1987654321",
      };
      let randomUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.userName(),
        userType: "owner",
      };

    it(`Login `, (done) => {
        supertestRequest(app)
        .post('/api/login')
        .send(userWalkerWithMaxAd)
        .expect(200)
        .end(function (err, res) {
            if (err) {
              console.error(res.body);
              return done(err);
            }
            token = res.body.accessToken;
           // console.log("TOKEN1->"+token);
            userWalkerWithMaxAd = {...userWalkerWithMaxAd,  token};
            //console.log("TOKEN2->"+userWalkerWithoutMaxAd.token);
            return done();
        });
    });
    
    
    it(`Try to Add Ad`, (done) => {
        supertestRequest(app)
        .post('/api/addAdd')
        .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
        .send(add)
        .expect(400)
        .end(function (err, res) {
          if (err) {
            console.error(err);
            return done(err);
          } 
          return done();
        });
    });
  });

  describe("Another Logged in user add Ad", () => {
    let add = {
        lokacija: "Ljubljana",
        startDate: "2021-06-09T17:35:36.123",
        endDate: "2021-06-09T17:55:36.412",
        breed: 1
      };
      
      let user = {
        email: "ilija.tavcioski@gmail.com",
        password: "123456789",
      };
      let userWalkerWithMaxAd = {
        email: "ile.tavcioski@gmail.com",
        password: "987654321",
      };
    
      let userWalkerWithoutMaxAd = {
        email: "ilijatavchioski@gmail.com",
        password: "123456",
      };
      let randomUser = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.userName(),
        userType: "owner",
      };

    it(`Login `, (done) => {
        supertestRequest(app)
        .post('/api/login')
        .send(userWalkerWithoutMaxAd)
        .expect(200)
        .end(function (err, res) {
            if (err) {
              console.error(res.body);
              return done(err);
            }
            token = res.body.accessToken;
           // console.log("TOKEN1->"+token);
            userWalkerWithoutMaxAd = {...userWalkerWithoutMaxAd,  token};
            //console.log("TOKEN2->"+userWalkerWithoutMaxAd.token);
            return done();
        });
    });
    
    let id = '';
    it(`Try to Add Ad`, (done) => {
        supertestRequest(app)
        .post('/api/addAdd')
        .set("Authorization", `Bearer ${userWalkerWithoutMaxAd.token}`)
        .send(add)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            console.error(err);
            return done(err);
          } 
          idoglas = res.body.nasid;
          //console.log(idoglas);
          add = {...add, idoglas};
          return done();
        });
    });

    it(`Login anothe user`,(done) => {
      supertestRequest(app)
      .post('/api/login')
      .send(user)
      .expect(200)
      .end(function (err, res) {
          if (err) {
            console.error(res.body);
            return done(err);
          }
          token = res.body.accessToken;
         // console.log("TOKEN1->"+token);
          user = {...user,  token};
          //console.log("TOKEN2->"+userWalkerWithoutMaxAd.token);
          return done();
      });
    });
    
    it(`Send walk request`,(done) => {
      supertestRequest(app)
      .post('/api/sendWalkRequest')
      .set("Authorization", `Bearer ${user.token}`)
      .send({ IDoglasa: add.idoglas, dogId: 25 })
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
    });
   /* it(`Try to Delete Ad which is not your`, (done) => {
      //console.log("ID->"+add.idoglas);
      supertestRequest(app)
      .post('/api/oglas/delete')
      .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
      .send({AdId: add.idoglas})
      .expect(400)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          return done(err);
        } 
      });
  });
  */
    //console.log("ID->"+add.idoglas);
    it(`Login old user`, (done) => {
      supertestRequest(app)
      .post('/api/login')
      .send(userWalkerWithoutMaxAd)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.error(err);
          return done(err);
        }
        token1 = res.body.accessToken;
        userWalkerWithoutMaxAd = { ...userWalkerWithoutMaxAd, token1};
        return done();
      });
    });
    it(`Try to Delete Ad`, (done) => {
     // console.log("ID->"+add.idoglas);
      supertestRequest(app)
      .post('/api/oglas/delete')
      .set("Authorization", `Bearer ${userWalkerWithoutMaxAd.token1}`)
      .send({AdId: add.idoglas})
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          return done(err);
        } 
        return done();
      });
  });
  
  });
  

  
  //.auth(userWalkerWithoutMaxAd.token, {type: 'bearer'})