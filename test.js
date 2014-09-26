var assert = require('assert');
var valid = require('./lib/valid');

var test_LRB = function() {
    assert(valid.LRB('') === undefined, "permit empty strings");
    assert(valid.LRB('X') === 'LRB = `X` is an invalid value');
    assert(valid.LRB('L') === undefined);
    assert(
        valid.LRB(' L') === 'LRB = ` L` is an invalid value',
        "check for spacing"
    );
    assert(
        valid.LRB('LL') === 'LRB = `LL` is an invalid value',
        "require prefix operators"
    );
    assert(valid.LRB('L+L') === undefined, "permit multiple code chars");
    assert(valid.LRB('L+R') === undefined);
    assert(valid.LRB('L+R+B') === undefined);
    assert(
        valid.LRB('L+X') === 'LRB = `L+X` is an invalid value',
        "only permit valid code chars"
    );
    assert(
        valid.LRB('L + R') === 'LRB = `L + R` is an invalid value',
        "do not permit inline spacing"
    );
};

// modify this for testing the next validation function
var test_XYZ = function() {
    assert(valid.XYZ('') === undefined);
    assert(valid.XYZ('x') === undefined);
    assert(valid.XYZ('y') === undefined);
    assert(valid.XYZ('z') === undefined);
    assert(valid.XYZ('q') === 'XYZ = `q` is an invalid value');
};

var test_validate = function() {
    var validate = require('./');
    var file = 'sample.xlsx', 
        sheet = 'Transcript', 
        columns = ['LRB', 'XYZ']
    report = validate(file, sheet, columns).report;
    assert(report.file === file);
    assert(report.sheet === sheet);
    assert(report.errors === 4);
    assert(Object.keys(report.invalid).length === 3, "3 lines have errors");
}

// run all tests here
runTests = function() {
    test_LRB();
    test_XYZ();
    test_validate();
    console.log('all tests passed!');
};

runTests()
