var cache = require('memory-cache');

var self = module.exports;
const VALUES_KEY = 'actionValues';

self.saveActionValue = function (param) {
    if (param.parameters.quality_measure) {
        addValue(param.action, param.parameters.quality_measure);
    }
};

self.getTotalPoints = function () {
    var obj = {};
    cache.keys().forEach(function (t) { obj[t] = cache.get(t) });
    return obj;
};

function addValue(action, value) {
    var values = cache.get(action);
    values = values && values.length >= 0 ? values : [];
    values.push(value);
    cache.put(action, values);
}

