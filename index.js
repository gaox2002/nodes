const Koa = require('koa');
const json = require('koa-json');
const pino = require('pino');
const jwt = require('koa-jwt');
const mongoose = require('mongoose');
const convert = require('koa-convert');
const static = require('koa-static');

const router = require('./routes');
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const koaBody = require("koa-body");
const {JWT_SECRET} = require('./config/config');
const app = new Koa();

app.use(static('static/'));

app.use(convert(jwt({
  secret: JWT_SECRET,
  key: 'jwtUser',
}).unless({
  path: [/auth\/token/, /user\/signUp/, /static/]
})));

mongoose.connect('mongodb://localhost:27017/gode', {
  useNewUrlParser: true,
  user: 'xgao',
  pass: 's0m3passw0Rd'
}) 
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err));

app.use(json());

app.use(koaBody({
  multipart: true,
  formidable: {
    maxFieldsSize: 5 * 1024 * 1024,
  },
}));

app.use(router.routes(), router.allowedMethods());

app.listen(3000, () => {
  logger.info('Server started at 3000...')
});