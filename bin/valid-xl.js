#!/usr/bin/env node
'use strict';

var parseArgs = require('minimist');
var validate = require('../');

var options = {
    "default": {
        sheet: 'Sheet1',
        constraints: 'constraints.js'
    },
    alias: {
        s: 'sheet',
        c: 'constraints'
    }
};

var argv = parseArgs(process.argv.slice(2), options);
var file = argv._[0];

var usage = function () {

    var use = 'valid-xl --sheet=sheetname --constraints=constraints.js file.xlsx';
    console.log(use);
};


var run = function () {

    if (argv.help) {
        usage();
        return;
    }

    if (!argv.sheet) {
        console.log('please specify a sheet to validate ...\n');
        usage();
        return;
    }

    if (!argv.constraints) {
        console.log('please specify your column constraints to validate ...\n');
        usage();
        return;
    }

    var constraints = require(argv.constraints);
    validate(file, argv.sheet, constraints).printReport();
};

run();
