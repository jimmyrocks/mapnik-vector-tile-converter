var director  = require('./director.js'),
converter = require('./converter'),
toLonLat = function (geometries, tilePoint, extent, type) {
  var newGeometries = [[]],
  polygonIndex = 0,
  closePolygon = function(idx) {
    // Don't think we need to do this
    //newGeometries[idx].pop();
    newGeometries[idx].push(newGeometries[idx][0]);
  };

  for (var i= 0; i<geometries.length; i++) {
    if (geometries[i][2] >= newGeometries.length) {
      closePolygon(polygonIndex);
      polygonIndex = newGeometries.push([]) - 1;
    } else {
      var newGeos = converter.Converter.tolatlon(tilePoint.z, tilePoint.x, tilePoint.y, [geometries[i]], extent)[0];
      newGeometries[polygonIndex].push([newGeos[1], newGeos[0]]);
    }
  }
  var returnTypes = {
    '1': function() {
      return newGeometries[0][0];
    },
    '2': function() {
      return newGeometries[0];
    },
    '3': function() {
      closePolygon(polygonIndex);
      return newGeometries;
    }
  };
  return returnTypes[type]();
},
parseTags = function(rawTags, layer) {
  /*jshint camelcase: false */
  var tags = [];
  for (var i = 1 ; i < rawTags.length ; i+=2) {
    var tag = layer.values[rawTags[i]];
    if ((tag.string_value || tag.int_value || tag.double_value || tag.float_value || tag.bool_value || tag.sint_value || tag.uint_value) == null) {
      tag = null;
    } else if (tag.string_value) {
      tag = tag.string_value;
    } else {
      tag = tag.int_value | tag.double_value | tag.float_value | tag.bool_value | tag.sint_value | tag.uint_value ;
    }
    tags.push({key: layer.keys[rawTags[i-1]], value: tag});
  }
  return tags;
};

exports = module.exports = function(feature, tilePoint, layer) {
  var newEntry = {
    'type': 'Feature',
    'geometry': {
      'type': '',
      'coordinates': []
    },
    'properties': {
    },
    'id': feature.id.low
  },
  decoder = new director.Decoder(),
  tags = parseTags(feature.tags, layer);

  // Tags
  
  for (var i = 0; i < tags.length; i++) {
    newEntry.properties[tags[i].key] = tags[i].value;
  }
  // Add the layername to the tags
  tags.layer = layer.name;

  // Geometry
  var relative = decoder.decode(feature.geometry);

  var types = {
    '1': {
      'type': 'Point',
      'coordinates': function() {
        return toLonLat(relative, tilePoint, layer.extent, 1);
      }
    },
    '2': {
      'type': 'LineString',
      'coordinates': function() {
        return toLonLat(relative, tilePoint, layer.extent, 2);
      }
    },
    '3': {
      'type': 'Polygon',
      'coordinates': function() {
        return toLonLat(relative, tilePoint, layer.extent, 3);
      }
    }
  };

  newEntry.geometry = types[feature.type];
  newEntry.geometry.coordinates = newEntry.geometry.coordinates();

  return newEntry;
};
