const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const s3 = new aws.S3();

const storageS3 = multerS3({ 
    s3, 
    bucket: process.env.S3_BUCKET, 
    acl: 'public-read', 
    key: function(req, file, cb) {
        cb(null, `${Math.floor(Math.random() * 1000)}_${Date.now()}_${file.originalname}`);
    }, 
});

const uploadImageMulter = multer({
    storage: storageS3,
    limits: { fileSize: 1000 * 1000 * 10 },
}).single('file');

module.exports = uploadImageMulter;