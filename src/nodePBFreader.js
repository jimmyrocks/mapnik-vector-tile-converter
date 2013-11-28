var zlib = require('zlib');
var fs = require('fs');
var protobuf = require('protobufjs');
var director = require('./director.js');
var converter = require('./converter.js');
var tile = require('./tile.js');

var proto = protobuf.protoFromFile("./../proto/vector_tile.proto");
var MapnikVector = proto.build("mapnik.vector");

parse = function (file) {
    var data = fs.readFileSync(file);
    var tileContent = MapnikVector.tile.decode(data).layers;
    return tileContent;
}


module.exports.parse = parse;
