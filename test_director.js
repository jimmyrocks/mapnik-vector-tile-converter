var assert = require('assert');
var director = require('./director.js');
var builder = require('./builder.js');
var sinon = require('sinon');


describe("Director\n", function() {
    afterEach(function() {
        try {builder.MoveTo.restore()}
        catch (e){}
        try {builder.LineTo.restore()}
        catch (e){}
        try {builder.ClosePath.restore()}
        catch (e){}
    });

    it("        should call MoveTo with parameters 12, 26 when [9, 12, 26]", function () {
        this.moveto = sinon.spy(builder, "MoveTo");
        instruction = [9, 12, 26];
        director.construct(instruction);
        assert(this.moveto.calledWith(12, 26));
    });
    it("        should call LineTo with parameters 28, 94 when [10, 28, 94]", function() {
        this.lineto = sinon.spy(builder, "LineTo");
        instruction = [10, 28, 94];
        director.construct(instruction);
        assert(this.lineto.calledWith(28, 94));
    });
    it("        should call LineTo with parameters 42, 54 79, 63 when [18, 42, 54 79, 63]", function() {
        this.lineto = sinon.spy(builder, "LineTo");
        instruction = [18, 42, 54, 79, 63];
        director.construct(instruction);
        assert(this.lineto.calledWith(42, 54, 79, 63));
    });
    it("        should call MoveTo then LineTo when [9, 85, 69, 10, 90, 30]", function() {
        this.moveto = sinon.spy(builder, "MoveTo");
        this.lineto = sinon.spy(builder, "LineTo");
        instruction = [9, 85, 69, 10, 90, 30];
        director.construct(instruction);
        sinon.assert.callOrder(this.moveto, this.lineto);
    });
    it("        should call LineTo twice when [10, 85, 69, 10, 90, 30]", function() {
        this.lineto = sinon.spy(builder, "LineTo");
        instruction = [10, 85, 69, 10, 90, 30];
        director.construct(instruction);
        sinon.assert.calledTwice(this.lineto);
    });
    it("        should call MoveTo then LineTo then ClosePath when [9, 85, 69, 10, 90, 30, 15]", function() {
        this.moveto = sinon.spy(builder, "MoveTo");
        this.lineto = sinon.spy(builder, "LineTo");
        this.closepath = sinon.spy(builder, "ClosePath");
        instruction = [9, 85, 69, 10, 90, 30, 15];
        director.construct(instruction);
        sinon.assert.callOrder(this.moveto, this.lineto, this.closepath);
    });

})
