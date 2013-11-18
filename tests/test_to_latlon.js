var assert = require('assert');
var sinon = require('sinon');
var director = require('../src/director.js');
var builder = require('../src/builder.js');
var tolatlon = require('../src/to_latlon.js');

describe("Leaflet-vector-tile\n", function() {
    before(function() {
        encoded = new director.Director();
        maxLat = 85.05;
    });

    it("        should convert coordinates for z=0, x=0, y=0, extent=4096 to a Leaflet geometry", function() {
        z = 0, x = 0, y = 0;
        geometry = ([9, 0, 8192]); //point at the SW corner of the tile
        extent = 4096;
        tileGeometry = encoded.createDecodedTile(geometry);
        result = tolatlon.convertGeometryToLatLon(z, x, y, tileGeometry, extent);
        result[1] = Math.round(result[1]*100)/100;
        assert.deepEqual(result, [-180, -maxLat]); //verify the y value
    })

    it("        should convert coordinates for z=1, x=0, y=1, extent=4096 to a Leaflet geometry", function() {
        z = 1, x = 0, y = 1;
        geometry = [9, 0, 8192];
        extent = 4096;
        tileGeometry = encoded.createDecodedTile(geometry);
        result = tolatlon.convertGeometryToLatLon(z, x, y, tileGeometry, extent);
        result[1] = Math.round(result[1]*100)/100;
        assert.deepEqual(result, [-180, -maxLat]);
    })

    it("        should convert coordinates for z=2, x=0, y=3, extent=4096 to a Leaflet geometry", function() {
        z = 2, x = 0, y = 3;
        geometry = [9, 0, 8192];
        extent = 4096;
        tileGeometry = encoded.createDecodedTile(geometry);
        result = tolatlon.convertGeometryToLatLon(z, x, y, tileGeometry, extent);
        result[1] = Math.round(result[1]*100)/100;
        assert.deepEqual(result, [-180, -maxLat]);
    })

    it("        should convert coordinates for z=2, x=3, y=3, extent=4096 to a Leaflet geometry", function() {
        z = 2, x = 3, y = 3;
        geometry = [9, 8192, 8192];
        extent = 4096;
        tileGeometry = encoded.createDecodedTile(geometry);
        result = tolatlon.convertGeometryToLatLon(z, x, y, tileGeometry, extent);
        result[1] = Math.round(result[1]*100)/100;
        assert.deepEqual(result, [180, -maxLat]);
    })
});
