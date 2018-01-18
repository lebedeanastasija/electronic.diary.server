const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3Config  = require("../../config/aws.s3.config").s3Config;
const s3Region = require("../../config/aws.s3.config").s3Region;
const s3Bucket = require("../../config/aws.s3.config").s3Bucket;

const Avatar = require("../../database/models/avatars");

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
            cb(null, Date.now().toString())
        }
    })
});

function saveAvatar(avatarData) {
    if(!(avatarData && avatarData.originalname && avatarData.location)) {
        return Promise.reject({status: 400, message: "Invalid avatar data!"});
    }

    return new Promise((resolve, reject) => {
    Avatar.create({
        fileName: avatarData.originalname,
        url: avatarData.location
    })
    .then(avatarResult => {
        const result = Object.assign({}, avatarResult.dataValues);

        resolve(result);
    })
    .catch(err => reject({status: 500, message: 'Error occured during saving pupil avatar'}));
    })
}

module.exports = {
    upload,
    saveAvatar
};

