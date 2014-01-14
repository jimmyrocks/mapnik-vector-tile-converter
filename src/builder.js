// Builder class describing operations on Mapnik-vector-tiles's geometries

function Builder() {
    this.relativeGeometry = [];
    this.currentIndex = 0;
}

Builder.prototype.moveTo = function moveTo(x, y) {
    this.relativeGeometry.push([x, y, this.currentIndex]);
};

Builder.prototype.lineTo = function lineTo(x, y) {
    this.relativeGeometry.push([x, y, this.currentIndex]);
};

Builder.prototype.closePath = function closePath() {
  this.currentIndex++;
};

Builder.prototype.getRelativeGeometry = function getRelativeGeometry() {
    return this.relativeGeometry;
};

module.exports.Builder = Builder;
