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
    fatal: console.fatal ? console.fatal : console.log,
    error: console.error ? console.error : console.log,
    warn: console.warn ? console.warn : console.log,
    info: console.info ? console.info : console.log,
    debug: console.log, // node seems to say it has a .debug(), despite its not public :/
    trace: console.trace ? console.trace : console.error,
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
