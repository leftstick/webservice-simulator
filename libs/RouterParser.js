
var _ = require('lodash');

var httpDefaults = {
    type: 'http',
    method: 'get'
};

var wsDefaults = {
    interval: 5000
};

var validate = function(obj, key, path) {
    'use strict';
    if (!_.has(obj, key)) {
        throw new Error('miss [' + key + '] in ' + path);
    }
};

var RouterParser = function(module) {
    'use strict';
    var _this = this;
    var routerJson = module.mod;
    validate(routerJson, 'when', module.path);

    if (!_.has(routerJson, 'type') || routerJson.type === 'http') {
        _.defaults(routerJson, httpDefaults);
        validate(routerJson, 'method', module.path);
    } else if (routerJson.type === 'ws') {
        _.defaults(routerJson, wsDefaults);
    } else {
        throw new Error('type [' + routerJson.type + '] is not available');
    }

    if (routerJson.type === 'http') {
        this.app[routerJson.method](routerJson.when, function(req, res) {
            res.send(routerJson.responseData);
        });
    } else {
        var WebSocketServer = require('ws').Server;
        var wss = new WebSocketServer({
            path: routerJson.when,
            server: _this.server
        });

        wss.on('connection', function(ws) {
            var id = setInterval(function() {
                ws.send(JSON.stringify(routerJson.responseData));
            }, routerJson.interval);

            ws.on('close', function() {
                clearInterval(id);
            });
        });

    }
};

module.exports = RouterParser;