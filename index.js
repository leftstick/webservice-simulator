var fs = require('fs');
var express = require('express');
var _ = require('lodash');

var logger = require('./libs/Logger');
var utils = require('./libs/Utils');
var parser = require('./libs/RouterParser');



var defaults = {
    port: 3000,
    routerDir: './routers',
    protocol: undefined
};

var validate = function(opts) {
    if (!utils.isNumeric(opts.port)) {
        throw new Error('port must be valid number');
    }
    this.port = utils.toNumber(opts.port);

    if (opts.protocol && this.supportProtocols.indexOf(opts.protocol) < 0) {
        throw new Error('You\'ve set a invalid protocol. Only http is accepted');
    }

    if (opts.protocol) {
        this.protocols = [opts.protocol];
    } else {
        this.protocols = this.supportProtocols;
    }

    if (!fs.existsSync(opts.routerDir)) {
        throw new Error('routerDir must exists');
    }

    this.routerDir = opts.routerDir;

};


var Simulator = function(options) {
    this.supportProtocols = ['http'];
    var opts = _.defaults(options || {}, defaults);
    validate.bind(this)(opts);
};

Simulator.prototype.initApp = function() {
    this.app = express();
    this.servers = [];
};

Simulator.prototype.registerInternalMiddlewares = function() {
    var _this = this;
    var mwsJson = require('./middlewares/middlewares');
    //register all the internal middlewares
    mwsJson.forEach(function(value) {
        var mw = require('./middlewares/' + value);
        _this.app.use(mw());
    });
};

Simulator.prototype.loadRouters = function() {
    var routers = utils.loadRouters(this.routerDir);
    var _this = this;
    routers.forEach(function(router) {
        _this.app.use(parser(router));
    });
};

Simulator.prototype.start = function() {
    var _this = this;

    this.initApp();
    this.registerInternalMiddlewares();
    this.loadRouters();

    this.protocols.forEach(function(protocol) {
        var protocolMod = require(protocol);
        _this.servers.push(protocolMod.createServer(_this.app).listen(_this.port, function() {
            logger.success(protocol + ' server Listening on port ' + _this.port);
        }));
    });

};

module.exports = Simulator;