var toLonLat = function (geometries, close) {
  var newGeometries = [];
  for (var i= 0; i<geometries.length; i++) {
    newGeometries.push([geometries[i][1], geometries[i][0]]);
  }
  if (close && newGeometries.length) {
    newGeometries.push(newGeometries[0]);
  }
  return newGeometries;
}

exports = module.exports = function(entry, type, id) {
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
    newEntry.geometry.type = "Point";
    newEntry.geometry.coordinates = toLonLat(entry.geometry);
  } else if (type === 2) {
    // Line
    newEntry.geometry.type = "LineString";
    newEntry.geometry.coordinates = toLonLat(entry.geometry);
  } else if (type === 3) {
    // Polygon
    newEntry.geometry.type = "Polygon";
    newEntry.geometry.coordinates.push(toLonLat(entry.geometry, true));
  }

  return newEntry;
};
