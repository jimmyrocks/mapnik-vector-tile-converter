# Mapnik Vector Tiles to GeoJSON Converter
### mapnik-vector-tile-converter

This converts Mapnik Vector Tile geometries to GeoJSON format.

## Background

   I was curious how Mapnik Vector Tiles are constructed, and I figured the best way to determine that is by deconstructing them.  I found a [great library](https://github.com/vross/mapnik-vector-tile-converter) that was 90% to my goal, and I added in code to create GeoJSON from it.  If you are looking for production ready code, I'd forward you to [Node Mapnik](https://github.com/mapnik/node-mapnik), but if you're looking to learn more about how Mapik Vector tiles work, this is the place!

## Example
This example:
  * Loads tiles from MapBox Streets Vector Tiles
  * Converts them to geojson using this library
  * Draws them on a Map using [D3](https://github.com/mbostock/d3)
   
    ![](https://raw.github.com/jimmyrocks/mapnik-vector-tile-converter/master/example/img/screen_shot.png)

### Warning
  This example uses the MapBox Streets Vector Tile layer from the MapBox servers, it is only for development.

### Example Usage
```
npm install
cd ./example
node server.js
```

## Dependancies

This code is written in NodeJS. To use it, you need to install:
Protobuf.js: <https://github.com/dcodeIO/ProtoBuf.js/>

## Usage

No docs on this yet, but you can look at the server.js file in the examples directory to get an idea on how it is converting the pbf Vector Tile files to GeoJSON.

## Development

### Run tests

```
mocha tests
```

### Director
Calls the appropriate functions (moveTo, lineTo and/or closePath as described in the Mapnik's vector\_tile.proto) for a Mapnik Vector Tile geometry.

### Builder
Returns the geometry of the tile (= relative coordinates) from MoveTo, LineTo and ClosePath commands.

### Converter
Changes the geometry relative to the tile into a latitude longitude or Mercator-projected x y list.

### Notes from [vross](https://github.com/vross/)
This project was made as I tried to understand how PBF tiles work. I had not heard about [Node-Mapnik](https://github.com/mapnik/node-mapnik), which is (really) more efficient to convert PBF tiles to another format. The idea here was to decode PBF tiles in Node and then browserify all the code to use it client-side and get a geometry usable with Leaflet. It should be possible to improve the code to have better performances, but I'm almost sure it will never be as efficient as a server-side PBF decoding in Node with C++ bindings.
