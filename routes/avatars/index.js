const express = require('express');
const router = express.Router();
const _ = require('lodash');

const fileService = require('../../services/files');
const pupilService = require('../../services/pupils');

router.post('/pupil/:id', (req, res, next) => {
    const DATA = req.body.data;
    const PUPIL_ID = req.params.id;
    const S3_NAME = `avatar-${Date.now().toString()}.jpg`;

    if(!PUPIL_ID) {
        console.error('Invalid pupil!');
        res.status(400);
        return res.json({data: "Invalid pupil!"});
    }

    fileService.uploadBase64Image(DATA, S3_NAME);
    return fileService.saveAvatar({key: S3_NAME})
    .then(data => {
        return pupilService.update({id: PUPIL_ID}, {avatarId: data.id})
        .then(data => {
            res.status(200);
            res.json({data})
        })
    })
    .catch(err => {
        res.status(err.status);
        res.json({ data: err.message })
    })
});


module.exports = router;