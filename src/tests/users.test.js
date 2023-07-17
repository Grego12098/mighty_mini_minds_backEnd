import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  authenticateUser,
  getUserEntries
} from "../controllers/controllers.users.js";

import { users } from "../models/usersModel.js";
import chaiHttp from 'chai-http';
import { describe, it } from "mocha";
import chai from 'chai';
import app from "../app.js"

// describe("Test /users", ()=>{
//   it("gets all users",async ()=>{
//     const actual = await getUsers()
//     expect(actual).to.deep.include({"username": "ghonny"})
//   })

// })


// Configure chai
chai.use(chaiHttp);
chai.should();
describe("Users", () => {
    describe("GET", () => {
        // Test to get all users
        it("should get all users", (done) => {
             chai.request(app)
                 .get('/users')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
         });
        // Test to get a single user
        it("should get a single user", (done) => {
             const id = "6d7bf107-b7bf-4966-89b7-64b40ced9d10";
             chai.request(app)
                 .get(`/users/${id}`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
         
        // Test to see if wrong id sends correct error code
        it("If id is wrong, send error code", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/users/${id}`)
                 .end((err, res) => {
                     res.should.have.status(500);
                     done();
                  });
         });
    });
    describe("POST", () => {
            // Test to post new user
            it("should create a new user", (done) => {
                chai.request(app)
                    .post('/users')
                    .send({
                        name: "John Doe",
                        // must input unique username or will get error status 400
                        username: "johndoe",
                        password: "password123",
                        contact_email: "john.doe@example.com",
                        contact_name: "Jane Doe",
                        contact_relationship: "Friend",
                        avatar_url: "https://example.com/avatar.jpg"
                      })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                         done();
                    });
            });
            it("should ensure a new user has a unique username", (done) => {
                chai.request(app)
                    .post('/users')
                    .send({
                        name: "John Doe",
                        username: "johndoe",
                        password: "password123",
                        contact_email: "john.doe@example.com",
                        contact_name: "Jane Doe",
                        contact_relationship: "Friend",
                        avatar_url: "https://example.com/avatar.jpg"
                      })
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
            it("should send status 500 if body is empty", (done) => {
                chai.request(app)
                    .post('/users')
                    .end((err, res) => {
                        res.should.have.status(500);
                         done();
                    });
            });
    });
    describe("PATCH", () => {
      // Test to update user info
      it("should update user info", (done) => {
        const uuid="6011ee5d-d5ff-4126-9025-c073864de766"
          chai.request(app)
              .patch(`/users/${uuid}`)
              .send({
                  name: "Jimmy Sloe for sho",
                  username: "jimmysloe",
                  password: "123",
                  contact_email: "john.doe2@example.com",
                  contact_name: "Jane Doe",
                  contact_relationship: "Mrs",
                  avatar_url: "https://example.com/avatars.jpg"
                })
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                   done();
              });
      });
      
      it("If id is wrong, send error code", (done) => {
        const id = "6011ee5d-d5ff-4126-9025-c073864dd556";
        chai.request(app)
            .patch(`/users/${id}`)
            .send({name: "Jimmy Sloe"
            })
            .end((err, res) => {
                res.should.have.status(404);
                done();
             });
    });

      });
      // sending a status 200 for empty body and incorrect key, 
      // should we update our function to send a 500 in these cases?
      it("should send status 500 if id is the wrong format", (done) => {
          const id="5"
          chai.request(app)
              .patch(`/users/${id}`)
              .send({
                names: "Jimmy Sloe"
                })
              .end((err, res) => {
                    res.should.have.status(500);
                    done();
              });
      });
});
// ideally we would create a delete user test,
// delete the user we created in the post test,
// then both tests would pass every time