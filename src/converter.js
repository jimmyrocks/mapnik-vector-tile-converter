function sinh(x){
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

function toLon(n, xtile, x) {
    lon = 360 * (xtile + x) / n - 180;
    return lon;
}

function toLat(n, ytile, y) {
    lat = 180/Math.PI * Math.atan(sinh(Math.PI * (1 - 2 * (ytile + y) / n)));
    return lat;
}

function tolatlon(z, x, y, tileGeometry, extent) {
    var latlonGeometry = [];
    for (var i=0; i<tileGeometry.length; i++) {
        n = 1 << z; // 2^z
        lon = toLon(n, x, tileGeometry[i][0]/extent);
        lat = toLat(n, y, tileGeometry[i][1]/extent);
        latlonGeometry.push([lon, lat]);
    }
    if (latlonGeometry.length == 1) {
        latlonGeometry = latlonGeometry[0];
    }
    return latlonGeometry;
}

module.exports.tolatlon = tolatlon;
