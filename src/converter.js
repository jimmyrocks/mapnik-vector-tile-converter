util = require('./util');

var Converter = {
    tolatlon: function (z, x, y, tileGeometry, extent) {
        return convert(z, x, y, tileGeometry, extent, ctolatlon);
    },
    tomercator: function (z, x, y, tileGeometry, extent) {
        return convert(z, x, y, tileGeometry, extent, ctomercator);
    }
}

function convert(z, x, y, tileGeometry, extent, project) {
    var convertedGeometry = [];
    for (var i=0; i<tileGeometry.length; i++) {
        var n = 1 << z; // 2^z
        var xglobal = x + tileGeometry[i][0]/extent;
        var yglobal = y + tileGeometry[i][1]/extent;
        convertedGeometry.push(project(n, xglobal, yglobal));
    }
    if (convertedGeometry.length == 1) {
        convertedGeometry = convertedGeometry[0];
    }
    return convertedGeometry;
}

var ctolatlon = function ctolatlon(n, x, y) {
    var lon = 360 * x / n - 180;
    var lat = 180/Math.PI * Math.atan(util.sinh(Math.PI * (1 - 2 * y / n)));
    return [lat, lon];
}

var ctomercator = function ctomercator(n, x, y) {
    var resolution = util.EARTH_CIRCUMFERENCE / n;
    var mx = -0.5 * util.EARTH_CIRCUMFERENCE + x * resolution;
    var my = 0.5 * util.EARTH_CIRCUMFERENCE - y * resolution;
    return [mx, my];
}

module.exports.Converter = Converter;
