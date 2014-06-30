var geojsonize = require('./togeojson.js'),
convertTile = function (tile, tilePoint, filter) {
  var parsedTile = {};
  tile = tile || [];
  tile.forEach(function(layer) {
    if (!filter || filter.indexOf(layer.name)+1) {
      layer.features.forEach(function(feature) {
       var output = geojsonize(feature, tilePoint, layer);

        if (parsedTile.features) {
          parsedTile.features.push(output);
        } else {
          parsedTile.features = [output];
        }
      });
    }
  });
  parsedTile.type = 'FeatureCollection';
  return parsedTile;
};

module.exports.convertTile = convertTile;
