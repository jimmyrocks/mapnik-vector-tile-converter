// Builder class describing operations on Mapnik-vector-tiles's geometries

function Builder() {
    this.relativeGeometry = [];
}

Builder.prototype.moveTo = function moveTo(x, y) {
    this.relativeGeometry.push([x, y]);
};

Builder.prototype.lineTo = function lineTo(x, y) {
    this.relativeGeometry.push([x, y]);
};

Builder.prototype.closePath = function closePath() {};

Builder.prototype.getRelativeGeometry = function getRelativeGeometry() {
    return this.relativeGeometry;
};

module.exports.Builder = Builder;
