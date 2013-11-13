var builder = require('./builder.js');

get_command = function (instruction) {
    var command = instruction & 7;
    return command;
};

get_frequence = function (instruction) {
    var frequence = instruction >>> 3;
    return frequence;
}

function construct(geometry) {
    var i = 0;
    while (i<geometry.length) {
        var command = get_command(geometry[i]);
        var frequence = get_frequence(geometry[i]);
        switch (command) {
            case 1: // MoveTo
                x = geometry.slice(i+1)[0];
                y = geometry.slice(i+1)[1];
                builder.MoveTo(x, y);
                i += 2 * frequence + 1;
                break;
            case 2: // LineTo
                coordinates = geometry.slice(i+1);
                builder.LineTo.apply(this, coordinates);
                i += 2 * frequence + 1;
                break;
            case 7: //ClosePath
                builder.ClosePath();
                i++;
                break;
            default:
                throw('Error while parsing PBF: invalid geometry');
        }
    }
}

module.exports.construct = construct;
