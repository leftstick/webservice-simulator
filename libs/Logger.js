var chalk = require('chalk');

var convertInput = function(parameters) {
    var args = Array.prototype.slice.call(parameters);
    args = args.map(function(value, index) {

        if (typeof value === 'object') {
            try {
                return JSON.stringify(value);
            } catch (e) {
                return value.toString();
            }
        }
        return value;
    });
    return args;
};


var logger = {
    success: function() {
        var args = convertInput(arguments);
        console.log(chalk.bold.green.apply(undefined, args));
    },
    info: function() {
        var args = convertInput(arguments);
        console.log(chalk.white.apply(undefined, args));
    },
    warn: function() {
        var args = convertInput(arguments);
        console.log(chalk.bold.yellow.apply(undefined, args));
    },
    error: function() {
        var args = convertInput(arguments);
        console.log(chalk.bold.red.apply(undefined, args));
    }
};

module.exports = logger;