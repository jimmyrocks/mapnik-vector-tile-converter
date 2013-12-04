// Builder class describing operations on Mapnik-vector-tiles's geometries

function Builder() {
    this.tileRelativeGeometry = [];
}

Builder.prototype.moveTo = function moveTo(x, y) {
    geomSize = this.tileRelativeGeometry.length;
    if (!geomSize) {
        previous = [0, 0];
    } else {
        previous = this.tileRelativeGeometry[geomSize - 1];
    }
    this.tileRelativeGeometry.push([previous[0] + x, previous[1] + y]);
};

Builder.prototype.lineTo = function lineTo(x, y) {
    geomSize = this.tileRelativeGeometry.length;
    if (!geomSize) {
        this.tileRelativeGeometry.push([0, 0]);
        geomSize ++;
    }
    previous = this.tileRelativeGeometry[geomSize - 1];
    this.tileRelativeGeometry.push([previous[0] + x, previous[1] + y]);
};

Builder.prototype.closePath = function closePath() {};

Builder.prototype.getTileRelativeGeometry = function getTileRelativeGeometry() {
    return this.tileRelativeGeometry;
};

module.exports.Builder = Builder;
