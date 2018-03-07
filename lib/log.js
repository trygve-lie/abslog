'use strict';

const { Console } = require('console');
const NoopLog = require('nooplog');
const utils = require('./utils');

module.exports = function abslog(logger) {
    if (logger && logger instanceof Console) {
        return Object.create(utils.consoleLogger);
    }
    return utils.validateLogger(logger) ? logger : new NoopLog();
};
