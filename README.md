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
