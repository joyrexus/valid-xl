'use strict';

var Parser = require('parse-xl');
var Validator = require('valid-records');

module.exports = function (filename, sheetname, constraints) {

    var excel = new Parser(filename),
        valid = new Validator(constraints),
        results = valid.validate(excel.records(sheetname));
    return results;
};
