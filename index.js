'use strict';

var Parser = require('parse-xl');
var Validator = require('valid-records');

module.exports = function (file, sheet, schema) {

    var excel = new Parser(file),
        valid = new Validator(schema),
        results = valid.validate(excel.records(sheet));
    return results;
};
