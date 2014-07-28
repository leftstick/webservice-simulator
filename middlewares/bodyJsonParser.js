var express = require('express');

//Returns middleware that only parses json
var jsonParser = function() {
    var bodyParser = require('body-parser');
    return bodyParser.json();
};

module.exports = jsonParser;