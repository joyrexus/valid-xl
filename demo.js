'use strict';
var validate = require('./');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    schema = {
        XYZ: function (v) {
            if (v) {
                if (!/^[xyz]$/.test(v)) {
                    return { XYZ: v + ' is not a valid value!' };
                }
            }
        }
    };

var results = validate(file, sheet, schema);
// results.printReport();
// console.log(JSON.stringify(results.report, null, 2));

var errors = results.report.errors;

var i; // index number key
for (i in errors) {
    if (errors.hasOwnProperty(i)) {
        console.log(results.records[i]);
        console.log(errors[i]);
        console.log('');
    }
}
