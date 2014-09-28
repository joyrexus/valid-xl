(function() {
    var __hasProp = {}.hasOwnProperty;
    var __extends = function(child, parent) { 
        for (var key in parent) { 
            if (__hasProp.call(parent, key)) {
                child[key] = parent[key]; 
            }
        } 
        function ctor() { this.constructor = child; } 
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype; 
        return child; 
    };

    var Parser = require('./parse');

    var Validator = (function(_super) {
        __extends(Validator, _super);

        function Validator(file, sheet, constraints) {
            this.constraints = constraints;
            this.columns = Object.keys(constraints);
            this.report = { 
                errors: 0,
                file: file,
                sheet: sheet,
                invalid: {}
            };
            return Validator.__super__.constructor.apply(this, arguments);
        }

        Validator.prototype.validate = function(columns) {
            if (!columns) {
                columns = this.columns;
            }
            for (var i in this.rows) {
                var row = this.rows[i];
                for (var _i = 0; _i < columns.length; _i++) {
                    var col = columns[_i];
                    var value = row[col];
                    var error = this.constraints[col](value);
                    if (error) {
                        this.report.errors++;
                        if (! this.report.invalid.hasOwnProperty(i)) {
                            this.report.invalid[i] = [];
                        }
                        this.report.invalid[i].push(error);
                    } 
                }
            }
            return this;
        };

        Validator.prototype.printReport = function() {
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

        return Validator;

    })(Parser);

    module.exports = Validator;

}).call(this);
