const User = require('../models/user');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/config');

const Token = async (ctx, next) => {
  const body = ctx.request.body;
  console.log(`post payload ${JSON.stringify(ctx.request.body)}`);
  if (!body.username || !body.password) {
    let errInfo = {error: 'both username and password are required'};
    ctx.throw(400, JSON.stringify(errInfo));
  }
  let user = await User.findOne({ username: body.username });
  if(!user || !bcrypt.compareSync(body.password, user.password)) {
    let errInfo = {error: 'Authentication failed'};
    ctx.throw(401, JSON.stringify(errInfo));
  }

  const token = jsonwebtoken.sign({
      userId: user._id,
      username: user.username,
      nickName: user.nickName,
      role: user.role || 'USER',
    }, JWT_SECRET);

  ctx.body = {
    token: token,
  }; 

};

module.exports = {
  Token,
};