var zlib = require('zlib');
var fs = require('fs');
var protobuf = require('protobufjs');

var proto = protobuf.protoFromFile("./../proto/vector_tile.proto");
var MapnikVector = proto.build("mapnik.vector");

parse = function parse(file) {
    data = fs.readFileSync(file);
    tileContent = MapnikVector.tile.decode(data).layers;
    return tileContent;
}

module.exports.parse = parse;
