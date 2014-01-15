var http = require('http'),
fs = require('fs'),
stream = require('./tileStream'),
info = function(req, res) {
  //res.writeHead(200, {'Content-Type': 'text/html'});
  //res.end('nothing here');
  var fileStream = fs.createReadStream('./index.html');
  fileStream.on('data', function (data) {
    res.write(data);
  });
  fileStream.on('end', function() {
    res.end();
  });
},
getTile = function(req, res) {
  var zxy = req.url.replace(/[^\d\/]/g, '').split('/');
  zxy.shift();
  zxy.shift();
  if (zxy[0] < '15') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    stream(zxy, function(data) {
      res.end(JSON.stringify(data, null, 2));
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('only use zoom level 14');
  }
},
routes = {
  '/': info,
  '/mvt/\\d+?/\\d+?/\\d+?\\..*': getTile,
  'default': info
};

http.createServer(function (req, res) {
  var responded = false;
  for (var route in routes) {
    var routeRegex = new RegExp(['^', route, '$'].join(''), 'g');
    if (req.url.match(routeRegex)) {
      responded = true;
      routes[route](req, res);
    }
  }
  if (!responded) {
    routes['default'](req, res);
  }
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
