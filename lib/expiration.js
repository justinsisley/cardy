'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.format = format;
var minLength = '12017'.length;
var maxLength = '01/2017'.length;

function validate(input) {
  var result = {
    month: undefined,
    year: undefined,
    isValid: false
  };

  // Input can't be falsey
  if (!input) {
    return result;
  }

  // Enforce input length
  if (input.length < minLength || input.length > maxLength) {
    return result;
  }

  // Must match one of the following formats:
  // myyyy, m-yyyy, m/yyyy, mmyyyy, mm-yyyy, mm/yyyy
  var patternMatch = /^([\d]{1,2})[-/]*([\d]{4})$/.exec(input);
  if (!patternMatch) {
    return result;
  }

  var month = parseInt(patternMatch[1], 10);
  var year = parseInt(patternMatch[2], 10);

  // Month out of range
  if (month < 1 || month > 12) {
    return result;
  }

  result.month = month;
  result.year = year;
  result.isValid = true;

  return result;
}

function format(input) {
  var validated = validate(input);
  var isValid = validated.isValid,
      year = validated.year;
  var month = validated.month;

  // Not valid, just return the original input

  if (!isValid) {
    return input;
  }

  if (month < 10) {
    month = '0' + month;
  }

  return month + '/' + year;
}