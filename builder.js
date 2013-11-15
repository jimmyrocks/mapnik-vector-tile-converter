// Builder class describing operations on Mapnik-vector-tiles's geometries

function Builder() {
    this.tileRelativeGeometry = [];
}

Builder.prototype.moveTo = function moveTo(x, y) {
    x = decode_sint32(x);
    y = decode_sint32(y);
    geom_size = this.tileRelativeGeometry.length;
    if (!geom_size) {
        previous = [0, 0];
    } else {
        previous = this.tileRelativeGeometry[geom_size - 1];
    }
    this.tileRelativeGeometry.push([previous[0] + x, previous[1] + y]);
};

Builder.prototype.lineTo = function lineTo(x, y) {
    x = decode_sint32(x);
    y = decode_sint32(y);
    geom_size = this.tileRelativeGeometry.length;
    if (!geom_size) {
        this.tileRelativeGeometry.push([0, 0]);
        geom_size ++;
    }
    previous = this.tileRelativeGeometry[geom_size - 1];
    this.tileRelativeGeometry.push([previous[0] + x, previous[1] + y]);
};

Builder.prototype.closePath = function closePath() {};

var decode_sint32 = function (encoded_value) { // decode zigzag encoding
    if (encoded_value % 2 == 0) {
        return encoded_value / 2;
    } else {
        return - (encoded_value + 1) / 2;
    }
};

Builder.prototype.getTileRelativeGeometry = function getTileRelativeGeometry() {
    return this.tileRelativeGeometry;
};

module.exports.Builder = Builder;
