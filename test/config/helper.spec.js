const db = require('../../app/models')

beforeEach(async function(){
  await db.sequelize.sync({ force: true })
});