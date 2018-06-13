const express = require('express');
const router = express.Router();

const marksService = require('../../services/marks');

router.get('/', (req, res, next) => {
    marksService.getAll()
        .then(data => {
            res.json({
                data: data
            });
        })
        .catch(err => {
            res.status(err.status);
            res.json({
                data: err.message
            });
        });
});

router.get('/pupil/:pupilId', (req, res, next) => {
    let pupilId = req.params.pupilId || null;
    if(!id) {
        res.status(400);
        return res.json({
            data: "Invalid marks"
        });
    }
    marksService.getByPupilId(pupilId)
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
            });
        });
});

router.post('/', (req, res, next) => {
    let {typeId, valueId, pupilId, scheduleId, subjectId} = req.body;

    console.log(req.body);
    if(!(typeId && valueId && pupilId && (scheduleId || subjectId))) {
        res.status(400);
        return res.json({
            data: "Invalid marks data"
        });
    }

    let date = new Date();
    console.log("date", date);

    return marksService.create(typeId, valueId, pupilId, date, scheduleId, subjectId)
        .then(data => {
            console.log("[Create pupil] - result:\n", data);
            res.status(200);
            return res.json({
                data: data
            });
        })
        .catch(err => {
            console.log("[Create marks] - error:\n", err);
            res.status(err.status);
            res.json({
                data: err.message
            });
        });
});
module.exports = router;