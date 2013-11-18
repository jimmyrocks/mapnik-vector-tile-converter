var parser = require('../src/PBF_parser.js');
var director = require('../src/director.js');
var latlon = require('../src/to_latlon.js');

var content = parser.parse('14_8716_8015.vector.pbf'); //this is a very big file
var z = 14;
var x = 8716;
var y = 8015;

var encoded = new director.Director();

content.forEach(function(layer) {
    console.log("layer " + layer.name + ":");
    var features = layer.features;
    var geometries = [];
    var extent = layer.extent;

    console.log("Decoded coordinates: ");
    features.forEach(function(feature) {
        var coded_geometry = feature.geometry;
        var relative_geometry = encoded.createDecodedTile(coded_geometry);
        console.log(latlon.convertGeometryToLatLon(z, x, y, relative_geometry, extent));
    });
    console.log("");
});
