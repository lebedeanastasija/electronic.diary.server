const express = require('express');
const router = express.Router();

const teachersService = require('../../services/teachers');

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

module.exports = router;