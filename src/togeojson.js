var converter = require('./converter');
var toLonLat = function (geometries, tilePoint, extent, type) {
  var newGeometries = [[]];
  var polygonIndex = 0;
  var cleanLast = function(idx) {
      // Don't think we need to do this
      //newGeometries[idx].pop();
      newGeometries[idx].push(newGeometries[idx][0]);
  }
 
  for (var i= 0; i<geometries.length; i++) {
    if (geometries[i][2] >= newGeometries.length) {
      cleanLast(polygonIndex)
      polygonIndex = newGeometries.push([]) - 1;
    } else {
      var newGeos = converter.Converter.tolatlon(tilePoint.z, tilePoint.x, tilePoint.y, [geometries[i]], extent)[0];
      newGeometries[polygonIndex].push([newGeos[1], newGeos[0]]);
    }
  }
  if (type === 3) {
    cleanLast(polygonIndex);
  }
  return newGeometries;
};

exports = module.exports = function(entry, type, id, relative, tilePoint, extent) {
  var newEntry = {
    'type': 'Feature',
    'geometry': {
      'type': '',
      'coordinates': []
    },
    'properties': {
    },
    'id': id
  };

  for (var i = 0; i < entry.tags.length; i++) {
    newEntry.properties[entry.tags[i].key] = entry.tags[i].value;
  }

  if (type === 1) {
    // Point
    newEntry.geometry.type = 'Point';
    newEntry.geometry.coordinates = toLonLat(relative, tilePoint, extent)[0][0];
  } else if (type === 2) {
    // Line
    newEntry.geometry.type = 'LineString';
    newEntry.geometry.coordinates = toLonLat(relative, tilePoint, extent)[0];
  } else if (type === 3) {
    // Polygon
    newEntry.geometry.type = 'Polygon';
    newEntry.geometry.coordinates = toLonLat(relative, tilePoint, extent, type);
  }

  return newEntry;
};
