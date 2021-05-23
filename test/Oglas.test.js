const {
    app,
    supertestRequest,
    faker,
    createActivationCode,
  } = require("../src/server/test.exports.js");

  describe("Get oglasi", () => {
    
      
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
    
    
    it(`get oglasi 1`, (done) => {
        supertestRequest(app)
        .get('/api/oglas/getOglasi')
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

    
    
    /*let filter1 = { '0': 'test', '1': '', '2': '7', '3': 'Ljubljana', '4': '0' };
    it(`get oglasi 4`, (done) => {
      supertestRequest(app)
      .get('/api/oglas/getOglasi')
      .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
      .query(filter1)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(err);
          return done(err);
        } 
        return done();
      });
  });
  */
  let filter2 = { name: 'test', breed: '2', location: 'Ljubljana', rating: '0', favourites:'true',experienced:'true' };
  it(`get oglasi 5`, (done) => {
    supertestRequest(app)
    .get('/api/oglas/getOglasi')
    .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
    .query(filter2)
    .expect(200)
    .end(function (err, res) {
      if (err) {
        console.error(err);
        return done(err);
      } 
      return done();
    });
});

/*let filter3 = { '0': 'test', '1': '12', '2': '7', '3': 'Ljubljana', '4': '0', '6':'true' };
it(`get oglasi 5`, (done) => {
  supertestRequest(app)
  .get('/api/oglas/getOglasi')
  .set("Authorization", `Bearer ${userWalkerWithMaxAd.token}`)
  .query(filter3)
  .expect(400)
  .end(function (err, res) {
    if (err) {
      console.error(err);
      return done(err);
    } 
    return done();
  });
  
});
  */  
  });