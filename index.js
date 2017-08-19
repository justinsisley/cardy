'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function formatExpiration(input) {
  var cardExpiration = input.replace(/\/{2,}/g, '/');

  if (cardExpiration.length > 2 && cardExpiration.indexOf('/') === -1) {
    var split = cardExpiration.split('');
    split.splice(2, 0, '/');
    cardExpiration = split.join('');
  }

  return cardExpiration;
}

function validateExpiration(input) {
  var result = {
    month: null,
    year: null,
    isValid: false
  };

  var _input$split = input.split('/'),
      _input$split2 = _slicedToArray(_input$split, 2),
      month = _input$split2[0],
      year = _input$split2[1];

  month = parseInt(month.trim(), 10);
  year = parseInt(year.trim(), 10);

  result.month = month;
  result.year = year;

  // Out of range month
  if (month < 1 || month > 12) {
    return result;
  }

  // Out of range year
  if (year < 2017 || year > 2100) {
    return result;
  }

  result.isValid = true;

  return result;
}

exports.default = {
  formatExpiration: formatExpiration,
  validateExpiration: validateExpiration
};
