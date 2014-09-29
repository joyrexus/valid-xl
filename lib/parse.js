var parse = require('j');
var Readable = require('stream').Readable;

module.exports = (function() {

    function Parser(file, sheet) {
        this.file = file;
        this.sheet = sheet;
        var parsed = parse.readFile(this.file);
        var data = parse.utils.to_json(parsed);
        this.rows = data[sheet];
        var rs = Readable(); // { objectMode: true }),
            rows = this.rows,
            length = this.rows.length;
        rs._read = function () {
            for (var i = 0; i < length; i++) {
                rs.push(JSON.stringify(rows[i]) + "\n");
            }
            rs.push(null);
        }
        this.recordStream = rs;
    }

    Parser.prototype.values = function(column) {
        var values = [];
        for (var i = 0; i < this.rows.length; i++) {
            row = this.rows[i];
            values.push(row[column]);
        }
        return values;
    };

    return Parser;

})();
