var assert = require('assert');
var check = require('sample.constraints');

var test_constraints = function() {
    var test_LRB = function() {
        assert(check.LRB('') === undefined, "permit empty strings");
        assert(check.LRB('X') === 'LRB = `X` is an invalid value');
        assert(check.LRB('L') === undefined);
        assert(
            check.LRB(' L') === 'LRB = ` L` is an invalid value',
            "check for spacing"
        );
        assert(
            check.LRB('LL') === 'LRB = `LL` is an invalid value',
            "require prefix operators"
        );
        assert(check.LRB('L+L') === undefined, "permit multiple code chars");
        assert(check.LRB('L+R') === undefined);
        assert(check.LRB('L+R+B') === undefined);
        assert(
            check.LRB('L+X') === 'LRB = `L+X` is an invalid value',
            "only permit valid code chars"
        );
        assert(
            check.LRB('L + R') === 'LRB = `L + R` is an invalid value',
            "do not permit inline spacing"
        );
    };

    var test_XYZ = function() {
        assert(check.XYZ('') === undefined);
        assert(check.XYZ('x') === undefined);
        assert(check.XYZ('y') === undefined);
        assert(check.XYZ('z') === undefined);
        assert(check.XYZ('q') === 'XYZ = `q` is an invalid value');
    };

    test_LRB();
    test_XYZ();
};

var test_validate = function() {
    var validate = require('./');
    var file = 'sample.xlsx', 
        sheet = 'Transcript'
    report = validate(file, sheet, check).report;
    assert(report.invalid === 4);
    assert(Object.keys(report.errors).length === 3, "3 lines have errors");
}

// run all tests here
runTests = function() {
    test_constraints();
    test_validate();
    console.log('all tests passed!');
};

runTests()
