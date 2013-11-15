mapnik-vector-tile-converter
============================

This converts Mapnik Vector Tile geometries to latlon.

Director
--------
calls the appropriate functions (moveTo, lineTo and/or closePath as described in the Mapnik's vector_tile.proto) for a Mapnik Vector Tile geometry.

Builder
-------
returns the geometry of the tile (= relative coordinates) from MoveTo, LineTo and ClosePath commands
