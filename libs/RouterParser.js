var express = require('express');

var RouterParser = function(routerJson) {
    var router = express.Router();

    router[routerJson.method](routerJson.when, function(req, res, next) {
        res.send(routerJson.responseData);
    });

    return router;
};

module.exports = RouterParser;