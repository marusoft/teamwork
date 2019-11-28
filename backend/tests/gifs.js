import chai from 'chai';
import chaiHttp from 'chai-http';
// import sinon from 'sinon';
import app from '../../app';
// import pool from '../database/dbConnection';

import { validGifsDetails, invalidGifsDetails } from './mocks/gifs';


const { should, expect } = chai;
should();

chai.use(chaiHttp);

let userToken;
let adminToken;
let ownerToken;


describe('Create Token For User', () => {
  it('should create token for user after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'moyosore@teamwork.com',
        password: 'teamdevc19',
      });
    expect(res).to.have.status(200);
    userToken = res.body.data.token;
  });

  it('should create token for admin after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'alimi@teamwork.com',
        password: 'teamdevc19',
      });
    expect(res).to.have.status(200);
    adminToken = res.body.data.token;
  });

  it('should create token for owner after successful login', async () => {
    const res = await chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'moyosore@teamwork.com',
        password: 'teamdevc19',
      });
    expect(res).to.have.status(200);
    ownerToken = res.body.data.token;
  });
});


describe('Test for gifs Endpoints', () => {
  describe('Test for create gif endpoint', () => {
    it('should return 201 and create gifs1', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(validGifsDetails[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.message).to.equal('GIF image successfully posted');
    });

    it('should return 201 and create gifs2', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(validGifsDetails[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.message).to.equal('GIF image successfully posted');
    });

    it('should return 201 and create gifs3', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(validGifsDetails[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.message).to.equal('GIF image successfully posted');
    });

    it('should return 400 and not post gifs for title undefined', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidGifsDetails[0]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.message).to.equal('please specify the title of the gif.');
    });

    it('should return 406 and not post gifs for unacceptable characters', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidGifsDetails[1]);
      res.should.have.status(406);
      res.body.should.be.an('object');
      expect(res.body.message).to.equal('Only Alphabets input characters are acceptable for title.');
    });

    it('should return 400 and not post gifs for img not specify', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidGifsDetails[2]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.message).to.equal('Please select an gif image to upload.');
    });

    it('should return 406 and not post gifs for img format', async () => {
      const res = await chai.request(app)
        .post('/api/v1/gifs')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidGifsDetails[3]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.message).to.equal('This image is not a valid image.');
    });
  });
});


describe('Test for DELETE endpoint', () => {
  it('should allow Employees delete their gifs post', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/gifs/1')
      .set('authorization', `Bearer ${ownerToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal('success');
    expect(res.body.message).to.equal('gif post successfully deleted');
  });

  it('should not allow Employees delete unavailable gifs post', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/gifs/101001')
      .set('authorization', `Bearer ${ownerToken}`);
    res.should.have.status(404);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal(404);
    expect(res.body.error).to.equal('Gif not found.');
  });

  it('should not allow other than Employees to delete', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/gifs/3')
      .set('authorization', `Bearer ${adminToken}`);
    res.should.have.status(401);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal(401);
    expect(res.body.error).to.equal('You can not access or delete this gif.');
  });
});

describe('Test for gifs comment', () => {
  it('should allow Employees comment on other colleagues gifs post', async () => {
    const res = await chai.request(app)
      .post('/api/v1/gifs/3/comment')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        comment: 'This is a awesome gif.'
      });
    res.should.have.status(201);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal('success');
    expect(res.body.data.message).to.equal('Comment successfully created.');
  });

  it('should not allow Employees post empty comment on other colleagues gifs post', async () => {
    const res = await chai.request(app)
      .post('/api/v1/gifs/3/comment')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        comment: ''
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
});


describe('Get Specific Gif', () => {
  it('should allow employees view a specific gif post.', async () => {
    const res = await chai.request(app)
      .get('/api/v1/gifs/3')
      .set('authorization', `Bearer ${userToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal('success');
  });
});
