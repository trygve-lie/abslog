'use strict';

const Transport = require('winston-transport');
const winston = require('winston');
const log = require('../lib/log');
const tap = require('tap');

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

tap.test('winston() - set winston as logger - should return winston', (t) => {
    const winstonLogger = winston.createLogger({
        levels: winstonCustomLevels.levels,
    });

    const logger = log(winstonLogger);
    t.equals(logger, winstonLogger);
    t.end();
});

tap.test('winston() - log message - winston should log message', (t) => {
    class testStream extends Transport {
        log(info, callback) {
            callback();
            t.equals(info.message, 'hello');
            t.end();
        }
    }

    const winstonLogger = winston.createLogger({
        levels: winstonCustomLevels.levels,
        transports: [
            new testStream()
        ]
    });

    const logger = log(winstonLogger);
    logger.info('hello');
});
