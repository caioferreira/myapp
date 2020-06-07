const { userFactory } = require('../factories');
const chai = require('chai');
const should = chai.should();
const assert = chai.assert;
const UserService = require('../../app/services/user_service');

describe('UserService', () => {

  it('should find one user', async function(){
    const user = await userFactory();
    const result = await UserService.findById(user.id);
    assert.equal(result.id, user.id);
  });

  it('should list all users', async function(){
    await userFactory();
    await userFactory();
    await userFactory();

    const users = await UserService.findAll();

    assert(users.length, 3);
  })

  it('should create user', async function(){
    const user = await UserService.create({name: 'Caio', email: 'teste@teste.com.br', password: '1234'});

    should.exist(user.id)
  })
});
