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

module.exports = router;