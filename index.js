'use strict';
var fs = require('fs');
var express = require('express');
var _ = require('lodash');

var logger = require('./libs/Logger');
var utils = require('./libs/Utils');
var parser = require('./libs/RouterParser');

var defaults = {
    port: 3000,
    routerDir: './routers'
};

var validate = function(opts) {
    if (!utils.isNumeric(opts.port)) {
        throw new Error('port must be valid number');
    }
    this.port = utils.toNumber(opts.port);

    if (!fs.existsSync(opts.routerDir)) {
        throw new Error('routerDir must exists');
    }

    this.routerDir = opts.routerDir;

};


var Simulator = function(options) {
    var opts = _.defaults(options || {}, defaults);
    validate.bind(this)(opts);
};

Simulator.prototype.initApp = function() {
    this.app = express();
    this.server = this.app.listen(this.port);
};

Simulator.prototype.registerInternalMiddlewares = function() {
    var _this = this;
    var mwsJson = require('./middlewares/middlewares');
    //register all the internal middlewares
    mwsJson.forEach(function(value) {
        var mw = require('./middlewares/' + value);
        mw.bind(_this)();
    });
};

Simulator.prototype.loadRouters = function() {
    var routers = utils.loadRouters(this.routerDir);
    var _this = this;
    routers.forEach(function(router) {
        parser.bind(_this)(router);
    });
};

Simulator.prototype.start = function() {
    var _this = this;
    this.initApp();
    this.registerInternalMiddlewares();
    this.loadRouters();

    logger.success('Sever launched at ' + _this.port);
};

module.exports = Simulator;