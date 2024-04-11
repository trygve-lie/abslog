'use strict';

/**
 * NOTES:
 * - Node.js has console.trace but it is for printing out stack traces which
 *   we don't want so we log to console.log for trace instead.
 * - Node.js API seems to say it has a .debug(), despite its not public so
 *   we log to console.log for debug instead.
 */

const consoleLogger = {
    // @ts-ignore
    fatal: console.fatal ? console.fatal : console.log,
    error: console.error ? console.error : console.log,
    warn: console.warn ? console.warn : console.log,
    info: console.info ? console.info : console.log,
    debug: console.log,
    trace: console.log,
};

function validateMethod(method) {
    return method && {}.toString.call(method) === '[object Function]';
}

function validateLogger(logger) {
    if (!logger) {
        return false;
    }

    const methods = ['info', 'error', 'debug', 'fatal', 'warn', 'trace'];
    for (let i = 0; i < methods.length; i += 1) {
        if (!validateMethod(logger[methods[i]])) {
            throw new TypeError(
                `Provided logger is not API compliant. Missing "${methods[i]}" method.`,
            );
        }
    }

    return true;
}

module.exports.consoleLogger = consoleLogger;
module.exports.validateMethod = validateMethod;
module.exports.validateLogger = validateLogger;
