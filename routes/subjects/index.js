const express = require('express');
const router = express.Router();

const subjectsService = require('../../services/subjects');

router.get('/', (req, res, next) => {
  subjectsService.getAll()
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

router.delete('/:id', (req, res, next) => {
  let id = req.params.id;

  if(!id) {
    res.status(400);
    return res.json({data: "Invalid subject!"});
  }

  return subjectsService.remove(id)
  .then(data => {
    res.status(200);
    res.json({ data });
  })
  .catch(err => {
    res.status(err.status);
    res.json({ data: err.message });
  });
});

module.exports = router;