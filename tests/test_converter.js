var assert = require('assert');
var sinon = require('sinon');
var director = require('../src/director.js');
var builder = require('../src/builder.js');
var converter = require('../src/converter.js');

describe("Projection converter\n", function() {
    before(function() {
        decoder = new director.Decoder();
    });

    it("        should convert coordinates for z=0, x=0, y=0, extent=4096 to a Leaflet geometry", function() {
        var z = 0, x = 0, y = 0;
        var geometry = ([9, 0, 8192]); //point at the SW corner of the tile
        var extent = 4096;
        var tileGeometry = decoder.decode(geometry);
        var result = converter.Converter.tolatlon(z, x, y, tileGeometry, extent);
        result[0] = Math.round(result[0]*100)/100;
        assert.deepEqual(result, [-85.05, -180]); //verify the y value
    })

    it("        should convert coordinates for z=1, x=0, y=1, extent=4096 to a Leaflet geometry", function() {
        var z = 1, x = 0, y = 1;
        var geometry = [9, 0, 8192];
        var extent = 4096;
        var tileGeometry = decoder.decode(geometry);
        var result = converter.Converter.tolatlon(z, x, y, tileGeometry, extent);
        result[0] = Math.round(result[0]*100)/100;
        assert.deepEqual(result, [-85.05, -180]);
    })

    it("        should convert coordinates for z=2, x=0, y=3, extent=4096 to a Leaflet geometry", function() {
        var z = 2, x = 0, y = 3;
        var geometry = [9, 0, 8192];
        var extent = 4096;
        var tileGeometry = decoder.decode(geometry);
        var result = converter.Converter.tolatlon(z, x, y, tileGeometry, extent);
        result[0] = Math.round(result[0]*100)/100;
        assert.deepEqual(result, [-85.05, -180]);
    })

    it("        should convert coordinates for z=2, x=3, y=3, extent=4096 to a Leaflet geometry", function() {
        var z = 2, x = 3, y = 3;
        var geometry = [9, 8192, 8192];
        var extent = 4096;
        var tileGeometry = decoder.decode(geometry);
        var result = converter.Converter.tolatlon(z, x, y, tileGeometry, extent);
        result[0] = Math.round(result[0]*100)/100;
        assert.deepEqual(result, [-85.05, 180]);
    })

    it("        should return spherical Mercator coordinates for z=0, x=0, y=0, extent=4096", function() {
        var z = 0, x = 0, y = 0, extent = 4096;
        var geometry = ([9, 0, 8192]);
        var tileGeometry = decoder.decode(geometry);
        var result = converter.Converter.tomercator(z, x, y, tileGeometry, extent);
        result = [Math.round(result[0]*100)/100, Math.round(result[1]*100)/100];
        assert.deepEqual(result, [-20037508.34, -20037508.34]);
    })

    it("        should return spherical Mercator coordinates for z=2, x=1, y=1, extent=4096", function() {
        var z = 2, x = 1, y = 1, extent = 4096;
        var geometry = ([9, 8192, 8192]);
        var tileGeometry = decoder.decode(geometry);
        var result = converter.Converter.tomercator(z, x, y, tileGeometry, extent);
        result = [Math.round(result[0]*100)/100, Math.round(result[1]*100)/100];
        assert.deepEqual(result, [0, 0]);
    })
});
