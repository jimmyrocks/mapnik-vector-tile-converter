//constants from Mapnik
module.exports.EARTH_CIRCUMFERENCE = 6378137.0 * 2 * Math.PI;

module.exports.sinh = function sinh(x){
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

module.exports.decodeSint32 = function decodeSint32(encoded_value) { // decode zigzag encoding
    if (encoded_value % 2 == 0) {
        return encoded_value / 2;
    } else {
        return - (encoded_value + 1) / 2;
    }
};
