'use strict';

const SyncLog = require('synclog');
const tap = require('tap');
const log = require('../lib/log');

tap.test('synclog() - set synclog as logger - should return synclog', (t) => {
    const synclog = new SyncLog('debug');
    const logger = log(synclog);
    t.equal(logger, synclog);
    t.end();
});
