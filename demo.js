var validate = require('./');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    constraints = {
        XYZ: function(v) {
            if (v) {
                if (!/^[xyz]$/.test(v)) {
                    return 'XYZ: ' + v + ' is not a valid value!';
                }
            }
        }
    };

var results = validate(file, sheet, constraints)
var invalid = results.report.invalid;

for (var i in invalid) {
    if (invalid.hasOwnProperty(i)) {
        console.log(results.rows[i]);
        console.log(invalid[i]);
        console.log('');
    }
};



