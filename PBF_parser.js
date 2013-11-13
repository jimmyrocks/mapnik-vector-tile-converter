var zlib = require('zlib');
var fs = require('fs');
var protobuf = require('protobufjs');

var proto = protobuf.protoFromFile("vector_tile.proto");
var MapnikVector = proto.build("mapnik.vector");

function parse(file) {
    data = fs.readFileSync(file);
    tile_content = MapnikVector.tile.decode(data).layers;
    return tile_content;
}

module.exports.parse = parse;
