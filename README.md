# abslog

[![Dependencies](https://img.shields.io/david/trygve-lie/abslog.svg?style=flat-square)](https://david-dm.org/trygve-lie/abslog)[![Build Status](http://img.shields.io/travis/trygve-lie/abslog/master.svg?style=flat-square)](https://travis-ci.org/trygve-lie/abslog)

An abstract logger - Enables adding logging to modules without adding a dependency to a full log library. This way, the consumer of your modules can plug in their own log library of choice.

The API of this abstract logger conforms to the standard [Log4j interface](https://logging.apache.org/log4j/1.2/apidocs/org/apache/log4j/Level.html) levels.


## Installation

```bash
$ npm install abslog
```


## Usage

In your module(s):

```js
const abslog = require('abslog');

class AwesomeModule {
    constructor(logger) {
        this.log = abslog(logger);
    }

    doStuff() {
        this.log.info('Did stuff');
    }
}
```

The consumer of your module, using pino as logger:

```js
const AwesomeModule = require('AwesomeModule');
const pino = require('pino')();

const awesome = new AwesomeModule(pino);
awesome.doStuff()  // will now log on info
```


## Interface

`abslog` takes one argument. It takes an logger expected to be log4j interface
compatible.

If no logger is provided an object with log methods will be returned. Each of
these method are just `noop` methods adding minimal footprint and performance impact
on your module.

If a logger is provided, the logger will be returned. This leaves `abslog` adding
zero runtime footprint and performance impact on your module.

If an logger is provided but the logger is not compatible with the log4j interface,
an exception will be thrown.


## Methods

The log4j compatilbe methods are:

 * fatal
 * error
 * warn
 * info
 * debug
 * trace

Example:

```js
const abslog = require('abslog');

const log = abslog();
log.fatal('critital message');
log.error(new Error(), 'error message');
log.warn('warn message');
log.info('info message');
log.debug('debug message');
log.trace('trace message');
```


## console.log

`Console` is not log4j compatible, but `abslog` does support `Console` for logging.
Its worth noticing that its not recommended to use `Console` for logging in production
code, but it can be handy to just plug in `Console` to get log output in development.

Example:

```js
const abslog = require('abslog');

const log = abslog(console);
log.info('some message');
log.fatal('critical message');
```


## Known compatible loggers:

These loggers are known to be compatible and tested:

### pino

[pino](https://www.npmjs.com/package/pino) is found to be compatible.

```js
const abslog = require('abslog');
const pino = require('pino')();

const log = abslog(pino);
log.info('hello');
```

### bunyan

[bunyan](https://www.npmjs.com/package/bunyan) is found to be compatible.

```js
const abslog = require('abslog');
const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: 'test',
    stream: process.stdout,
    level: 'trace'
});

const log = abslog(logger);
log.info('hello');
```

### log4js

[log4js](https://www.npmjs.com/package/log4js) is found to be compatible.

```js
const abslog = require('abslog');
const log4js = require('log4js');

const logger = log4js.getLogger();

const log = abslog(logger);
log.info('hello');
```

### winston

[winston](https://www.npmjs.com/package/winston) is found to NOT be compatible
out of the box. Though, winston can be customised with alternative log levels
and through such a configuration be compatible.

```js
const abslog = require('abslog');
const winston = require('winston');

const winstonCustomLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5,
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue',
        trace: 'cyan',
    }
};

const logger = winston.createLogger({
    levels: winstonCustomLevels.levels,
});

const log = abslog(logger);
log.info('hello');
```


## License

The MIT License (MIT)

Copyright (c) 2017 - Trygve Lie - post@trygve-lie.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
