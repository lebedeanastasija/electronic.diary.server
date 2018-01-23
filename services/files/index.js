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
            cb(null, `${Date.now().toString()}-${file.originalname}`)
        }
    })
});

function saveAvatar(avatarData) {
    console.log(avatarData);
    if(!(avatarData && avatarData.originalname && avatarData.key && avatarData.location)) {
        return Promise.reject({status: 400, message: "Invalid avatar data!"});
    }
    return new Promise((resolve, reject) => {
    Avatar.create({
        originalName: avatarData.originalname,
        name: avatarData.key,
        url: avatarData.location
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

function download(file, res) {
    const fileName = file.originalName;
    res.attachment(fileName);

    const options = {
        Bucket: s3Bucket,
        Key: file.name
    };

    const fileObject = s3.getObject(options).createReadStream();
    fileObject.pipe(res);
}

module.exports = {
    upload,
    saveAvatar,
    getAvatar
};

