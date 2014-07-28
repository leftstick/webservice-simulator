var fs = require('fs');
var path = require('path');

var utils = {
    isNumeric: function(val) {
        return !isNaN(val);
    },
    toNumber: function(val) {
        return +val;
    },
    loadRouters: function(routerDir) {

        var routerFiles = fs.readdirSync(routerDir);
        var validRouterFiles = routerFiles.filter(function(value, index) {
            return value.indexOf('.json') === (value.length - 5);
        });

        return validRouterFiles.map(function(value, index) {
            return require(path.join(routerDir, value.substring(0, value.indexOf('.json'))));
        });
    }
};

module.exports = utils;