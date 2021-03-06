const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Config  = require("../../config/aws.s3.config").s3Config;
const s3Region = require("../../config/aws.s3.config").s3Region;
const s3Bucket = require("../../config/aws.s3.config").s3Bucket;

const Avatar = require('../../models/index').avatar;

AWS.config.update(s3Config);
AWS.config.region = s3Region;

//Amazon s3 setup
const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: s3Bucket,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, `avatar-${Date.now().toString()}.jpg`)
    }
  })
});

function uploadBase64Image(base64String, name) {

  let buf = new Buffer(base64String.replace(/^data:image\/\w+;base64,/, ""),'base64');

  let data = {
    Bucket: s3Bucket,
    Key: name,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };
  s3.putObject(data, function(err, data){
    if (err) {
      console.error(err);
      console.error('Error uploading image to aws s3: ', data);
    } else {
      console.log('Image was uploaded successfully to aws s3:', data);
    }
  });
}

function saveAvatar(avatarData) {
  console.log(avatarData);
  if(!(avatarData && avatarData.key)) {
    return Promise.reject({status: 400, message: "Invalid avatar data!"});
  }
  return new Promise((resolve, reject) => {
  Avatar.create({
    name: avatarData.key
  })
  .then(avatarResult => {
    const result = Object.assign({}, avatarResult.dataValues);
    resolve(result);
  })
  .catch(err => reject({status: 500, message: 'Error occured during saving pupil avatar'}));
  })
}

function getAvatar(id, res) {
  return Avatar.findOne({ where: {id}})
  .then(avatar => {
    return download(avatar, res);
  })
}

function getDownloadUrl(file) {
  const options = {
    Bucket: s3Bucket,
    Key: file.name,
    Expires: 3600
  };

  const url = s3.getSignedUrl('getObject', options);
  return url;
}

function download(file, res) {
  res.attachment(file.name);

  const options = {
    Bucket: s3Bucket,
    Key: file.name
  };

  const fileObject = s3.getObject(options).createReadStream();
  fileObject.pipe(res);
}

module.exports = {
  upload,
  download,
  saveAvatar,
  getAvatar,
  getDownloadUrl,
  uploadBase64Image
};

