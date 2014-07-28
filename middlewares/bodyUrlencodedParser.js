var express = require('express');

//Returns middleware that only parses urlencoded bodies
var urlencodedParser = function() {
    var bodyParser = require('body-parser');
    return bodyParser.urlencoded({
        extended: false
    });
};

module.exports = urlencodedParser;