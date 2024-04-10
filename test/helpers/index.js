'use strict';

const stream = require('stream');

module.exports.testStream = (onChunk) => new stream.Writable({
        objectMode: false,
        write(chunk, encoding, callback) {
            if (onChunk) {
                onChunk(chunk);
            }
            callback();
        }
    });
