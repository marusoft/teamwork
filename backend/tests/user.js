import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import { createUserDetails, wrongCreateUserDetails, invalidSigninDetails } from './mocks/user';

let adminToken;
const { should, expect } = chai;
should();

chai.use(chaiHttp);


const createUserUrl = '/api/v1/auth/create-user';
const loginUrl = '/api/v1/auth/signin';


describe('Users Test', () => {
  describe('Test create user endpoint', () => {
    it('should create an admin token on login', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send({
          email: 'alimi@teamwork.com',
          password: 'teamdevc19',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          adminToken = res.body.data.token;
          done();
        });
    });
    it('should return status code 201 and create new user1', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(createUserDetails[0])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Account successfully created');
          done();
        });
    });
    it('should return status code 201 and create new user2', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(createUserDetails[1])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Account successfully created');
          done();
        });
    });
    it('should return status code 201 and create new user3', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(createUserDetails[2])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Account successfully created');
          done();
        });
    });
    it('should return status code 400 for email undefined', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[0])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for invalid email', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[1])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for invalid email', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[2])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 409 for existing email', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[3])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.an('object');
          expect(res.body.error).to.equal('Conflict, Email already registered, proceed to sigin...');
          done();
        });
    });
    it('should return status code 400 for firstname undefined', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[4])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for invalid firstname', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[5])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for short firstname length', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[6])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for undefined lastname', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[7])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for invalid lastname', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[8])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for short lastname', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[9])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for undefined password', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[10])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for short password length', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[11])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for undefined gender', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[12])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for undefined jobrole', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[13])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for undefined department', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[14])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 400 for undefined address', (done) => {
      chai.request(app)
        .post(createUserUrl)
        .send(wrongCreateUserDetails[15])
        .set('authorization', `Bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('Test for Login endpoint', () => {
    it('should return status code 200 and login user with correct credentials', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(createUserDetails[0])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal('success');
          done();
        });
    });
    it('should return status code 200 and login user with correct credentials then return a success msg', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(createUserDetails[0])
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal('success');
          expect(res.body.data.message).to.equal('Welcome back your login was successful');
          done();
        });
    });
    it('should return status code 400 and empty email login details ', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(invalidSigninDetails[0])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 401 with msg user does not exist', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(invalidSigninDetails[1])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(401);
          expect(res.body.error).to.equal('User does not exist, Please contact an admin for account registration');
          done();
        });
    });
    it('should return status code 400 and empty password login details ', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(invalidSigninDetails[2])
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          done();
        });
    });
    it('should return status code 401 with msg user does not exist', (done) => {
      chai.request(app)
        .post(loginUrl)
        .send(invalidSigninDetails[3])
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          expect(res.body.status).to.equal(401);
          done();
        });
    });
  });
});
