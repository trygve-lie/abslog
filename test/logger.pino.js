'use strict';

const helpers = require('./helpers');
const pino = require('pino');
const log = require('../lib/log');
const tap = require('tap');

tap.test('pino() - set pino as logger - should return pino', (t) => {
    const pinoLogger = pino(helpers.nullStream());
    const logger = log(pinoLogger);
    t.equals(logger, pinoLogger);
    t.end();
});

tap.test('pino() - log message - bunyan should log message', (t) => {
    const out = helpers.testStream((chunk) => {
        const msg = JSON.parse(chunk.toString());
        t.equals(msg.msg, 'hello');
        t.end();
    });

    const pinoLogger = pino(out);

    const logger = log(pinoLogger);
    logger.info('hello');
});
