'use strict';

const stream = require('stream');
const fs = require('fs');

module.exports.testStream = (onChunk) => {
    return new stream.Writable({
        objectMode: false,
        write(chunk, encoding, callback) {
            onChunk(chunk);
            callback();
        }
    });
};

module.exports.nullStream = () => {
    return fs.createWriteStream('/dev/null');
};
