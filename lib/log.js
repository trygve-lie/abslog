'use strict';

const utils = require('./utils');
const { Console } = require('console');

module.exports = function abslog(logger) {
    if (logger && logger instanceof Console) {
        return Object.create(utils.consoleLogger);
    }
    return utils.validateLogger(logger) ? logger : Object.create(utils.noopLogger);
};
