# mapnik-vector-tile-converter

This converts Mapnik Vector Tile geometries to a list of latlon or spherical Mercator coordinates.

## Dependancies

This code is written in NodeJS. To use it, you need to install:
Protobuf.js: <https://github.com/dcodeIO/ProtoBuf.js/>


## Usage

Look at the code example!

## Development

### Run tests

    mocha tests

### Director
Calls the appropriate functions (moveTo, lineTo and/or closePath as described in the Mapnik's vector\_tile.proto) for a Mapnik Vector Tile geometry.

### Builder
Returns the geometry of the tile (= relative coordinates) from MoveTo, LineTo and ClosePath commands.

### Converter
Changes the geometry relative to the tile into a latitude longitude or Mercator-projected x y list.

### Notes
This project was made as I tried to understand how PBF tiles work. I had not heard about [Node-Mapnik](https://github.com/mapnik/node-mapnik), which is (really) more efficient to convert PBF tiles to another format. The idea here was to decode PBF tiles in Node and then browserify all the code to use it client-side and get a geometry usable with Leaflet. It should be possible to improve the code to have better performances, but I'm almost sure it will never be as efficient as a server-side PBF decoding in Node with C++ bindings.
