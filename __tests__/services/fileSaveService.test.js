jest.mock('../../models/photo');
const subject = require('../../services/fileSaveService');


describe('test store uploaded to file system', () => {

  test('save photo', async () => {
    const user = {username: 'user1', nickName: 'nick1'};
    subject.storeMeta(user, 'uploadedfile');
    
  });

});