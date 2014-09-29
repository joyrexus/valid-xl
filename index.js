var Parser = require('parse-xlsx');
var Validator = require('./lib/valid');

module.exports = function(filename, sheetname, constraints) {

    var sheet = new Parser(filename, sheetname);
    var valid = new Validator(constraints);
    var results = valid.validate(sheet.records);
    return results;
};
