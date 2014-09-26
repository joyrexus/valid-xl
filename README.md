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

    LINE 4:
      LRB = `L+ ` is an invalid value
    LINE 5:
      XYZ = `q` is an invalid value
    LINE 6:
      LRB = `L+R+X` is an invalid value
      XYZ = `b` is an invalid value


#### Module

```javascript
var validate = require('valid-xlsx');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    columns = ['LRB', 'XYZ'];

var report = validate(file, sheet, columns).report;

console.log(report);
```

Output ...

```javascript
{ errors: 4,
  file: 'sample.xlsx',
  sheet: 'Transcript',
  invalid: 
   { '2': [ 'LRB = `L+ ` is an invalid value' ],
     '3': [ 'XYZ = `q` is an invalid value' ],
     '4': 
      [ 'LRB = `L+R+X` is an invalid value',
        'XYZ = `b` is an invalid value' ] } }
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
