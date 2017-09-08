'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.format = format;
exports.mask = mask;
var minLength = '12017'.length;
var maxLength = '01/2017'.length;

// myyyy, m-yyyy, m/yyyy, mmyyyy, mm-yyyy, mm/yyyy
var allowedPattern = /^([\d]{1,2})[-/]?([\d]{4})$/;
var potentialMatchPattern = /^([\d]{1,2})([-/])?([\d]{1,4})*$/;

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

  // Must match one of the allowed patterns
  var patternMatch = allowedPattern.exec(input);
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

  var date = new Date();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth() + 1;

  // Year is in the past
  if (year < currentYear) {
    return result;
  }

  // Expired some time during the current year
  if (year === currentYear && month < currentMonth) {
    return result;
  }

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

function mask(input) {
  var patternMatch = potentialMatchPattern.exec(input);

  if (!patternMatch) {
    return input.slice(0, -1);
  }

  var month = patternMatch[1];
  var delimiter = patternMatch[2];
  var year = patternMatch[3];

  var fullMonth = month;
  if (delimiter && month.length < 2) {
    fullMonth = '0' + month;
  }

  if (!year) {
    return '' + fullMonth + (delimiter ? '/' : '');
  }

  if (year.length > 0) {
    return fullMonth + '/' + year;
  }

  return input.replace('-', '/');
}