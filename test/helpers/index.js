'use strict';

const stream = require('stream');

module.exports.testStream = (onChunk) => {
    return new stream.Writable({
        objectMode: false,
        write(chunk, encoding, callback) {
            if (onChunk) {
                onChunk(chunk);
            }
            callback();
        }
    });
};
