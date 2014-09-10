var jsonParser = function() {
    //config json parser
    'use strict';
    var body = require('body-parser');
    this.app.use(body.json());
};

module.exports = jsonParser;