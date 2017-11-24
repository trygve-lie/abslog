'use strict';

const utils = require('../lib/utils');
const tap = require('tap');

function noop() {}

/**
 * utils.noopLogger
 */

tap.test('utils.noopLogger - Object - should have "fatal", "error", "warn", "info", "debug" and "trace" methods', (t) => {
    t.true(utils.validateMethod(utils.noopLogger.fatal));
    t.true(utils.validateMethod(utils.noopLogger.error));
    t.true(utils.validateMethod(utils.noopLogger.warn));
    t.true(utils.validateMethod(utils.noopLogger.info));
    t.true(utils.validateMethod(utils.noopLogger.debug));
    t.true(utils.validateMethod(utils.noopLogger.trace));
    t.end();
});

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

tap.test('utils.consoleLogger.fatal() - should equal to console.log()', (t) => {
    t.equals(utils.consoleLogger.fatal, console.log);
    t.end();
});

tap.test('utils.consoleLogger.error() - should equal to console.error()', (t) => {
    t.equals(utils.consoleLogger.error, console.error);
    t.end();
});

tap.test('utils.consoleLogger.warn() - should equal to console.warn()', (t) => {
    t.equals(utils.consoleLogger.warn, console.warn);
    t.end();
});

tap.test('utils.consoleLogger.info() - should equal to console.info()', (t) => {
    t.equals(utils.consoleLogger.info, console.info);
    t.end();
});

tap.test('utils.consoleLogger.debug() - should equal to console.debug()', (t) => {
    t.equals(utils.consoleLogger.debug, console.debug);
    t.end();
});

tap.test('utils.consoleLogger.trace() - should equal to console.trace()', (t) => {
    t.equals(utils.consoleLogger.trace, console.trace);
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
    t.true(utils.validateLogger(Object.create(utils.noopLogger)));
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
