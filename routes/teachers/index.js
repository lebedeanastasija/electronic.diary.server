const express = require('express');
const router = express.Router();
const _ = require('lodash');

const teachersService = require('../../services/teachers');
const fileService = require('../../services/files');

router.get('/', (req, res) => {
  return teachersService.getAll()
  .then(data => {
    res.status(200);
    res.json({
      data: data
    });
  })
  .catch(err => {
    res.status(err.status);
    res.json({
      data: err.message
    })
  });
});

router.get('/uid/:uid', (req, res, next) => {
  let uid = req.params.uid || null;
  if(!uid) {
    res.status(400);
    return res.json({
        data: "Invalid uid"
    });
  }

  teachersService.getByUID(uid)
    .then(data => {
      res.status(200);
      res.json({
          data: data
      });
    })
    .catch(err => {
      res.status(err.status);
      res.json({
          data: err.message
      })
    });
});

router.route('/:id/avatar/upload')
  .post(fileService.upload.array("files"), (req, res, next) => {
        const TEACHER_ID = req.params.id;
        if(!TEACHER_ID) {
            console.error('Invalid teacher!');
            res.status(400);
            return res.json({data: "Invalid teacher!"});
        }
        const files = _.get(req, 'files', []);
        console.log('Files objects from s3 multer: ', files);
        return fileService.saveAvatar(files[0])
            .then(data => {
                return teachersService.update({id: TEACHER_ID}, {avatarId: data.id})
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

router.get('/avatar/:id', (req, res, next) => {
  let id = req.params.id;
  return fileService.getAvatar(id, res);
});

module.exports = router;