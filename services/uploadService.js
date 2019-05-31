const crypto = require("crypto");
const Photo = require('../models/photo');
const fs = require('fs');
const { saveFile, storeMeta } = require('./fileSaveService');

const Upload = async (ctx, next) => {
  console.log("Upload file");

  const uuid = crypto.randomBytes(16).toString("hex");
  const label = 'async upload and store file';
  const user = ctx.state.jwtUser;
  console.log(user);

  try {
    const file = ctx.request.files.uf;
    console.log('file is ');
    console.log(file.path);
    const readerStream = fs.createReadStream(file.path);
    const ext = file.name.split('.').pop();
    const fileName = `${uuid}.${ext}`;
  
    console.time(label);
    let [saved, photo] = await Promise.all([
          saveFile(readerStream, fileName), 
          storeMeta(user, fileName)
        ]);
    console.timeEnd(label);
    ctx.body = {
      photo,
    }
  } catch (e) {
    console.error('error is', e);
    console.timeEnd(label);
    ctx.throw (500, "Upload file failed");
  }
  
}

module.exports = {
  Upload,
}