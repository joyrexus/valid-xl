var Parser = require('./lib/parse');
var Validator = require('./lib/valid');

module.exports = function(filename, sheetname, constraints) {

    var sheet = new Parser(filename, sheetname);
    var valid = new Validator(constraints);
    var results = valid.validate(sheet.rows);
    return results;
};
