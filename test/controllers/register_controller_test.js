const { userFactory } = require('../factories');
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.use(chaiHttp);

describe('RegisterController', function(){
  let baseUrl = '/api/v1/register';

  describe('Create user', function(){

    it('should register user', function(done){
      chai.request(app)
          .post(`${baseUrl}`)
          .send({
            name: 'Caio',
            email: 'caio@gmail.com',
            password: '1234',
            confirmPassword: '1234'
          })
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('id');
            res.body.should.have.property('name').eql('Caio');
            res.body.should.have.property('email').eql('caio@gmail.com');
            done();
          });
    });

  });

  describe('E-mail already exist', function(){

    beforeEach(function(){
      userFactory({email: 'caio@gmail.com'});
    });

    it('should return status 412 when e-mail already exist', function(done){
      chai.request(app)
          .post(`${baseUrl}`)
          .send({
            name: 'Caio',
            email: 'caio@gmail.com',
            password: '1234',
            confirmPassword: '1234'
          })
          .end(function(err, res){
            res.should.have.status(422);
            done();
          });
    });



  });

  describe('Confirm password diferent', function(){

    it('should return status 412 when confirmaPassword was diferent', function(done){
      chai.request(app)
          .post(`${baseUrl}`)
          .send({
            name: 'Caio',
            email: 'caio@gmail.com',
            password: '1234',
            confirmPassword: '12345'
          })
          .end(function(err, res){
            res.should.have.status(422);
            done();
          });
    });

  });
});
