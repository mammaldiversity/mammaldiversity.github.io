var test = require('tape');
var n = require('../js/names.js');

// see https://www.npmjs.com/package/tape for example on how to write unit tests

test('sample test', function (t) {
    t.plan(1);
    t.equal(1, 1);
});


test('original name combination with underscore', function (t) {
    t.plan(1);
    var actual = n.describeOriginalName('Donald_duckus'); 
    t.equal(actual, "<b>Original name as described:</b> <i>Donald duckus</i>"); 
});

test('original name combination without underscore', function (t) {
    t.plan(1);
    var actual = n.describeOriginalName('Donald duckus'); 
    t.equal(actual, "<b>Original name as described:</b> <i>Donald duckus</i>"); 
});


test('original name just one word', function (t) {
    t.plan(1);
    var actual = n.describeOriginalName('Donald'); 
    t.equal(actual, "<b>Original name as described:</b> <i>Donald</i>"); 
});

test('null original name', function (t) {
    t.plan(1);
    var actual = n.describeOriginalName(null); 
    t.equal(actual, "Name is as originally described."); 
});

test('empty original name', function (t) {
    t.plan(1);
    var actual = n.describeOriginalName("");
    t.equal(actual, "Name is as originally described.");                
});

