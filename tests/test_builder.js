var assert = require('assert');
var builder = require('../src/builder.js');
var director = require('../src/director.js');

describe("Builder\n", function() {
    beforeEach(function() {
        myGeometry = new builder.Builder();
    });

    it("        MoveTo(40, 32)", function () {
        myGeometry.moveTo(40, 32);
        assert.deepEqual(myGeometry.getRelativeGeometry(), [[40, 32]])
    });

    it("        LineTo(2, 4)", function () {
        myGeometry.lineTo(2, 4);
        assert.deepEqual(myGeometry.getRelativeGeometry(), [[0, 0], [2, 4]]);
    });

    it("        MoveTo(6, 2), LineTo(1, 4)", function () {
        myGeometry.moveTo(6, 2);
        myGeometry.lineTo(1, 4);
        assert.deepEqual(myGeometry.getRelativeGeometry(), [[6, 2], [7, 6]]);
    });

    it("        should works when called from the director", function () {
        decoder = new director.Decoder();
        relative_geometry = decoder.decode([9, 30, 0]);
        assert.deepEqual(relative_geometry, [[15, 0]]);
    });
})
