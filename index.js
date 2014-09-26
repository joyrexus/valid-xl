var Parser = require('./lib/parse');

module.exports = function(filename, sheetname, columns) {
    var sheet = new Parser(filename, sheetname);
    var report = sheet.validate(columns);
    return report;
};
