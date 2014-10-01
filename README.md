# valid-xl

A simple module and CLI for validation reporting on specified columns within an excel worksheet.

For the CLI, you pass in a file containing your column constraint functions:

    valid-xl --sheet=SheetName \
             --constraints=your.column.constraints.js file.xlsx


## Usage

    npm install -g valid-xl
    npm run test
    npm run demo
    npm run cli-demo


## Example

Using the following sample file (`sample.xlsx`) ...

![sample file](sample.png)


#### CLI

    valid-xl --sheet=Transcript \
             --constraints=sample.constraints.js sample.xlsx

Output ...

    4 invalid values

    REC 2:
      LRB = `L+ ` is an invalid value
    REC 3:
      XYZ = `q` is an invalid value
    REC 4:
      LRB = `L+R+X` is an invalid value
      XYZ = `b` is an invalid value


#### Module

The module consists of a single validation function that takes three arguments:

* path to an excel file (`sample.xlsx`)
* the name of the worksheet to be validated (**Transcript**)
* path to your column validation constraints (`sample.constraints.js`)

The worksheet to be validated should contain tabular data and column headers in the first line.  

```javascript
var validate = require('valid-xl');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    constraints = 'sample.constraints.js';

var results = validate(file, sheet, constraints);

console.log(results.report);
```

This should yield the following results:

```javascript
{ errors: 4,
  invalid: 
   { '2': [ 'LRB = `L+ ` is an invalid value' ],
     '3': [ 'XYZ = `q` is an invalid value' ],
     '4': 
      [ 'LRB = `L+R+X` is an invalid value',
        'XYZ = `b` is an invalid value' ] } }
```

The constraints file only needs to contain a constraints object with functions to check the validity of column values.  The key of each constraint function should reflect the name of the column values it validates.  See [`sample.constraints.js`](sample.constraints.js) for an example.

In the example below, we define the constraints object inline.  It contains one
column constraint function, viz., a simple constraint on valid values for the `XYZ`
column:

```javascript
var validate = require('valid-xl');

var file = 'sample.xlsx',
    sheet = 'Transcript',
    constraints = {
        XYZ: function(v) {
            if (v) {
                if (!/^[xyz]$/.test(v)) {
                    return { XYZ: v + ' is not a valid value!' };
                }
            }
        }
    };

var results = validate(file, sheet, constraints);
console.log(results.report);
```

This produces the following results:

```javascript
{
  errors: 2,
  invalid: {
    '3': [ { XYZ: "q is not a valid value!" } ],
    '4': [ { XYZ: "b is not a valid value!" } ]
  }
}
```

See [`demo.js`](demo.js) for a slight elaboration of this example.


## See Also

* [`parse-xl`](https://github.com/joyrexus/parse-xl) - parse excel worksheets 
  with column headers
* [`valid-records`](https://github.com/joyrexus/valid-records) - validate
  specified fields within a set of records (an array or js-objects or stream
  of ndjson)
