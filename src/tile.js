var director = require('./director.js'),
geojsonize = require('./togeojson.js');
converter = require('./converter.js'),
convertTile = function (tile, tilePoint, filter) {
  var decoder = new director.Decoder(),
  parsedTile = {};
  tile.forEach(function(layer) {
    if (!filter || filter.indexOf(layer.name)+1) {
      layer.features.forEach(function(feature) {
        /*jshint camelcase: false */
        var output = {},
        relative = decoder.decode(feature.geometry);
        output.geometry = converter.Converter.tolatlon(tilePoint.z, tilePoint.x, tilePoint.y, relative, layer.extent);
        output.tags = [];

        for (var i = 1 ; i < feature.tags.length ; i+=2) {
          var tag = layer.values[feature.tags[i]];
          if ((tag.string_value || tag.int_value || tag.double_value || tag.float_value || tag.bool_value || tag.sint_value || tag.uint_value) == null) {
            tag = null;
          } else if (tag.string_value) {
            tag = tag.string_value;
          } else {
            tag = tag.int_value | tag.double_value | tag.float_value | tag.bool_value | tag.sint_value | tag.uint_value ;
          }
          output.tags.push({key: layer.keys[feature.tags[i-1]], value: tag});
        }
        output = geojsonize(output, feature.type, feature.id.low);
        if (parsedTile[layer.name]) {
          parsedTile[layer.name].push(output);
        } else {
          parsedTile[layer.name] = [output];
        }
      });
    }
  });
  return parsedTile;
};

module.exports.convertTile = convertTile;
