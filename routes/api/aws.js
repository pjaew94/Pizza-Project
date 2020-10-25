const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const config = require('../../config/config');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid')



aws.config.update(config.awsConfig)

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'jwppizza',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, req.s3Key)
        }
    })
})

const singleFileUpload = upload.single('image');

function uploadToS3 (req, res) {
    req.s3Key = uuidv4();
    let downloadUrl = `https://s3-${config.awsConfig.region}.amazonaws.com/jwppizza/${req.s3Key}`
    return new Promise((resolve, reject) => {
        return singleFileUpload(req, res, err => {
            if (err) return reject(err);
            return resolve(downloadUrl) 
        })
    })
}

module.exports = {
    uploadImageToS3: (req, res) => {
        uploadToS3(req, res)
        .then(downloadUrl => {
            console.log(downloadUrl)
            return res.status(200).send({ downloadUrl })
        })
        .catch(e => { console.log(e)})
    }
}