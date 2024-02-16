var test = require('tape');
var p = require('../js/permalink.js');

// see https://www.npmjs.com/package/tape for example on how to write unit tests

test('sample test', function (t) {
    t.plan(1);
    t.equal(1, 1);
});


test('permalink no hash', function (t) {
    t.plan(1);
    var actual = p.permalinkFor('https://example.org/', { id: 1234, genus: "Donald", specificEpithet: "duckus"} ); 
    t.equal(actual, "https://example.org/#id=1234"); 
});

test('permalink with existing hash', function (t) {
    t.plan(1);
    var actual = p.permalinkFor('https://example.org/#foo', { id: 1234, genus: "Donald", specificEpithet: "duckus"} ); 
    t.equal(actual, "https://example.org/#id=1234"); 
});

test('permalink null string', function (t) {
    t.plan(1);
    var actual = p.permalinkFor(null, { id: 1234, genus: "Donald", specificEpithet: "duckus"} ); 
    t.equal(actual, "#id=1234"); 
});


test('permalink empty speciesData', function (t) {
    t.plan(1);
    var actual = p.permalinkFor('https://example.org', {} ); 
    t.equal(actual, "https://example.org"); 
});


test('species id for permalink', function (t) {
    t.plan(1);
    var actual = p.speciesIdFor('https://example.org#id=11234', {} ); 
    t.equal(actual, "11234"); 
});

test('no species id', function (t) {
    t.plan(1);
    var actual = p.speciesIdFor('https://example.org#id=invalid1234', {} ); 
    t.equal(actual, undefined); 
});
