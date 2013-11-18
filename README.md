# mapnik-vector-tile-converter

This should convert Mapnik Vector Tile geometries to latlon.

## Dependancies

This code is written in NodeJS. To use it, you need to install:

Protobuf.js: <https://github.com/dcodeIO/ProtoBuf.js/>

## Usage

Look at the code example!

## Code

### Director
calls the appropriate functions (moveTo, lineTo and/or closePath as described in the Mapnik's vector_tile.proto) for a Mapnik Vector Tile geometry.

### Builder
returns the geometry of the tile (= relative coordinates) from MoveTo, LineTo and ClosePath commands
