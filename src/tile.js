var director = require('./director.js');
var converter = require('./converter.js');

var convertTile = function (tile, tilePoint) {
    decoder = new director.Decoder();
    tile.forEach(function(layer) {
        layer.features.forEach(function(feature) {
            relative = decoder.decode(feature.geometry);
            feature.geometry = converter.Converter.tolatlon(tilePoint.z, tilePoint.x, tilePoint.y, relative, layer.extent);
        });
        var tags = []
        layer.features.forEach(function(feature) {
            mapnikTags = feature.tags;
            feature.tags = [];
            for (var i = 1 ; i < mapnikTags.length ; i+=2) {
                tag = layer.values[mapnikTags[i]];
                if ((tag.string_value || tag.int_value || tag.double_value || tag.float_value || tag.bool_value || tag.sint_value || tag.uint_value) == null) {
                    tag = null;
                } else if (tag.string_value) {
                    tag = tag.string_value;
                } else {
                    tag = tag.int_value | tag.double_value | tag.float_value | tag.bool_value | tag.sint_value | tag.uint_value ;
                }
                feature.tags.push({key: layer.keys[mapnikTags[i-1]], value: tag});
            }
        });
    });
    return tile;
}

module.exports.convertTile = convertTile;
