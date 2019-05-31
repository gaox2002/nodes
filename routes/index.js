const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const basename = path.basename(module.filename);
const router = Router();

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') >= 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach((file) => {
    let rt = require(path.join(__dirname, file));
    router.use(rt.routes(), rt.allowedMethods());
  });


module.exports = router;