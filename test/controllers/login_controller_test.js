const { userFactory } = require('../factories');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app.js');

chai.use(chaiHttp);

describe('LoginController', function(){

  let user;
  beforeEach(async function(){
    user = await userFactory({email: 'joao@teste.com.br', password: '1234'});
  });

  describe('Login Sucess', function(){
    it('should return user token',function(done){
      chai.request(app)
          .post('/api/v1/login')
          .send({email: user.email, password: '1234'})
          .end(function(err, res){
            res.should.have.status(200);
            res.body.should.have.property('token')
            done();
          })
    })
  });

  describe('Login Error', function(){
    it('should return status 401', function(done){
      chai.request(app)
          .post('/api/v1/login')
          .send({email: user.email, password: 'senhaerrada'})
          .end(function(err, res){
            res.should.have.status(401);
            done();
          });
    });
  });

})

