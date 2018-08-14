'use strict';

const bunyan = require('bunyan');
const tap = require('tap');
const helpers = require('./helpers');
const log = require('../lib/log');

tap.test('pino() - set bunyan as logger - should return bunyan', (t) => {
    const bunyanLogger = bunyan.createLogger({
        name: 'test',
        stream: helpers.nullStream(),
        level: 'trace'
    });

    const logger = log(bunyanLogger);

    t.equals(logger, bunyanLogger);
    t.end();
});

tap.test('bunyan() - log message - bunyan should log message', (t) => {
    const out = helpers.testStream((chunk) => {
        const msg = JSON.parse(chunk.toString());
        t.equals(msg.msg, 'hello');
        t.end();
    });

    const bunyanLogger = bunyan.createLogger({
        name: 'test',
        stream: out,
        level: 'trace'
    });

    const logger = log(bunyanLogger);
    logger.info('hello');
});
