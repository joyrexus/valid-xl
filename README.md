# valid-xlsx

A simple module and CLI for validation reporting on specified columns within an excel worksheet.

    validate --sheet=SHEET --columns=COL1,COL2,COL3 FILE.xlsx

You'll need to put the validation logic for any columns you want to check in `lib/valid.js`.


## Usage

    npm install -g valid-xlsx
    npm run test
    npm run demo
    npm run cli-demo


## Example

Using the following sample file (`sample.xlsx`) ...

![sample file](sample.png)


#### CLI

    validate --sheet=Transcript --columns=LRB,XYZ sample.xlsx

Output ...

    4 invalid values in `sample.xlsx:Transcript`

    ROW 21:
      LRB = `L+ ` is an invalid value
    ROW 31:
      XYZ = `q` is an invalid value
    ROW 41:
      LRB = `L+R+X` is an invalid value
      XYZ = `b` is an invalid value


#### Module

```javascript
var validate = require('valid-xlsx');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    columns = ['LRB', 'XYZ'];

var report = validate(file, sheet, columns);

console.log(report);
```

Output ...

```javascript
{ file: 'sample.xlsx',
  rows: 
   [ { _ID: '22', ROW: '1', LRB: 'L', XYZ: 'x' },
     { _ID: '22', ROW: '2', LRB: 'L+L', XYZ: 'y' },
     { _ID: '22', ROW: '3', LRB: 'L+ ', XYZ: 'z' },
     { _ID: '22', ROW: '4', LRB: 'L+R+B', XYZ: 'q' },
     { _ID: '22', ROW: '5', LRB: 'L+R+X', XYZ: 'b' } ],
  report: 
   { errors: 4,
     file: 'sample.xlsx',
     sheet: 'Transcript',
     invalid: { '2': [Object], '3': [Object], '4': [Object] } } }

```


## Validation

You'll need to put the validation logic for any columns you want to check in `lib/valid.js`.

For example, here's how you could check whether an `XYZ` column only contains an `x`, `y`, or `z`:

```javascript
module.exports.XYZ = function(v) {
    column = 'XYZ';
    if (v) {
        if (!/^[xyz]$/.test(v)) {
            return invalidReply(column, v, 'is an invalid value')
        }
    }
};
```

Note that the parser assumes that the first line of each worksheet is a header line containing column names.  Each validation function should have the same name as the column being validated.
