var parse = require('j');

module.exports = (function() {

    function Parser(file, sheet) {
        this.file = file;
        this.sheet = sheet;
        var parsed = parse.readFile(this.file);
        var data = parse.utils.to_json(parsed);
        this.rows = data[sheet];
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
