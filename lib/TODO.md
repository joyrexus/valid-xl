Make `parse.js` a standalone module `parse-xlsx`.  It should provide a write
stream of line-delimited json formatted rows/records, with column names as
keys.

`valid.js` should have be filter/transform stream that takes a stream of
records and emits a stream of invalid status records.
