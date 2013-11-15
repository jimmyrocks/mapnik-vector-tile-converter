decode_sint32 = function decode_sint32(encoded_value) { // decode zigzag encoding
    if (encoded_value % 2 == 0) {
        return encoded_value / 2;
    } else {
        return - (encoded_value + 1) / 2;
    }
};
