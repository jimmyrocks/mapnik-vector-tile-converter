var delta = 4.948871220193411; //TODO remove hardcoded delta due to "y + 1" -> the NW corner of the tile under this one...

function sinh(x){
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

function tile_to_SW_latlon_deg(z, x, y) {
    n = Math.pow(2, z);
    lon = x / n * 360 - 180;
    lat = Math.atan(sinh(Math.PI * (1 - 2 * (y + 1) / n))) * 180/Math.PI - delta;
    return[lon, lat];
}

function convert_geometry_to_latlon(z, x, y, tile_geometry, extent) {
    var leaflet_geometry = [];
    for (var i=0; i<tile_geometry.length; i++) {
        tile_SW_coord = tile_to_SW_latlon_deg(z, x, y);
        ll_x = tile_SW_coord[0] + tile_geometry[i][0]*360/extent;
        ll_y = tile_SW_coord[1] + tile_geometry[i][1]*180/extent;
        leaflet_geometry.push([ll_x, ll_y]);
    }
    if (leaflet_geometry.length == 1) {
        leaflet_geometry = leaflet_geometry[0];
    }
    return leaflet_geometry;
}

module.exports.convert_geometry_to_latlon = convert_geometry_to_latlon;
