var builder = require('./builder.js');

function Decoder() {
    this.mapnikEncodedGeometry;
};

Decoder.prototype.setMapnikEncodedGeometry = function setMapnikEncodedGeometry(encoded) {
    this.mapnikEncodedGeometry = encoded;
};

Decoder.prototype.callBuilderFunctions = function callBuilderFunctions(mapnikvtGeometry) {
    var geometry = this.mapnikEncodedGeometry;
    var i = 0;
    while (i<geometry.length) {
        var instruction = geometry[i];
        var command = instruction & 7;
        var frequence = instruction >>> 3;
        var next_i, coordinates;
        switch (command) {
            case 1: // MoveTo
                //TODO: call_f(i, next_i, geometry, frequence, builder.MoveTo);
                next_i = i + 2 * frequence + 1;
                coordinates = geometry.slice(i+1, next_i);
                for (j = 0; j<coordinates.length ; j+=2) {
                    mapnikvtGeometry.moveTo(coordinates[j], coordinates[j+1]);
                }
                i = next_i;
                break;
            case 2: // LineTo
                next_i = i + 2 * frequence + 1;
                coordinates = geometry.slice(i+1, next_i);
                for (j = 0; j<coordinates.length ; j+=2) {
                    mapnikvtGeometry.lineTo(coordinates[j], coordinates[j+1]);
                }
                i = next_i;
                break;
            case 7: //ClosePath
                mapnikvtGeometry.closePath();
                i++;
                break;
            default:
                throw('Error while parsing PBF: invalid Mapnik-vector-tile geometry');
        }
    }
}

Decoder.prototype.decode = function decode(geometry) {
    this.mapnikEncodedGeometry = geometry;
    var relativeTileGeometryBuilder = new builder.Builder();
    this.callBuilderFunctions(relativeTileGeometryBuilder);
    return relativeTileGeometryBuilder.getTileRelativeGeometry();
}

module.exports.Decoder = Decoder;
