'use strict';

// const log = require('../lib/log');
const tap = require('tap');

// https://www.npmjs.com/package/loglevel
// https://www.npmjs.com/package/pino
// https://www.npmjs.com/package/log4js
// https://www.npmjs.com/package/bunyan
// https://www.npmjs.com/package/winston
// https://www.npmjs.com/package/debug

tap.test('abst-log() - foo - should bar', (t) => {
    t.equal('foo', 'foo');
    t.end();
});
