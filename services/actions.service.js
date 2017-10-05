var cache = require('memory-cache');

var self = module.exports;
const VALUES_KEY = 'actionValues';

self.saveActionValue = function (param) {
    if (param.parameters.quality_measure) {
        addValue(param.action, param.parameters.quality_measure);
    }
};

self.getModulesScore = function () {
    var modules = {};
    cache.keys().forEach(function (t) {
        var points = cache.get(t);
        var total = 0;
        points.forEach(function (v) {
            total += parseInt(v);
        });
        modules[t] = total / points.length;
    });
    return modules;
};

function addValue(action, value) {
    var values = cache.get(action);
    values = values && values.length >= 0 ? values : [];
    values.push(value);
    cache.put(action, values);
}

const modules = {};
