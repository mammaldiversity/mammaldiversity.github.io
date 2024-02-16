var test = require('tape');
var permalink = require('../js/permalink.js');

// see https://www.npmjs.com/package/tape for example on how to write unit tests

test('sample test', function (t) {
    t.plan(1);
    t.equal(1, 1);
});


test('permalink no hash', function (t) {
    t.plan(1);
    var actual = permalink('https://example.org/', { id: 1234, genus: "Donald", specificEpithet: "duckus"} ); 
    t.equal(actual, "https://example.org/#genus=Donald&species=duckus&id=1234"); 
});

test('permalink with existing hash', function (t) {
    t.plan(1);
    var actual = permalink('https://example.org/#foo', { id: 1234, genus: "Donald", specificEpithet: "duckus"} ); 
    t.equal(actual, "https://example.org/#genus=Donald&species=duckus&id=1234"); 
});
