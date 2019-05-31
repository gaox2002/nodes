const aws = require("aws-sdk");
const fs = require("fs");

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      region: "nyc3",
      // You'll need your service's access keys here
      accessKeyId: "",
      secretAccessKey: "",
    });

    const s3 = new aws.S3({
      apiVersion: "2006-03-01",
      // If you want to specify a different endpoint, such as using DigitalOcean spaces
      // endpoint: new aws.Endpoint("nyc3.digitaloceanspaces.com"),
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: "public-read",
        // You'll input your bucket name here
        Bucket: "bucket-name",
        Body: stream,
        Key: fileName,
        ContentType: fileType,
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

module.exports = { uploadFile };