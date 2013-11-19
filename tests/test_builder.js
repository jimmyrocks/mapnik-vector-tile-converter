var assert = require('assert');
var builder = require('../src/builder.js');
var director = require('../src/director.js');

describe("Builder\n", function() {
    beforeEach(function() {
        myGeometry = new builder.Builder();
    });

    it("        MoveTo(40, 32) should give [20, 16]", function () {
        myGeometry.moveTo(40, 32);
        assert.deepEqual(myGeometry.getTileRelativeGeometry(), [[20, 16]])
    });

    it("        LineTo(2, 4) should give [0, 0, 1, 2]", function () {
        myGeometry.lineTo(2, 4);
        assert.deepEqual(myGeometry.getTileRelativeGeometry(), [[0, 0], [1, 2]]);
    });

    it("        MoveTo(6, 2), LineTo(1, 4) should give [6, 2, 1, 4]", function () {
        myGeometry.moveTo(6, 2);
        myGeometry.lineTo(1, 4);
        assert.deepEqual(myGeometry.getTileRelativeGeometry(), [[3, 1], [2, 3]]);
    });

    it("        should works when called from the director", function () {
        decoder = new director.Decoder();
        relative_geometry = decoder.decode([9, 30, 0]);
        assert.deepEqual(relative_geometry, [[15, 0]]);
    });
})
