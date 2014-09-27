var parse = require('j');

module.exports = (function() {

    function Parser(file, sheet, validator) {
        this.validator = validator;
        this.columns = Object.keys(validator);
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
        var values = [];
        for (var i = 0; i < this.rows.length; i++) {
            row = this.rows[i];
            values.push(row[column]);
        }
        return values;
    };

    Parser.prototype.validate = function(columns) {
        if (!columns) {
            columns = this.columns;
        }
        for (var i in this.rows) {
            var row = this.rows[i];
            for (var _i = 0, _len = columns.length; _i < _len; _i++) {
                var col = columns[_i];
                var value = row[col];
                var status = this.validator[col](value);
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

        for (var row in this.report.invalid) {
            invalid = this.report.invalid[row];
            line = parseInt(row) + 2;
            console.log("LINE " + line + ":");
            for (var i = 0; i < invalid.length; i++) {
                console.log("\t" + invalid[i]);
            }
        }
    };

    return Parser;

})();
