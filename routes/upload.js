const Router = require('koa-router');
const upload = require('../services/uploadService');
const koaBody = require("koa-body");

const uploadRouter = Router({
  prefix: '/api'
});

// uploadRouter.use(koaBody({
//   multipart: true,
// }));
uploadRouter.post('/upload', upload.Upload);

module.exports = uploadRouter;