
var urlencodedParser = function() {
    'use strict';
    //config urlencodedParser
    var body = require('body-parser');
    this.app.use(body.urlencoded({
        extended: false
    }));
};

module.exports = urlencodedParser;