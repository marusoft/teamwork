import chai from 'chai';
import chaiHttp from 'chai-http';
// import sinon from 'sinon';
import app from '../app';
// import pool from '../database/dbConnection';

import { validArticlesDetails, invalidArticlesDetails } from './mocks/article';


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


describe('Test for articles endpoints', () => {
  describe('Test for create article endpoint', () => {
    it('should return 201 and create article1', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(validArticlesDetails[0]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.message).to.equal('Article successfully posted');
    });

    it('should return 201 and create article2', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(validArticlesDetails[1]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.message).to.equal('Article successfully posted');
    });

    it('should return 201 and create article3', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(validArticlesDetails[2]);
      res.should.have.status(201);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal('success');
      expect(res.body.data.message).to.equal('Article successfully posted');
    });

    it('should return 400 and not post article for title undefined', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidArticlesDetails[0]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
    });

    it('should return 400 and not post article short title length ', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidArticlesDetails[1]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
    });

    it('should return 400 and not post article for article undefined', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidArticlesDetails[2]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
    });

    it('should return 400 and not post article for category undefined', async () => {
      const res = await chai.request(app)
        .post('/api/v1/articles')
        .set('authorization', `Bearer ${userToken}`)
        .send(invalidArticlesDetails[3]);
      res.should.have.status(400);
      res.body.should.be.an('object');
      expect(res.body.status).to.equal(400);
    });
  });
});


describe('PATCH article endpoint', () => {
  it('should allow Employees to edit their article post', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/articles/1')
      .set('authorization', `Bearer ${ownerToken}`)
      .send({
        title: 'Frog the typist',
        article: 'Lorem ipsum dolor sit amet,',
        category: 'Language'
      });
    res.should.have.status(200);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal('success');
    expect(res.body.data.message).to.equal('Article successfully updated.');
  });

  it('should not allow other than Employees to edit their article post', async () => {
    const res = await chai.request(app)
      .patch('/api/v1/articles/1')
      .set('authorization', `Bearer ${adminToken}`)
      .send({
        title: 'Frog the typist',
        article: 'Lorem ipsum dolor sit amet,',
        category: 'Language'
      });
    res.should.have.status(401);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal(401);
    expect(res.body.error).to.equal('You can not modify or delete this article.');
  });
});

describe('Test for DELETE article endpoint', () => {
  it('should allow Employees delete their article post', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/articles/1')
      .set('authorization', `Bearer ${ownerToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal(200);
    expect(res.body.message).to.equal('Article successfully deleted.');
  });

  it('should not allow Employees delete unavailable article post', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/articles/101001')
      .set('authorization', `Bearer ${ownerToken}`);
    res.should.have.status(404);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal(404);
    expect(res.body.error).to.equal('Article not found.');
  });

  it('should not allow other than Employees to delete article', async () => {
    const res = await chai.request(app)
      .delete('/api/v1/articles/3')
      .set('authorization', `Bearer ${adminToken}`);
    res.should.have.status(401);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal(401);
    expect(res.body.error).to.equal('You can not modify or delete this article.');
  });
});


describe('Test for articles comment', () => {
  it('should allow Employees comment on other colleagues article post', async () => {
    const res = await chai.request(app)
      .post('/api/v1/articles/3/comment')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        comment: 'This is a awesome article.'
      });
    res.should.have.status(201);
    res.body.should.be.an('object');
    expect(res.body.status).to.equal('success');
    expect(res.body.data.message).to.equal('Comment successfully created.');
  });

  it('should not allow Employees post empty comment on other colleagues article post', async () => {
    const res = await chai.request(app)
      .post('/api/v1/articles/3/comment')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        comment: ''
      });
    res.should.have.status(400);
    res.body.should.be.an('object');
  });
});

describe('Get Specific Article', () => {
  it('should allow employees view a specific article post.', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles/3')
      .set('authorization', `Bearer ${userToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
});

describe('Get Articles by Category', () => {
  it('should allow employees view articles post by category.', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles?category=Accounting')
      .set('authorization', `Bearer ${userToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
});

describe('Get all posted Articles', () => {
  it('should allow employees view all articles post .', async () => {
    const res = await chai.request(app)
      .get('/api/v1/articles')
      .set('authorization', `Bearer ${userToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
});

describe('Get all posted Articles or gifs', () => {
  it('should allow employees view all articles or gifs post .', async () => {
    const res = await chai.request(app)
      .get('/api/v1/feed')
      .set('authorization', `Bearer ${userToken}`);
    res.should.have.status(200);
    res.body.should.be.an('object');
  });
});
