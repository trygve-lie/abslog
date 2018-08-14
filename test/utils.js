'use strict';

const NoopLog = require('nooplog');
const tap = require('tap');
const utils = require('../lib/utils');

function noop() {}

/**
 * utils.consoleLogger
 */

tap.test('utils.consoleLogger - Object - should have "fatal", "error", "warn", "info", "debug" and "trace" methods', (t) => {
    t.true(utils.validateMethod(utils.consoleLogger.fatal));
    t.true(utils.validateMethod(utils.consoleLogger.error));
    t.true(utils.validateMethod(utils.consoleLogger.warn));
    t.true(utils.validateMethod(utils.consoleLogger.info));
    t.true(utils.validateMethod(utils.consoleLogger.debug));
    t.true(utils.validateMethod(utils.consoleLogger.trace));
    t.end();
});

/**
 * utils.validateMethod()
 */

tap.test('utils.validateMethod() - no value for "method" attribute - should return "false"', (t) => {
    t.false(utils.validateMethod());
    t.end();
});

tap.test('utils.validateMethod() - value for "method" attribute is a function - should return "true"', (t) => {
    t.true(utils.validateMethod(() => {}));
    t.true(utils.validateMethod(() => {}));
    t.end();
});

tap.test('utils.validateMethod() - value for "method" attribute is not a function - should return "false"', (t) => {
    t.false(utils.validateMethod('foo'));
    t.false(utils.validateMethod(123));
    t.false(utils.validateMethod({ foo: 'bar' }));
    t.false(utils.validateMethod(true));
    t.false(utils.validateMethod(false));
    t.false(utils.validateMethod(null));
    t.false(utils.validateMethod(undefined));
    t.false(utils.validateMethod(Error()));
    t.end();
});

/**
 * utils.validateLogger()
 */

tap.test('utils.validateLogger() - logger is compliant - should return "true"', (t) => {
    t.true(utils.validateLogger(new NoopLog()));
    t.true(utils.validateLogger(Object.create(utils.consoleLogger)));
    t.end();
});

tap.test('utils.validateLogger() - no logger provided - should return "false"', (t) => {
    t.false(utils.validateLogger());
    t.end();
});

tap.test('utils.validateLogger() - logger does not have "trace" method - should throw', (t) => {
    const logger = {
        fatal: noop,
        error: noop,
        warn: noop,
        info: noop,
        debug: noop
    };

    t.throws(() => {
        utils.validateLogger(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "trace" method.'));

    t.end();
});

tap.test('utils.validateLogger() - logger does not have "debug" method - should throw', (t) => {
    const logger = {
        fatal: noop,
        error: noop,
        warn: noop,
        info: noop,
        trace: noop
    };

    t.throws(() => {
        utils.validateLogger(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "debug" method.'));

    t.end();
});

tap.test('utils.validateLogger() - logger does not have "info" method - should throw', (t) => {
    const logger = {
        fatal: noop,
        error: noop,
        warn: noop,
        debug: noop,
        trace: noop
    };

    t.throws(() => {
        utils.validateLogger(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "info" method.'));

    t.end();
});

tap.test('utils.validateLogger() - logger does not have "warn" method - should throw', (t) => {
    const logger = {
        fatal: noop,
        error: noop,
        info: noop,
        debug: noop,
        trace: noop
    };

    t.throws(() => {
        utils.validateLogger(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "warn" method.'));

    t.end();
});

tap.test('utils.validateLogger() - logger does not have "error" method - should throw', (t) => {
    const logger = {
        fatal: noop,
        warn: noop,
        info: noop,
        debug: noop,
        trace: noop
    };

    t.throws(() => {
        utils.validateLogger(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "error" method.'));

    t.end();
});

tap.test('utils.validateLogger() - logger does not have "fatal" method - should throw', (t) => {
    const logger = {
        error: noop,
        warn: noop,
        info: noop,
        debug: noop,
        trace: noop
    };

    t.throws(() => {
        utils.validateLogger(logger);
    }, new TypeError('Provided logger is not API compliant. Missing "fatal" method.'));

    t.end();
});
