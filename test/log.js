'use strict';

const utils = require('../lib/utils');
const log = require('../lib/log');
const tap = require('tap');

function noop() {}

tap.test('log() - no logger set - should return noop logger', (t) => {
    const l = log();
    t.true(utils.validateMethod(l.fatal));
    t.true(utils.validateMethod(l.error));
    t.true(utils.validateMethod(l.warn));
    t.true(utils.validateMethod(l.info));
    t.true(utils.validateMethod(l.debug));
    t.true(utils.validateMethod(l.trace));
    t.end();
});

tap.test('log() - set compatible logger - should return set logger', (t) => {
    const logger = {
        fatal: noop,
        error: noop,
        warn: noop,
        info: noop,
        debug: noop,
        trace: noop
    };

    const l = log(logger);
    t.equals(l.fatal, logger.fatal);
    t.equals(l.error, logger.error);
    t.equals(l.warn, logger.warn);
    t.equals(l.info, logger.info);
    t.equals(l.debug, logger.debug);
    t.equals(l.trace, logger.trace);
    t.end();
});

tap.test('log() - console set - should return console', (t) => {
    const l = log(console);
    t.equals(l.error, console.error);
    t.equals(l.warn, console.warn);
    t.equals(l.info, console.info);
    t.end();
});

tap.test('log() -  set non compatible logger - should throw', (t) => {
    const logger = {
        error: noop,
        warn: noop,
        info: noop,
        debug: noop,
        trace: noop
    };

    t.throws(() => {
        log(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "fatal" method.'));

    t.end();
});
