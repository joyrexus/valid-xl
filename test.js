var assert = require('assert');
var constraints = require('sample.constraints');

var test_LRB = function() {
    assert(constraints.LRB('') === undefined, "permit empty strings");
    assert(constraints.LRB('X') === 'LRB = `X` is an invalid value');
    assert(constraints.LRB('L') === undefined);
    assert(
        constraints.LRB(' L') === 'LRB = ` L` is an invalid value',
        "check for spacing"
    );
    assert(
        constraints.LRB('LL') === 'LRB = `LL` is an invalid value',
        "require prefix operators"
    );
    assert(constraints.LRB('L+L') === undefined, "permit multiple code chars");
    assert(constraints.LRB('L+R') === undefined);
    assert(constraints.LRB('L+R+B') === undefined);
    assert(
        constraints.LRB('L+X') === 'LRB = `L+X` is an invalid value',
        "only permit valid code chars"
    );
    assert(
        constraints.LRB('L + R') === 'LRB = `L + R` is an invalid value',
        "do not permit inline spacing"
    );
};

// modify this for testing the next validation function
var test_XYZ = function() {
    assert(constraints.XYZ('') === undefined);
    assert(constraints.XYZ('x') === undefined);
    assert(constraints.XYZ('y') === undefined);
    assert(constraints.XYZ('z') === undefined);
    assert(constraints.XYZ('q') === 'XYZ = `q` is an invalid value');
};

var test_validate = function() {
    var validate = require('./');
    var file = 'sample.xlsx', 
        sheet = 'Transcript'
    report = validate(file, sheet, constraints).report;
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
