var express = require('express');
var _ = require('lodash');

var validate = function(obj, key, path) {
    if (!_.has(obj, key)) {
        throw new Error('miss [' + key + '] in ' + path);
    }
};

var RouterParser = function(module) {
    var routerJson = module.mod;
    validate(routerJson, 'when', module.path);
    validate(routerJson, 'method', module.path);

    var router = express.Router();

    router[routerJson.method](routerJson.when, function(req, res) {
        res.send(routerJson.responseData);
    });

    return router;
};

module.exports = RouterParser;