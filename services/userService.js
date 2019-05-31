const User = require('../models/user');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/config');

const SignUp = async (ctx, next) => {
  const body = ctx.request.body;
  console.log(`post payload ${JSON.stringify(ctx.request.body)}`);
  let errors = [];
  if (!body.username || !body.password) {
    errors.push({error: 'both username and password are required'});
  }
  let criteria = [{ username: body.username }];
  if (body.email) {
    criteria.push({email: body.email});
  }
  if (body.phone){
    criteria.push({phone: body.phone});
  }
  let user = await User.findOne({$or: criteria});
  if(user) {
    errors.push({error: 'Dup user info'})
  }

  if (errors.length){
    console.log(`have ${errors.length} errors`);
    ctx.throw(400, JSON.stringify(errors));
  }

  try {
    user = new User(body);
    user.password = await bcrypt.hashSync(user.password, SALT_ROUNDS);
    console.log(`saving user ${user.username}`);
    user.save();
    ctx.status = 202;
    ctx.body = {
      success: true,
      userId: user._id,
      username: user.username,
      nickName: user.nickName,
    }; 
  } catch(err){
    console.log(`error occurred ${err}`);
    ctx.throw(500, err);
  }

};

const GetUser = async (ctx, next) => {
  const username = ctx.params.username;
  console.log(`looking for user ${username}`);
  let user = await User.findOne({ username: username });
  if(!user) {
    ctx.throw(404, {error: 'user not found'});
  }
  let auth = ctx.state.jwtUser;
  if (auth.role !== 'ADMIN' && auth.username !== user.username) {
    ctx.throw(403, 'Permission denied');
  }

  ctx.body = Object.assign(user, {
    password: '<masked>',
  }); 
};

module.exports = {
  SignUp,
  GetUser,
};