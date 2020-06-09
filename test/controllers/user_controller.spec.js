const { userFactory, login } = require('../factories');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.use(chaiHttp);

describe('UserController', function(){
  let baseUrl = '/api/v1/users';
  let token;

  beforeEach(async function(){
    user = await userFactory();
    token = await login(user);
  });

  describe('Create User', function(){

    let body = {
      name: 'Caio Ferreira',
      email: 'caio.ferreira@gmail.com',
      password: '1234'
    }

    it('should create a user', function(done){
      chai.request(app)
          .post(baseUrl)
          .set('Authorization', token)
          .send(body)
          .end(function(err, res){
            res.should.have.status(201);
            res.body.should.have.property('id');
            res.body.should.have.property('name').eql('Caio Ferreira');
            res.body.should.have.property('email').eql('caio.ferreira@gmail.com');
            done();
          });
    });
  });

  describe('List All', function(){

    beforeEach(async function(){
      await userFactory();
      await userFactory();
      await userFactory();
    });

    it('should return all users', function(done){
      chai.request(app)
          .get(baseUrl)
          .set('Authorization', token)
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(4);
            done();
          });
    });

    it('should return 401', function(done){
      chai.request(app)
          .get(baseUrl)
          .end(function(err, res){
            res.should.have.status(401);
            done();
          });
    });
  });

  describe('Show User', function(){

    let user;
    beforeEach(async function(){
      user = await userFactory()
    });

    it('should show user by id', function(done){
      chai.request(app)
          .get(`${baseUrl}/${user.id}`)
          .set('Authorization', token)
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('id').eql(user.id);
            res.body.should.have.property('name').eql(user.name);
            res.body.should.have.property('email').eql(user.email);
            done();
          });
    });

    it('should return user not found', function(done){
      chai.request(app)
          .get(`${baseUrl}/123`)
          .set('Authorization', token)
          .end(function(err, res){
            res.should.have.status(404);
            done();
          });
    });

  });

  describe('Delete User', function(){

    let user;

    beforeEach(async function(){
      user = await userFactory();
    });

    it('should delete user', function(done){
      chai.request(app)
          .delete(`${baseUrl}/${user.id}`)
          .set('Authorization', token)
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
    });
  });

  describe('Update User', function(){

    let user;

    beforeEach(async function(){
      user = await userFactory();
    });

    it('should update name and email', function(done){
      chai.request(app)
          .put(`${baseUrl}/${user.id}`)
          .set('Authorization', token)
          .send({name: 'Caio Ferreira', email: 'caio@gmail.com'})
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('id').eql(user.id);
            res.body.should.have.property('name').eql('Caio Ferreira');
            res.body.should.have.property('email').eql('caio@gmail.com');
            done();
          });
    })
  });

});