var express = require('express');
var service = require('../services/actions.service');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    service.saveActionValue(req);
});

router.post('/', function (req, res, next) {
    console.log(req.body);
    return {
        speech: 'CHATUBA DE MESQUITA'
    }
    service.saveActionValue(req.body.result);
});

router.get('/points', function (req, res, next) {
    res.send(service.getTotalPoints());
});

module.exports = router;
