const Router = require('koa-router');
const user = require('../services/userService');

const userRouter = Router({
  prefix: '/user'
});

userRouter.post('/signUp', user.SignUp);
userRouter.get('/:username', user.GetUser);

module.exports = userRouter;