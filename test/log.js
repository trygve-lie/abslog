'use strict';

const tap = require('tap');
const utils = require('../lib/utils');
const log = require('../lib/log');

function noop() {}

tap.test('log() - no logger set - should return noop logger', (t) => {
    const l = log();
    t.ok(utils.validateMethod(l.fatal));
    t.ok(utils.validateMethod(l.error));
    t.ok(utils.validateMethod(l.warn));
    t.ok(utils.validateMethod(l.info));
    t.ok(utils.validateMethod(l.debug));
    t.ok(utils.validateMethod(l.trace));
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
    t.equal(l.fatal, logger.fatal);
    t.equal(l.error, logger.error);
    t.equal(l.warn, logger.warn);
    t.equal(l.info, logger.info);
    t.equal(l.debug, logger.debug);
    t.equal(l.trace, logger.trace);
    t.end();
});

tap.test('log() - console set - should return console', (t) => {
    const l = log(console);
    t.equal(l.error, console.error);
    t.equal(l.warn, console.warn);
    t.equal(l.info, console.info);
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
