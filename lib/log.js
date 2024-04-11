'use strict';

/**
 * @typedef {(...args: any) => void} LogFunction
 */

/**
 * @typedef {object} AbstractLogger
 * @property {LogFunction} trace
 * @property {LogFunction} debug
 * @property {LogFunction} info
 * @property {LogFunction} warn
 * @property {LogFunction} error
 * @property {LogFunction} fatal
 */

const NoopLog = require('nooplog');
const utils = require('./utils');

/**
 * Returns an abstract logger which enables adding logging to modules without adding a dependency to a full log library.
 * @param {any} logger
 * @returns {AbstractLogger}
 */
module.exports = function abslog(logger) {
    if (Object.is(logger, console)) {
        return Object.create(utils.consoleLogger);
    }
    return utils.validateLogger(logger) ? logger : new NoopLog();
};
