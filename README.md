webservice-simulator
====================

[![NPM version][npm-image]][npm-url]
![][david-url]
![][travis-url]

Webservice-simulator is simple use module, by which you can build up your backend webservice quickly without any help from the backend team/developer.


## Story ##

As a front-end developer, have you ever had the experience of asking back-end developer to provide a worked web-service even a mock, just for not blocking your task. But they ignore your request?

That's why i wrote the `webservice-simulator`. 

## Installation ##

```shell
npm install webservice-simulator --save-dev
```

## Usage ##

```JavaScript
var path = require('path');
var Simulator = require('webservice-simulator');

new Simulator({
    port: 9900,
    routerDir: path.resolve(__dirname, 'routers')
}).start();
```

By doing as above, you've launched an http server:

- Listening on `9900`
- Serve route configurations from `path.resolve(__dirname, 'routers')`


## API ##

### Simulator(options) ###

#### options
Type: `Object`

Options to pass to `new Simulator`

#### options.port
Type: `Number`

Default: `3000`

The port of the server which you want to listen. 

#### options.routerDir
Type: `String`

Default: `./routers`

The route configurations directory from where `webservice-simulator` read config files and configure the server. 

[How to write route configuration file](./docs/how_to_write_route_config.md)

## Play with example ##

### Clone `webservice-simulator` ###

```shell
git clone git@github.com:leftstick/webservice-simulator.git
```

### install dependencies ###

```shell
cd webservice-simulator
npm install
```
> you may want to use a more efficient by [sero-cli](https://github.com/leftstick/Sero-cli)

### launch example ###

```shell
example/example.js
```

### play ###

Now, you have the simulator setup. which provides following apis:

- `/hello`, for `get` http method
- `/askfordata`, for `websocket` interreaction
- `/2.jpg`, to access the static file

Make your client send those request. And see the response.


## LICENSE ##

[MIT License](https://raw.githubusercontent.com/leftstick/webservice-simulator/master/LICENSE)



[npm-url]: https://npmjs.org/package/webservice-simulator
[npm-image]: https://badge.fury.io/js/webservice-simulator.png
[david-url]:https://david-dm.org/leftstick/webservice-simulator.png
[travis-url]:https://api.travis-ci.org/leftstick/webservice-simulator.svg?branch=master