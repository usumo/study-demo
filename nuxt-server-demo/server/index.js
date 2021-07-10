const express = require('express');
const consola = require('consola');
const logger = require('morgan');
const {
  Nuxt,
  Builder
} = require('nuxt');
const app = express();
const router = require('./routes');
router(app);
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js');
config.dev = process.env.NODE_ENV !== 'production';

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host,
    port
  } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }
  app.use('/', (req, res, next) => {
    res.header('Cache-Control', `max-age=120`);
    next();
  });
  app.use('/filter', (req, res, next) => {
    res.header('Cache-Control', `max-age=60`);
    next();
  });

  // Give nuxt middleware to express
  app.use(nuxt.render);

  app.use(logger(app.get('env') === 'production' ? 'combined' : 'dev'));

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
