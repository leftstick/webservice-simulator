#!/usr/bin/env node

'use strict';

var path = require('path');
var Sim = require('../index');

new Sim({
    protocol: 'http',
    routerDir: path.resolve('.', 'routers')
}).start();