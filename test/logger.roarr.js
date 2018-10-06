'use strict';

const roarr = require('roarr').default;
const tap = require('tap');
const log = require('../lib/log');

tap.test('roarr() - set roarr as logger - should return roarr', (t) => {
    const logger = log(roarr);
    t.equals(logger, roarr);
    t.end();
});
