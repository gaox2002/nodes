const Router = require('koa-router');
const upload = require('../services/uploadService');

const uploadRouter = Router({
  prefix: '/api'
});

uploadRouter.post('/upload', upload.Upload);

module.exports = uploadRouter;