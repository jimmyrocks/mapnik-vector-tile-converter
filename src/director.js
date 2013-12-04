var builder = require('./builder.js');
var util = require('./util.js');

function Decoder() {
    this.encodedGeometry;
};

Decoder.prototype.callFunctions = function callFunctions(mapnikGeometry) {
    var geometry = this.encodedGeometry;
    var i = 0;
    while (i<geometry.length) {
        var instruction = geometry[i];
        var command = instruction & 7;
        var frequence = instruction >>> 3;
        var next_i, coordinates;
        switch (command) {
            case 1: // MoveTo
                next_i = i + 2 * frequence + 1;
                coordinates = geometry.slice(i+1, next_i);
                for (j = 0; j<coordinates.length ; j+=2) {
                    var x = util.decodeSint32(coordinates[j]);
                    var y = util.decodeSint32(coordinates[j+1]);
                    mapnikGeometry.moveTo(x, y);
                }
                i = next_i;
                break;
            case 2: // LineTo
                next_i = i + 2 * frequence + 1;
                coordinates = geometry.slice(i+1, next_i);
                for (j = 0; j<coordinates.length ; j+=2) {
                    var x = util.decodeSint32(coordinates[j]);
                    var y = util.decodeSint32(coordinates[j+1]);
                    mapnikGeometry.lineTo(x, y);
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
    this.callFunctions(geometryBuilder);
    return geometryBuilder.getRelativeGeometry();
}

module.exports.Decoder = Decoder;
