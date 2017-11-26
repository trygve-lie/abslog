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

The consumer of your module:

```js
const AwesomeModule = require('AwesomeModule');
const pino = require('pino)();

const awesome = new AwesomeModule(pino);
awesome.doStuff()  // will now log on info
```



## console.log


## Known compatible loggers:

These loggers are known to be compatible and tested:

### pino

### bunyan

### log4js

### winston
