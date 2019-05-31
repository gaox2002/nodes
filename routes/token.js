const Router = require('koa-router');
const token = require('../services/tokenService');

const tokenRouter = Router({
  prefix: '/auth'
});

tokenRouter.post('/token', token.Token);

module.exports = tokenRouter;