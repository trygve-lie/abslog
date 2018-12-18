'use strict';

const Logdna = require('logdna');
const tap = require('tap');
const log = require('../lib/log');

tap.test('logdna() - set logdna as logger - should return logdna', (t) => {
    const logdnaLogger = Logdna.createLogger('some_api_key_goes_here', {});
    const logger = log(logdnaLogger);
    t.equals(logger, logdnaLogger);
    t.end();
});
