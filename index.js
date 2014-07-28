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
        throw new Error('You\'ve set a invalid protocol. Only http or https is accepted');
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
    this.supportProtocols = ['http', 'https'];
    var opts = _.defaults(options || {}, defaults);
    validate.bind(this)(opts);
    this.app = express();
};

Simulator.prototype.registerInternalMiddlewares = function() {
    var _this = this;
    var mwsJson = require('./middlewares/middlewares');
    //register all the internal middlewares
    mwsJson.forEach(function(value, index) {
        var mw = require('./middlewares/' + value);
        _this.app.use(mw());
    });
};

Simulator.prototype.configRouters = function() {
    var _this = this;
    var jsons = utils.loadRouters(this.routerDir);
    jsons.forEach(function(json) {
        _this.app.use(parser(json));
    });
};

Simulator.prototype.start = function() {
    var _this = this;

    this.registerInternalMiddlewares();
    this.configRouters();

    this.protocols.forEach(function(protocol, index) {
        var protocolMod = require(protocol);
        protocolMod.createServer(_this.app).listen(_this.port, function() {
            console.log('%s server Listening on port %d', protocol, _this.port);
        });
    });

};

module.exports = Simulator;