'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.format = format;

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