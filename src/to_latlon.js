function sinh(x){
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

function to_lon(n, xtile, x) {
    lon = 360 * (xtile + x) / n - 180;
    return lon;
}

function to_lat(n, ytile, y) {
    lat_rad = Math.atan(sinh(Math.PI * (1 - 2 * (ytile + y) / n)));
    lat = lat_rad * 180 / Math.PI;
    return lat;
}

function convert_geometry_to_latlon(z, x, y, tile_geometry, extent) {
    var leaflet_geometry = [];
    for (var i=0; i<tile_geometry.length; i++) {
        n = 1 << z; // 2^z
        lon = to_lon(n, x, tile_geometry[i][0]/extent);
        lat = to_lat(n, y, tile_geometry[i][1]/extent);
        leaflet_geometry.push([lon, lat]);
    }
    if (leaflet_geometry.length == 1) {
        leaflet_geometry = leaflet_geometry[0];
    }
    return leaflet_geometry;
}

module.exports.convert_geometry_to_latlon = convert_geometry_to_latlon;
