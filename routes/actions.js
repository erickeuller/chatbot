var express = require('express');
var service = require('../services/actions.service');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    service.saveActionValue(req);
});

router.post('/', function (req, res, next) {
    console.log(req.body.result.fulfillment);
    var response;
    if (req.body.result.metadata.intentName === 'status_report') {
        response = buildReportText(service.getModulesScore());
    }
    else {
        service.saveActionValue(req.body.result);
        response = {
            speech: req.body.result.fulfillment.speech
        };
    }
    res.send(response);
});

router.get('/points', function (req, res, next) {
    res.send(service.getTotalPoints());
});

function buildReportText(modulesScore) {
    var belowAverage = [];
    Object.keys(modulesScore).forEach(function (k) {
        if (modulesScore[k] <= 3) {
            belowAverage.push(modulesTranslations[k]);
        }
    });
    var text = '';
    if (belowAverage.length > 0) {
        text = 'Precisamos melhorar nos seguintes modulos: ' + belowAverage.join(', ');
    }
    else {
        text = 'Tudo ótimo, todos as áreas parecem funcionar muito bem';
    }
    return {
        speech: text
    };
}

const modulesTranslations = {
    'requirement_management': 'Gestão de requisitos',
    'process_planning': 'Planejamento do projeto',
    'project_monitoring': 'Monitoramento e controle de projeto',
    'contract_management': 'Gestão de contrato com fornecedores',
    'analysis': 'Medição e análise',
    'process_quality': 'Garantia de qualidade de processo e produto',
    'configuration_management': 'Gestão de configuração',
    'requirement_development': 'Desenvolvimento de requisitos'
};

module.exports = router;
