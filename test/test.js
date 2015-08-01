
var Sim = require('../');

var request = require('request');
var WebSocket = require('ws');

var describe = require('mocha').describe;
var it = require('mocha').it;
var should = require('should');

describe('basic test', function() {
    'use strict';

    var port = 9864;

    before(function() {
        var path = require('path');
        new Sim({
            port: port,
            routerDir: path.resolve(__dirname, '..', 'example', 'routers')
        }).start();
    });

    it('test simple get', function(done) {
        request({url: 'http://127.0.0.1:' + port + '/hello'}, function(err, response, raw) {
            var data = JSON.parse(raw);
            should(data.title).eql('hello', 'title should be hello, but actually is ' + data.title);
            done();
        });
    });

    it('test simple websocket', function(done) {
        var ws = new WebSocket('ws://127.0.0.1:' + port + '/askfordata');
        ws.onmessage = function(event) {
            var data = JSON.parse(event.data);
            should(data.isDirty).eql(true, 'isDirty should be true, but actually is ' + data.isDirty);
            ws.close();
            done();
        };
    });

});
