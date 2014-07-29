#!/usr/bin/env node

'use strict';

var path = require('path');
var Sim = require('../index');

new Sim({
    routerDir: path.resolve(__dirname, 'routers')
}).start();