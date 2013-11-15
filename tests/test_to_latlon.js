var assert = require('assert');
var sinon = require('sinon');
var director = require('../director.js');
var builder = require('../builder.js');
var to_latlon = require('../to_latlon.js');

var latlong_miny = -90;
var latlong_maxy = 90;
var latlong_minx = -180;
var latlong_maxx = 180;

describe("Leaflet-vector-tile\n", function() {
    before(function() {
        encoded = new director.Director();
    });

    it("        should convert coordinates for z=0, x=0, y=0, extent=4096 to a Leaflet geometry", function() {
        z = 0, x = 0, y = 0;
        geometry = ([9, 0, 0]); //point at the SW corner of the tile
        extent = 4096;
        tile_geometry = encoded.createDecodedTile(geometry);
        result = to_latlon.convert_geometry_to_latlong(z, x, y, tile_geometry, extent);
        assert.deepEqual(result, [latlong_minx, latlong_miny]); //verify the y value
    })

    it("        should convert coordinates for z=0, x=0, y=0, extent=4096 to a Leaflet geometry", function() {
        z = 0, x = 0, y = 0;
        geometry = [9, 4096, 4096];
        extent = 4096;
        tile_geometry = encoded.createDecodedTile(geometry);
        result = to_latlon.convert_geometry_to_latlong(z, x, y, tile_geometry, extent);
        assert.deepEqual(result, [0, 0]);
    })
});
