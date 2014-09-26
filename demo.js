var validate = require('./');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    columns = ['LRB', 'XYZ'];

var report = validate(file, sheet, columns).report;

console.log(report);
