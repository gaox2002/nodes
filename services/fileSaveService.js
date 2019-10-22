const fs = require('fs');
const Photo = require('../models/photo');

const saveFile = async (readerStream, fileName) => {
  const upStream = fs.createWriteStream(__dirname + `/../static/uploads/${fileName}`);
  await readerStream.pipe(upStream);

  return true;
}

const storeMeta = async (user, filename) => {
  const photo = new Photo({
    authName: user.username,
    authNickName: user.nickName,
    imageName: filename,
  });

  await photo.save();

  return photo;
}

module.exports = {
  saveFile,
  storeMeta,
}