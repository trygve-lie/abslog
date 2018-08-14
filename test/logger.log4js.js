'use strict';

const recording = require('log4js/lib/appenders/recording');
const log4js = require('log4js');
const tap = require('tap');
const log = require('../lib/log');

tap.test('log4js() - set pino as logger - should return log4js', (t) => {
    const log4jsLogger = log4js.getLogger();
    const logger = log(log4jsLogger);
    t.equals(logger, log4jsLogger);
    t.end();
});

tap.test('log4js() - log message - log4js should log message', (t) => {
    log4js.configure({
        appenders: { vcr: { type: 'recording' } },
        categories: { default: { appenders: ['vcr'], level: 'info' } }
    });

    const log4jsLogger = log4js.getLogger();

    const logger = log(log4jsLogger);
    logger.info('hello');

    const events = recording.replay();

    t.equals(events[0].data[0], 'hello');
    t.end();
});
