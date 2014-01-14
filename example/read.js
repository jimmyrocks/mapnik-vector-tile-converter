var mvt = require('../src/nodePBFreader.js'),
director = require('../src/director.js'),
converter = require('../src/converter.js'),
tile = require('../src/geojsonTile.js'),
z = 14,
x = 4748,
y = 6227,
decoder = new director.Decoder(),
loadTile = function(data) {
  var convertedTile = tile.convertTile(data, {'z': z, 'x': x, 'y': y});
  console.log(JSON.stringify(convertedTile,null,2));
},
parsePbf = function(data) {
  data.forEach(function(layer) {
    // Loop through the layers
    var features = layer.features,
    //geometries = [],
    extent = layer.extent;

    // Loop through the individual features
    features.forEach(function(feature) {
      // Extract the geometries
      var relative = decoder.decode(feature.geometry);
      console.log(converter.Converter.tolatlon(z, x, y, relative, extent));
    });
  });
};

var fs = require('fs'),
fileName = './tiles/14_4748_6227.vector.pbf';
fs.readFile(fileName, function(err, contents) {
  var actionFunc = [parsePbf, loadTile];
  if (!err) {
    mvt.parse(contents, actionFunc[1]);
  } else {
    console.log('err', err);
  }
});
