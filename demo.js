var validate = require('./');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    constraints = {
        XYZ: function(v) {
            if (v) {
                if (!/^[xyz]$/.test(v)) {
                    return { XYZ: v + ' is not a valid value!' }
                }
            }
        }
    };

var results = validate(file, sheet, constraints);
// results.printReport();
// console.log(JSON.stringify(results.report, null, 2));

var errors = results.report.errors;

for (var i in errors) {
    if (errors.hasOwnProperty(i)) {
        console.log(results.records[i]);
        console.log(errors[i]);
        console.log('');
    }
}
