var builder = require('./builder.js');

function Director() {
    this.mapnikEncodedGeometry;
};

Director.prototype.setMapnikEncodedGeometry = function setMapnikEncodedGeometry(encoded) {
    this.mapnikEncodedGeometry = encoded;
};

Director.prototype.callBuilderFunctions = function callBuilderFunctions(mapnikvtGeometry) {
    geometry = this.mapnikEncodedGeometry;
    var i = 0;
    while (i<geometry.length) {
        var command = get_command(geometry[i]);
        var frequence = get_frequence(geometry[i]);
        var next_i;
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

get_command = function (instruction) {
    var command = instruction & 7;
    return command;
};

get_frequence = function (instruction) {
    var frequence = instruction >>> 3;
    return frequence;
}

Director.prototype.createDecodedTile = function createDecodedTile(geometry) {
    this.mapnikEncodedGeometry = geometry;
    var relativeTileGeometryBuilder = new builder.Builder();
    this.callBuilderFunctions(relativeTileGeometryBuilder);
    return relativeTileGeometryBuilder.getTileRelativeGeometry();
}

module.exports.Director = Director;
