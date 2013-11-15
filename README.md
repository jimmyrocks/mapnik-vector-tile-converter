# mapnik-vector-tile-converter

This should convert Mapnik Vector Tile geometries to latlon.

## Dependancies

This code is written in NodeJS. To use it, you need to install:

Protobuf.js <https://github.com/dcodeIO/ProtoBuf.js/>

## Usage

Here a little example:

    geometry = [9, 2, 4]; //"geometry" extracted from a PBF Mapnik tile.
    encoded = new director.Director();
    relative_geometry = encoded.createDecodedTile(geometry);
    result = to_latlon.convert_geometry_to_latlong(z, x, y, tile_geometry, extent); //replace z, x, y and extent by the corresponding values (extent is generally 4096, but it is specified in the value "extent" of Mapnik Vector Tile)

## Code

### Director
calls the appropriate functions (moveTo, lineTo and/or closePath as described in the Mapnik's vector_tile.proto) for a Mapnik Vector Tile geometry.

### Builder
returns the geometry of the tile (= relative coordinates) from MoveTo, LineTo and ClosePath commands

