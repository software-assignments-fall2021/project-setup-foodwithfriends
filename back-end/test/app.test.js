const { assert } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");

chai.should();
chai.use(chaiHttp);

let invite;

describe('Invite Code', () => {

  // POST Room Creation
  describe("POST /room", () => {
    it("It should store group details in the DB and return a shareable invite code", (done) => {
      const groupDetails = {name: "test", location:"new york", latitude:"40.7128", longitude: "74.0060", price:"$", capacity: 2};
      chai.request(server)
        .post("/room")
        .send(groupDetails)
        .end((err, res) => {
          invite = res.body;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('roomId');
          server.close();
          done();
        });

    })
  });

  // GET Invite Code Validation
  describe("GET /room", () => {
    it("It should reject the user if the invite code is invalid", (done) => {
      const inviteCode = {inviteCode: "12345"};
      chai.request(server)
        .get("/room")
        .query(inviteCode)
        .end((err,res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('valid').eq(false);
          res.body.should.have.property('msg').eq("Invalid Invite Code");
          done();
        })
    })

    it("It should succeed if the invite code is found in the DB", (done) => {
      chai.request(server)
        .get("/room")
        .query({inviteCode: invite.roomId})
        .end((err,res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('valid').eq(true);
          res.body.should.have.property('msg').eq(null);
          done();
        })
    })
  });
})

describe('Create new User', () => {
  // POST User Creation
  describe("POST  /user", () => {
    it("It should create and store a new user in the DB", (done) => {
      const user = {userName : "testUser", groupID: invite.roomId};
      chai.request(server)
        .post("/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(true);
          done();
        })
    })
  })
});

describe('Fetch Restaurant', () => {

  // GET Restaurants
  describe('GET /restaurants', () => {

    // it("It should store group details in the DB first", (done) => {
    //   const groupDetails = {name: "test", location:"new york", latitude:"40.7128", longitude: "74.0060", price:"$", capacity: 2};
    //   chai.request(server)
    //     .post("/room")
    //     .send(groupDetails)
    //     .end((err, res) => {
    //       console.log('body: ', res.body);
    //       invite = res.body;
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('roomId');
    //       // server.close();
    //       done();
    //     });
    // })

    it("It should succeed if the invite code is found in the DB", (done) => {
      chai.request(server)
        .get("/room")
        .query({inviteCode: invite.roomId})
        .end((err,res) => {

          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('valid').eq(true);
          res.body.should.have.property('msg').eq(null);
          done();
        })
    })


    it('It should fetch restaurants filtered by winning cuisine', (done) => {
      chai.request(server)
        .get('/restaurants')
        .query({
          groupId: invite.roomId
        })
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(true);
          res.body.should.have.property('data').be.an('array');
          // res.body.should.have.property('valid')
          done();
        })
    })
  })

  describe('GET /restaurants/:restaurantId', (req, res) => {
    const restaurantId = '4076262074000177';

    it('It should fetch one restaurant', (done) => {
      chai.request(server)
        .get(`/restaurants/${restaurantId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('restaurant').be.an('object');
          res.body.should.have.property('success').eq(true);
          done();
        });
    });

    it('It should have a name property in restaurant', (done) => {
      chai.request(server)
        .get(`/restaurants/${restaurantId}`)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('success').eq(true);
          res.body.restaurant.should.have.property('restaurant_name').be.an('string');
          done();
        });
    });

    // it('It should have a name property in restaurant', (done) => {
    //   chai.request(server)
    //     .get(`/restaurants/${restaurantId}`)
    //     .end((err, res) => {
    //       res.should.have.status(200);
    //       res.body.should.be.a('object');
    //       res.body.should.have.property('success').eq(true);
    //       res.body.restaurant.should.have.property('restaurant_name').be.an('string');
    //       done();
    //     });
    // });
  })
})
