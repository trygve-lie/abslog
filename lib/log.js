'use strict';

const NoopLog = require('nooplog');
const utils = require('./utils');

module.exports = function abslog(logger) {
    if (Object.is(logger, console)) {
        return Object.create(utils.consoleLogger);
    }
    return utils.validateLogger(logger) ? logger : new NoopLog();
};
