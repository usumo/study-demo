const codeRouter = require('./code');
const apiRouter = require('./api');
const routes = (app) => {
  app.use('/code', codeRouter);
  app.use('/api', apiRouter);
};
module.exports = routes;
