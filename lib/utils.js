'use strict';

const consoleLogger = {
    fatal: console.fatal ? console.fatal : console.log,
    error: console.error ? console.error : console.log,
    warn: console.warn ? console.warn : console.log,
    info: console.info ? console.info : console.log,
    debug: console.log, // node seems to say it has a .debug(), despite its not public :/
    trace: console.log, // node has console.trace but it is for printing out stack traces which we don't want
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

module.exports.consoleLogger = consoleLogger;
module.exports.validateMethod = validateMethod;
module.exports.validateLogger = validateLogger;
