'use strict';

function noop() {}

const noopLogger = {
    fatal: noop,
    error: noop,
    warn: noop,
    info: noop,
    debug: noop,
    trace: noop
};

const consoleLogger = {
    fatal: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
    trace: console.trace
};

function validateMethod(method) {
    return (method && {}.toString.call(method) === '[object Function]');
}

function validateLogger(logger) {
    if (!logger) {
        return false;
    }

    const methods = ['info', 'error', 'debug', 'fatal', 'warn', 'trace'];
    for (let i = 0; i < methods.length; i += 1) {
        if (!validateMethod(logger[methods[i]])) {
            throw new TypeError(`Provided logger is not API compliant. Missing "${methods[i]}" method.`);
        }
    }

    return true;
}

module.exports.noopLogger = noopLogger;
module.exports.consoleLogger = consoleLogger;
module.exports.validateMethod = validateMethod;
module.exports.validateLogger = validateLogger;