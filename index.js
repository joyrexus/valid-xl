var Parser = require('parse-xl');
var Validator = require('valid-records');

module.exports = function(filename, sheetname, constraints) {

    var excel = new Parser(filename);
    var valid = new Validator(constraints);
    var results = valid.validate(excel.records(sheetname));
    return results;
};
