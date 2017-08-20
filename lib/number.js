'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.format = format;
exports.mask = mask;

var _cardValidator = require('card-validator');

var _cardValidator2 = _interopRequireDefault(_cardValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(input) {
  var result = {
    type: undefined,
    niceType: undefined,
    codeName: undefined,
    codeSize: undefined,
    isPotentiallyValid: false,
    isValid: false
  };

  var cardValidatorResult = _cardValidator2.default.number(input);

  result.isPotentiallyValid = cardValidatorResult.isPotentiallyValid;

  if (!cardValidatorResult.isValid) {
    return result;
  }

  result.type = cardValidatorResult.card.type;
  result.niceType = cardValidatorResult.card.niceType;

  result.codeName = cardValidatorResult.card.code.name;
  result.codeSize = cardValidatorResult.card.code.size;

  result.isValid = true;

  return result;
}

function format(input) {
  var cardValidatorResult = _cardValidator2.default.number(input);

  // Not valid, just return the original input
  if (!cardValidatorResult.isValid) {
    return input;
  }

  var gaps = cardValidatorResult.card.gaps;


  var condensed = input.replace(/\W/g, '');
  var split = condensed.split('');

  gaps.forEach(function (gap, index) {
    split.splice(gap + index, 0, ' ');
  });

  return split.join('');
}

function mask(input) {
  var cardValidatorResult = _cardValidator2.default.number(input);

  if (!cardValidatorResult.isPotentiallyValid) {
    return input.slice(0, -1);
  }

  if (!cardValidatorResult.card) {
    return input;
  }

  var gaps = cardValidatorResult.card.gaps;


  var condensed = input.replace(/\W/g, '');
  var split = condensed.split('');

  gaps.forEach(function (gap, index) {
    if (split.length > gap + index) {
      split.splice(gap + index, 0, ' ');
    }
  });

  // Input was already valid, with appropriate spacing, so return it
  if (input.trim() === split.join('')) {
    return input;
  }

  return split.join('');
}