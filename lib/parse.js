var parse = require('j');
var valid = require('./valid');

module.exports = (function() {

    function Parser(file, sheet) {
        this.file = file;
        var parsed = parse.readFile(this.file);
        var data = parse.utils.to_json(parsed);
        this.rows = data[sheet];
        this.report = { 
            errors: 0,
            file: file,
            sheet: sheet,
            invalid: {}
        };
    }

    Parser.prototype.values = function(column) {
        var r, i, len, values
        values = [];
        for (i = 0, len = this.rows.length; i < len; i++) {
            row = this.rows[i];
            values.push(row[column]);
        }
        return values;
    };

    Parser.prototype.validate = function(columns) {
        for (var i in this.rows) {
            row = this.rows[i];
            for (var _i = 0, _len = columns.length; _i < _len; _i++) {
                col = columns[_i];
                value = row[col];
                var status = valid[col](value);
                if (status) {
                    this.report.errors++;
                    if (! this.report.invalid.hasOwnProperty(i)) {
                        this.report.invalid[i] = [];
                    }
                    this.report.invalid[i].push(status);
                } 
            }
        }
        return this;
    };

    Parser.prototype.printReport = function() {
        console.log(
            this.report.errors 
                + " invalid values in `" 
                + this.report.file + ":" + this.report.sheet 
                + "`\n"
        );

        for (row in this.report.invalid) {
            invalid = this.report.invalid[row];
            row += 1;
            console.log("ROW " + row + ":");
            for (var i = 0; i < invalid.length; i++) {
                console.log("\t" + invalid[i]);
            }
        }
    };

    return Parser;

})();