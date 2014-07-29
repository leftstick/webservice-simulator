var fs = require('fs');
var path = require('path');

var Utils = {
    isNumeric: function(val) {
        return !isNaN(val);
    },
    toNumber: function(val) {
        return +val;
    },
    loadRouters: function(routerDir) {

        var routerFiles = fs.readdirSync(routerDir);
        var validRouterFiles = routerFiles.filter(function(value) {
            return value.indexOf('.json') === (value.length - 5);
        });

        return validRouterFiles.map(function(value) {
            var module = {
                path: path.join(routerDir, value),
                mod: require(path.join(routerDir, value.substring(0, value.indexOf('.json'))))
            };

            if (module.mod.responseData) {
                delete module.mod.responseFile;
            }

            if (module.mod.responseFile && typeof module.mod.responseFile !== 'string') {
                throw new Error('You\'ve set invalid responseFile, it must be string');
            }

            if (module.mod.responseFile) {
                module.mod.responseData = require(path.join(routerDir, '../', 'data', module.mod.responseFile));
            }

            return module;
        });
    }
};

module.exports = Utils;