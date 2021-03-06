/**
Copyright (c) 2015 Yehuda Katz, Tom Dale and Ember.js contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

taken from https://github.com/emberjs/ember.js
*/

var assert = require('assert');

module.exports = function() {};

module.exports.prototype = {
  configure: function(disallowSpacesBeforeSemicolons) {
    assert(
      typeof disallowSpacesBeforeSemicolons === 'boolean',
      'disallowSpacesBeforeSemicolons option requires boolean value'
    );
    assert(
      disallowSpacesBeforeSemicolons === true,
      'disallowSpacesBeforeSemicolons option requires true value or should be removed'
    );
  },

  getOptionName: function() {
    return 'disallowSpacesBeforeSemicolons';
  },

  check: function(file, errors) {
    var lines = file.getLines();
    for (var i = 0, l = lines.length; i < l; i++) {
      if (lines[i].match(/\s+;$/)) {
        errors.add('Spaces are disallowed before semicolons.', i + 1, lines[i].length - 2);
      }
    }
  }
};
