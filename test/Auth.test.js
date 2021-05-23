const {
  app,
  supertestRequest,
  faker,
  createActivationCode,
} = require("../src/server/test.exports.js");

describe("#AuthTest - walker", () => {
  let randomUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.userName(),
    userType: "walker",
  };

  it(`Register random user ${randomUser.email}`, (done) => {
    supertestRequest(app)
      .post("/api/register")
      .send(randomUser)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }

        token = res.body.accessToken;
        randomUser = { ...randomUser, token };
        return done();
      });
  });

  it(`Login with wrong email`, (done) => {
    supertestRequest(app)
      .post("/api/login")
      .send({ email: faker.internet.email(), password: randomUser.password })
      .expect(404)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it(`Login with wrong password`, (done) => {
    supertestRequest(app)
      .post("/api/login")
      .send({ email: randomUser.email, password: randomUser.name })
      .expect(400)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it(`Login random user ${randomUser.email}`, (done) => {
    supertestRequest(app)
      .post("/api/login")
      .send({ email: randomUser.email, password: randomUser.password })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        token = res.body.accessToken;
        //console.log("VLEZEE->" + token);
        randomUser = { ...randomUser, token };
        return done();
      });
  });

  it(`Activate user ${randomUser.email} with no token`, (done) => {
    const acCode = createActivationCode(randomUser.name, new Date());
    supertestRequest(app)
      .post("/api/activate_user")
      .send({ ActivationCode: acCode })
      .expect(401)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
  
  it(`Activate user ${randomUser.email}`, (done) => {
    const acCode = createActivationCode(randomUser.name, new Date());
    supertestRequest(app)
      .post("/api/activate_user")
      .send({ ActivationCode: acCode })
      .set("Authorization", `Bearer ${randomUser.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it("Try registering with same email", (done) => {
    supertestRequest(app)
      .post("/api/register")
      .send(randomUser)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
  let randomDog = {
    name: faker.name.firstName(),
    gender: faker.random.arrayElement(["male", "female"]),
    breed: faker.datatype.number({ min: 1, max: 105 }),
  };
  it("Walker to add a dog", (done) => {
    supertestRequest(app)
      .post("/api/dogs/add")
      .send(randomDog)
      .set("Authorization", `Bearer ${randomUser.token}`)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
});

describe("#AuthTest - owner", () => {
  let randomUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.userName(),
    userType: "owner",
  };

  it(`Register random user ${randomUser.email}`, (done) => {
    supertestRequest(app)
      .post("/api/register")
      .send(randomUser)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }

        token = res.body.accessToken;
        randomUser = { ...randomUser, token };
        return done();
      });
  });

  let randomDog = {
    name: faker.name.firstName(),
    gender: faker.random.arrayElement(["male", "female"]),
    breed: faker.datatype.number({ min: 1, max: 105 }),
  };

  it(`Add dog ${randomDog.name} to ${randomUser.email}`, (done) => {
    supertestRequest(app)
      .post("/api/dogs/add")
      .send(randomDog)
      .set("Authorization", `Bearer ${randomUser.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
 let randomDog1 = {
  name: faker.name.firstName(),
  gender: faker.random.arrayElement(["male", "female"]),
 };
  it(`Add onther dog ${randomDog1.name} to ${randomUser.email}`, (done) => {
    supertestRequest(app)
      .post("/api/dogs/add")
      .send(randomDog1)
      .set("Authorization", `Bearer ${randomUser.token}`)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it(`Error with token`, (done) => {
    supertestRequest(app)
      .post("/api/dogs/add")
      .send(randomDog)
      .set("Authorization", `${randomUser.token}`)
      .expect(401)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it(`Wrong token`, (done) => {
    supertestRequest(app)
      .post("/api/dogs/add")
      .send(randomDog)
      .set("Authorization", `Bearer ${randomUser.token}1`)
      .expect(401)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it("login", (done) => {
    //console.log("TEST");
    //console.log(done);
    supertestRequest(app)
      .post("/api/login")
      .send({ email: randomUser.email, password: randomUser.password })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        token = res.body.accessToken;
        randomUser = { ...randomUser, token };
        return done();
      });
  });

  let add = {
    lokacija: "Ljubljana",
    startDate: "2021-05-09T17:35:36.123",
    startEnd: "2021-05-09T17:55:36.412",
    breed: 1
  };

  it("Create an add with no token", (done) => {
    supertestRequest(app)
      .post("/api/addAdd")
      .send(add)
      .expect(401)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
  /*
   it("Succesfully create an add", (done) => {
     supertestRequest(app)
       .post("/api/addAdd")
       .send(add)
       .set("Authorization", `Bearer ${randomUser.token}`)
       .expect(200)
       .end(function (err, res) {
         if (err) {
           console.error(res.body);
           return done(err);
         }

         return done();
       });
   });
   */
});

describe("#AuthTest - other role eg. admin", () => {
  let randomUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.userName(),
    userType: "admin",
  };

  it(`Register random admin ${randomUser.email}`, (done) => {
    supertestRequest(app)
      .post("/api/register")
      .send(randomUser)
      .expect(400)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
});

describe("Create add test", () => {

  let add1 = {
    lokacija: "Ljubljana",
    startDate: "2021-05-09T17:35:36.123",
    startEnd: "2021-05-09T17:55:36.412",
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

  it(`User login ${user.email}`, (done) => {
    supertestRequest(app)
      .post("/api/login")
      .send(user)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          console.log("SOME ERROR");
          return done(err);
        }
        return done();
      }

      );
  });

  
});
