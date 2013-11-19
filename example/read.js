var mvt = require('../src/mapnikvectortile.js');
var director = require('../src/director.js');
var converter = require('../src/converter.js');

var content = mvt.parse('14_8716_8015.vector.pbf'); //this is a very big file
var z = 14;
var x = 8716;
var y = 8015;

var decoder = new director.Decoder();

content.forEach(function(layer) {
    console.log("layer " + layer.name + ":");
    var features = layer.features;
    var geometries = [];
    var extent = layer.extent;

    console.log("Decoded coordinates: ");
    features.forEach(function(feature) {
        var relative = decoder.decode(feature.geometry);
        console.log(converter.tolatlon(z, x, y, relative, extent));
    });
    console.log("");
});
