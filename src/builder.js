// Builder class describing operations on Mapnik-vector-tiles's geometries

function Builder() {
    this.relativeGeometry = [];
}

Builder.prototype.moveTo = function moveTo(x, y) {
    geomSize = this.relativeGeometry.length;
    if (!geomSize) {
        previous = [0, 0];
    } else {
        previous = this.relativeGeometry[geomSize - 1];
    }
    this.relativeGeometry.push([previous[0] + x, previous[1] + y]);
};

Builder.prototype.lineTo = function lineTo(x, y) {
    geomSize = this.relativeGeometry.length;
    if (!geomSize) {
        this.relativeGeometry.push([0, 0]);
        geomSize ++;
    }
    previous = this.relativeGeometry[geomSize - 1];
    this.relativeGeometry.push([previous[0] + x, previous[1] + y]);
};

Builder.prototype.closePath = function closePath() {};

Builder.prototype.getRelativeGeometry = function getRelativeGeometry() {
    return this.relativeGeometry;
};

module.exports.Builder = Builder;
