var staticFiles = function () {
    //config static files
    'use strict';
    var serveStatic = require('serve-static');
    var serve = serveStatic(this.routerDir);
    this.app.use(serve);
};

module.exports = staticFiles;