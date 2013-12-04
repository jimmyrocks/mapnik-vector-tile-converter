var builder = require('./builder.js');
var util = require('./util.js');

function Decoder() {
    this.encodedGeometry;
};

Decoder.prototype.callBuilderFunctions = function callBuilderFunctions(mapnikGeometry) {
    var geometry = this.encodedGeometry;
    var i = 0;
    var previous = [0, 0];
    while (i<geometry.length) {
        var instruction = geometry[i];
        var command = instruction & 7;
        var frequence = instruction >>> 3;
        switch (command) {
            case 1: // MoveTo
                var next_i = i + 2 * frequence + 1;
                var coordinates = geometry.slice(i+1, next_i);
                for (j = 0; j<coordinates.length ; j+=2) {
                    var x = util.decodeSint32(coordinates[j]);
                    var y = util.decodeSint32(coordinates[j+1]);
                    mapnikGeometry.moveTo(previous[0] + x, previous[1] + y);
                    previous = [x, y];
                }
                i = next_i;
                break;
            case 2: // LineTo
                if (i == 0) {
                    mapnikGeometry.moveTo(0, 0);
                }
                var next_i = i + 2 * frequence + 1;
                var coordinates = geometry.slice(i+1, next_i);
                for (j = 0; j<coordinates.length ; j+=2) {
                    var x = util.decodeSint32(coordinates[j]);
                    var y = util.decodeSint32(coordinates[j+1]);
                    mapnikGeometry.lineTo(previous[0] + x, previous[1] + y);
                    previous = [x, y];
                }
                i = next_i;
                break;
            case 7: //ClosePath
                mapnikGeometry.closePath();
                i++;
                break;
            default:
                throw('Error while parsing PBF: invalid Mapnik-vector-tile geometry');
        }
    }
}

Decoder.prototype.decode = function decode(geometry) {
    this.encodedGeometry = geometry;
    var geometryBuilder = new builder.Builder();
    this.callBuilderFunctions(geometryBuilder);
    return geometryBuilder.getRelativeGeometry();
}

module.exports.Decoder = Decoder;
