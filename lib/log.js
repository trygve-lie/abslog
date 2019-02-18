'use strict';

const NoopLog = require('nooplog');
const utils = require('./utils');

module.exports = function abslog(logger) {
    if (logger && logger instanceof global.console.Console) {
        return Object.create(utils.consoleLogger);
    }
    return utils.validateLogger(logger) ? logger : new NoopLog();
};
