const express = require('express');
const router = express.Router();

const scheduleService = require('../../services/schedules');

router.get('/', (req, res, next) => {
  return scheduleService.getAll()
  .then(data => {
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

router.get('/current/teacher/:id', (req, res, next) => {
  let id = req.params.id;

  if(!id) {
    res.status(400);
    return res.json({data: 'Invalid teacher!'});
  }

  return scheduleService.getCurrentByTeacher(id)
  .then(data => {
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

router.get('/day/teacher/:id', (req, res, next) => {
  let id = req.params.id;

  if(!id) {
    res.status(400);
    return res.json({data: 'Invalid teacher!'});
  }

  return scheduleService.getDayByTeacher(id)
  .then(data => {
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

module.exports = router;