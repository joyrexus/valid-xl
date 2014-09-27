var Validator = require('./lib/valid');

module.exports = function(filename, sheetname, constraints) {
    var sheet = new Validator(filename, sheetname, constraints);
    return sheet.validate();
};
