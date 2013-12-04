var assert = require('assert');
var director = require('../src/director.js');
var builder = require('../src/builder.js');
var sinon = require('sinon');


describe("Decoder\n", function() {
    before(function() {
        decoder = new director.Decoder();
    });

    beforeEach(function() {
        myGeometry = new builder.Builder();
        move = sinon.spy(builder.Builder.prototype, "moveTo");
        line = sinon.spy(builder.Builder.prototype, "lineTo");
        close = sinon.spy(builder.Builder.prototype, "closePath");
    });

    afterEach(function() {
        builder.Builder.prototype.moveTo.restore();
        builder.Builder.prototype.lineTo.restore();
        builder.Builder.prototype.closePath.restore();
    });

    it("        should call moveTo with parameters 12, 26 when [9, 12, 26]", function () {
        instruction = [9, 12, 26];
        decoder.decode(instruction);
        sinon.assert.calledWithExactly(move, 6, 13);
    });

    it("        should call LineTo with parameters 28, 94 when [10, 28, 94]", function() {
        instruction = [10, 28, 94];
        decoder.decode(instruction);
        sinon.assert.calledWithExactly(line, 14, 47);
    });

    it("        should call LineTo twice with parameters 42, 54 and 79, 63 when [18, 42, 54 79, 63]", function() {
        instruction = [18, 42, 54, 79, 63];
        decoder.decode(instruction);
        sinon.assert.calledTwice(line);
        sinon.assert.calledWithExactly(line, 21, 27);
        sinon.assert.calledWithExactly(line, -40, -32);
    });
    it("        should call MoveTo twice with parameters 42, 54 and 79, 63 when [18, 42, 54 79, 63]", function() {
        instruction = [17, 42, 54, 79, 63];
        decoder.decode(instruction);
        sinon.assert.calledTwice(move);
        sinon.assert.calledWithExactly(move, 21, 27);
        sinon.assert.calledWithExactly(move, -40, -32);
    });
    it("        should call MoveTo then LineTo when [9, 85, 69, 10, 90, 30]", function() {
        instruction = [9, 85, 69, 10, 90, 30];
        decoder.decode(instruction);
        sinon.assert.callOrder(move, line);
    });
    it("        should call LineTo twice when [10, 85, 69, 10, 90, 30]", function() {
        instruction = [10, 85, 69, 10, 90, 30];
        decoder.decode(instruction);
        sinon.assert.calledTwice(line);
    });
    it("        should call MoveTo then LineTo then ClosePath when [9, 85, 69, 10, 90, 30, 15]", function() {
        instruction = [9, 85, 69, 10, 90, 30, 15];
        decoder.decode(instruction);
        sinon.assert.callOrder(move, line, close);
    });
})
