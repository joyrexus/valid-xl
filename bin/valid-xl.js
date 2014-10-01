#!/usr/bin/env node
'use strict';

var parseArgs = require('minimist');
var validate = require('../');

var options = {
    "default": {
        sheet: 'Sheet1',
        schema: 'schema.js'
    },
    alias: {
        s: 'sheet',
        r: 'rules',
        rules: 'schema'
    }
};

var argv = parseArgs(process.argv.slice(2), options);
var file = argv._[0];

var usage = function () {

    var use = 'valid-xl --sheet=sheetname --schema=schema.js file.xlsx';
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

    if (!argv.schema) {
        console.log('please specify your validation schema ...\n');
        usage();
        return;
    }

    var schema = require(argv.schema);
    validate(file, argv.sheet, schema).printReport();
};

run();
