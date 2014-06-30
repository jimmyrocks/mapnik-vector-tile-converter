var mvt = require('../../src/nodePBFreader.js'),
  tile = require('../../src/geojsonTile.js'),
  http = require('http'),
  getUrl = function(url, callback) {
    var chunks = [];
    console.log('u', url);
    http.get(url, function(res) {
      res.on('data', function(chunk) {
        chunks.push(chunk);
      });
      res.on('end', function() {
        var buffer = new Buffer(chunks.reduce(function(prev, current) {
          return prev.concat(Array.prototype.slice.call(current));
        }, []));
        callback(buffer);
      });
    });
  };

exports = module.exports = function(zxy, callback) {
  // http://b.tiles.mapbox.com/v3/mapbox.mapbox-streets-v4/14/4748/6227.vector.pbf
  var keys = ['a', 'b', 'c', 'd'],
    //mapId = 'nps.znvlmboc', ///'nps.2s79o1or', /'nps.07oxn7b9', //'mapbox.mapbox-streets-v4', //'nps.07oxn7b9',
    key = keys[[(parseInt(zxy[1], 10) * 31 + parseInt(zxy[2], 10)) % 4]],
    mapId = 'mapbox.mapbox-streets-v4',
    url = 'http://' + key + '.tiles.mapbox.com/v3/' + mapId  + '/' + zxy.join('/') + '.vector.pbf';

  getUrl(url, function(chunks) {
    mvt.parse(chunks, function(data) {
      callback(tile.convertTile(data, {
        'z': parseInt(zxy[0], 10),
        'x': parseInt(zxy[1], 10),
        'y': parseInt(zxy[2], 10)
      }/*, ['water', 'building', 'road', 'bridge', 'tunnel', 'landuse']*/));
      //callback(tile.convertTile(data, {'z': '14', 'x': 4748, 'y': 6227}));
      //callback(chunks.length);
      //var md5 = crypto.createHash('md5');
      //md5.update(chunks);
      //callback(md5.digest('hex'));
      //console.log(JSON.stringify(convertedTile, null, 2));
    });
  });
};
