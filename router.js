const healthCheck = require('./app/routes/health_check');
const usersRouter = require('./app/routes/users');
const loginRouter = require('./app/routes/login');
const registerRouter = require('./app/routes/register');

module.exports = (app) => {
  app.use('/health-check', healthCheck);
  app.use('/api/v1/users', usersRouter);
  app.use('/api/v1/login', loginRouter);
  app.use('/api/v1/register', registerRouter);
};
