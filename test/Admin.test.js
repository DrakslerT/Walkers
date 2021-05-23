const { app, supertestRequest } = require("../src/server/test.exports.js");

describe("Admin test -> Admin access", () => {
  let admin = {
    email: "admin@gmail.com",
    password: "admin",
  };
  it("Login as Admin", (done) => {
    supertestRequest(app)
      .post("/api/login")
      .send({ email: admin.email, password: admin.password })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        token = res.body.accessToken;
        admin = { ...admin, token };
        return done();
      });
  });
  it("Fetch users as Admin", (done) => {
    supertestRequest(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${admin.token}`)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it("Deactivate user 5", (done) => {
    supertestRequest(app)
      .post("/api/admin/users/deactivate")
      .set("Authorization", `Bearer ${admin.token}`)
      .send({ profileId: 5 })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
});

describe("Admin test -> no Admin access", () => {
  let admin = {
    email: "martin.strekelj123@gmail.com",
    password: "12345",
  };
  it("Login as Admin", (done) => {
    supertestRequest(app)
      .post("/api/login")
      .send({ email: admin.email, password: admin.password })
      .expect(200)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        token = res.body.accessToken;
        admin = { ...admin, token };
        return done();
      });
  });
  it("Fetch users as Admin", (done) => {
    supertestRequest(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${admin.token}`)
      .expect(401)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });

  it("Deactivate user 5", (done) => {
    supertestRequest(app)
      .post("/api/admin/users/deactivate")
      .set("Authorization", `Bearer ${admin.token}`)
      .send({ profileId: 5 })
      .expect(401)
      .end(function (err, res) {
        if (err) {
          console.error(res.body);
          return done(err);
        }
        return done();
      });
  });
});
