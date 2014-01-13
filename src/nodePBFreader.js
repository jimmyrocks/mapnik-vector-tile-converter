var zlib = require('zlib'),
protobuf = require('protobufjs'),
proto = protobuf.protoFromFile('./../proto/vector_tile.proto'),
mapnikVector = proto.build('mapnik.vector'),
// If the pbf is compressed, this will deflate it
deflate = function (buffer, callback) {
    zlib.unzip(buffer, function(err, newBuffer) {
      if (!err) {
        callback(newBuffer);
      }
    });
  },
// This is the routine used to read the file against the proto file
parse = function (data, callback) {
  // Check if the file is compressed, and if so, decompress it
  if (!data) {
    callback(null);
  } else if (data[0].toString(16) === '78' && (data[1].toString(16) === '01' || data[1].toString(16) === '9c' || data[1].toString(16) === 'da')) {
    // http://stackoverflow.com/questions/9050260/what-does-a-zlib-header-look-like
    // zlib magic headers
    //
    // 78 01 - No Compression/low
    // 78 9C - Default Compression
    // 78 DA - Best Compression 
    deflate(data, function(defalted) {
      parse(defalted, callback);
    });
  } else {
    callback(mapnikVector.tile.decode(data).layers);
  }
};


module.exports.parse = parse;

/*
var fs = require('fs'),
fileName = '../example/tiles/14_4748_6227.vector.pbf';
fs.readFile(fileName, function(err, data){
  if (!err) {
    parse(data, function(parsedData){
      console.log(JSON.stringify(parsedData,null,2));
    });
  } else {
    console.log('err', err);
  }
});
*/
