const express = require('express');
const router = express.Router();

const adminService = require('../../services/administrators');

router.post('/login', (req, res, next) => {
  let {login, password} = req.body;
  if(!(login && password)) {
    res.status(400);
    return res.json({data: 'Invalid administrator!'});
  }

  return adminService.signIn(login, password)
  .then(data => {
    res.status(200);
    return res.json({data})
  })
  .catch(err => {
    res.status(err.status);
    return res.json({data: err.message});
  })
});

module.exports = router;