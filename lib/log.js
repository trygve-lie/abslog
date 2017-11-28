'use strict';

const utils = require('./utils');

module.exports = function abslog(logger) {
    if (logger && logger instanceof console.Console) {
        return Object.create(utils.consoleLogger);
    }
    return utils.validateLogger(logger) ? logger : Object.create(utils.noopLogger);
};
