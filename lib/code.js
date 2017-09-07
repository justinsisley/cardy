"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mask = mask;
var patterns = {
  3: /^\d{1,3}$/,
  4: /^\d{1,4}$/
};

function mask(input) {
  var maxLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;

  var patternMatch = patterns[maxLength].exec(input);

  if (!patternMatch) {
    return input.slice(0, -1);
  }

  return input;
}