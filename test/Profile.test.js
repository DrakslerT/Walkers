const {
    app,
    supertestRequest,
    faker,
    createActivationCode,
  } = require("../src/server/test.exports.js");

describe("Get profile", () => {
    
      
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
  
  
  it(`get profile 1`, (done) => {
      supertestRequest(app)
      .get('/api/profile')
      .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          return done(err);
        } 
        return done();
      });
  });

  it(`get profile 1`, (done) => {
    supertestRequest(app)
    .put('/api/profile/update')
    .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
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

describe("Get profile owner", () => {
    
      
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

  it(`Login 1`, (done) => {
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
  
  
  it(`get profile 2`, (done) => {
      supertestRequest(app)
      .get('/api/profile')
      .set("Authorization", `Bearer ${user.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          return done(err);
        } 
        return done();
      });
  });

  it(`get profile 3`, (done) => {
    supertestRequest(app)
    .put('/api/profile/update')
    .set("Authorization", `Bearer ${user.token}`)
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