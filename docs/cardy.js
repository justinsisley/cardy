var cardy = (function () {
'use strict';

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var expiration = createCommonjsModule(function (module, exports) {
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
});

unwrapExports(expiration);

/*
 * Luhn algorithm implementation in JavaScript
 * Copyright (c) 2009 Nicholas C. Zakas
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';

function luhn10(identifier) {
  var sum = 0;
  var alt = false;
  var i = identifier.length - 1;
  var num;

  while (i >= 0) {
    num = parseInt(identifier.charAt(i), 10);

    if (alt) {
      num *= 2;
      if (num > 9) {
        num = (num % 10) + 1; // eslint-disable-line no-extra-parens
      }
    }

    alt = !alt;

    sum += num;

    i--;
  }

  return sum % 10 === 0;
}

var luhn10_1 = luhn10;

'use strict';

var types = {};
var VISA = 'visa';
var MASTERCARD = 'master-card';
var AMERICAN_EXPRESS = 'american-express';
var DINERS_CLUB = 'diners-club';
var DISCOVER = 'discover';
var JCB = 'jcb';
var UNIONPAY = 'unionpay';
var MAESTRO = 'maestro';
var CVV = 'CVV';
var CID = 'CID';
var CVC = 'CVC';
var CVN = 'CVN';
var testOrder = [
  VISA,
  MASTERCARD,
  AMERICAN_EXPRESS,
  DINERS_CLUB,
  DISCOVER,
  JCB,
  UNIONPAY,
  MAESTRO
];

function clone(x) {
  var prefixPattern, exactPattern, dupe;

  if (!x) { return null; }

  // TODO: in the next major version, we should
  // consider removing these pattern properties.
  // They are not useful extnerally and can be
  // confusing because the exactPattern does not
  // always match (for instance, Maestro cards
  // can start with 62, but the exact pattern
  // does not include that since it would
  // exclude UnionPay and Discover cards
  // when it is not sure whether or not
  // the card is a UnionPay, Discover or
  // Maestro card).
  prefixPattern = x.prefixPattern.source;
  exactPattern = x.exactPattern.source;
  dupe = JSON.parse(JSON.stringify(x));
  dupe.prefixPattern = prefixPattern;
  dupe.exactPattern = exactPattern;

  return dupe;
}

types[VISA] = {
  niceType: 'Visa',
  type: VISA,
  prefixPattern: /^4$/,
  exactPattern: /^4\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[MASTERCARD] = {
  niceType: 'MasterCard',
  type: MASTERCARD,
  prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
  exactPattern: /^(5[1-5]|222[1-9]|2[3-6]|27[0-1]|2720)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVC,
    size: 3
  }
};

types[AMERICAN_EXPRESS] = {
  niceType: 'American Express',
  type: AMERICAN_EXPRESS,
  prefixPattern: /^(3|34|37)$/,
  exactPattern: /^3[47]\d*$/,
  isAmex: true,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: CID,
    size: 4
  }
};

types[DINERS_CLUB] = {
  niceType: 'Diners Club',
  type: DINERS_CLUB,
  prefixPattern: /^(3|3[0689]|30[0-5])$/,
  exactPattern: /^3(0[0-5]|[689])\d*$/,
  gaps: [4, 10],
  lengths: [14, 16, 19],
  code: {
    name: CVV,
    size: 3
  }
};

types[DISCOVER] = {
  niceType: 'Discover',
  type: DISCOVER,
  prefixPattern: /^(6|60|601|6011|65|64|64[4-9])$/,
  exactPattern: /^(6011|65|64[4-9])\d*$/,
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: CID,
    size: 3
  }
};

types[JCB] = {
  niceType: 'JCB',
  type: JCB,
  prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
  exactPattern: /^(2131|1800|35)\d*$/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: CVV,
    size: 3
  }
};

types[UNIONPAY] = {
  niceType: 'UnionPay',
  type: UNIONPAY,
  prefixPattern: /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[02,06,07]|628(?!0|1)|629[1,2])|622018)$/,
  exactPattern: /^(((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[02,06,07]|628(?!0|1)|629[1,2]))\d*|622018\d{12})$/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: CVN,
    size: 3
  }
};

types[MAESTRO] = {
  niceType: 'Maestro',
  type: MAESTRO,
  prefixPattern: /^(5|5[06-9]|6\d*)$/,
  exactPattern: /^(5[06-9]|6[37])\d*$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: CVC,
    size: 3
  }
};

function creditCardType(cardNumber) {
  var type, value, i;
  var prefixResults = [];
  var exactResults = [];

  if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
    return [];
  }

  for (i = 0; i < testOrder.length; i++) {
    type = testOrder[i];
    value = types[type];

    if (cardNumber.length === 0) {
      prefixResults.push(clone(value));
      continue;
    }

    if (value.exactPattern.test(cardNumber)) {
      exactResults.push(clone(value));
    } else if (value.prefixPattern.test(cardNumber)) {
      prefixResults.push(clone(value));
    }
  }

  return exactResults.length ? exactResults : prefixResults;
}

creditCardType.getTypeInfo = function (type) {
  return clone(types[type]);
};

creditCardType.types = {
  VISA: VISA,
  MASTERCARD: MASTERCARD,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS,
  DINERS_CLUB: DINERS_CLUB,
  DISCOVER: DISCOVER,
  JCB: JCB,
  UNIONPAY: UNIONPAY,
  MAESTRO: MAESTRO
};

var creditCardType_1 = creditCardType;

'use strict';




function verification(card, isPotentiallyValid, isValid) {
  return {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid};
}

function cardNumber(value) {
  var potentialTypes, cardType, isPotentiallyValid, isValid, i, maxLength;

  if (typeof value === 'number') {
    value = String(value);
  }

  if (typeof value !== 'string') { return verification(null, false, false); }

  value = value.replace(/\-|\s/g, '');

  if (!/^\d*$/.test(value)) { return verification(null, false, false); }

  potentialTypes = creditCardType_1(value);

  if (potentialTypes.length === 0) {
    return verification(null, false, false);
  } else if (potentialTypes.length !== 1) {
    return verification(null, true, false);
  }

  cardType = potentialTypes[0];

  if (cardType.type === 'unionpay') {  // UnionPay is not Luhn 10 compliant
    isValid = true;
  } else {
    isValid = luhn10_1(value);
  }

  maxLength = Math.max.apply(null, cardType.lengths);

  for (i = 0; i < cardType.lengths.length; i++) {
    if (cardType.lengths[i] === value.length) {
      isPotentiallyValid = value.length !== maxLength || isValid;
      return verification(cardType, isPotentiallyValid, isValid);
    }
  }

  return verification(cardType, value.length < maxLength, false);
}

var cardNumber_1 = cardNumber;

'use strict';

var maxYear = 19;

function verification$2(isValid, isPotentiallyValid, isCurrentYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isCurrentYear: isCurrentYear || false
  };
}

function expirationYear(value) {
  var currentFirstTwo, currentYear, firstTwo, len, twoDigitYear, valid, isCurrentYear;

  if (typeof value !== 'string') {
    return verification$2(false, false);
  }
  if (value.replace(/\s/g, '') === '') {
    return verification$2(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification$2(false, false);
  }

  len = value.length;

  if (len < 2) {
    return verification$2(false, true);
  }

  currentYear = new Date().getFullYear();

  if (len === 3) {
    // 20x === 20x
    firstTwo = value.slice(0, 2);
    currentFirstTwo = String(currentYear).slice(0, 2);
    return verification$2(false, firstTwo === currentFirstTwo);
  }

  if (len > 4) {
    return verification$2(false, false);
  }

  value = parseInt(value, 10);
  twoDigitYear = Number(String(currentYear).substr(2, 2));

  if (len === 2) {
    isCurrentYear = twoDigitYear === value;
    valid = value >= twoDigitYear && value <= twoDigitYear + maxYear;
  } else if (len === 4) {
    isCurrentYear = currentYear === value;
    valid = value >= currentYear && value <= currentYear + maxYear;
  }

  return verification$2(valid, valid, isCurrentYear);
}

var expirationYear_1 = expirationYear;

'use strict';

// Polyfill taken from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill>.

var isArray = Array.isArray || function (arg) {
  return Object.prototype.toString.call(arg) === '[object Array]';
};

'use strict';




function parseDate(value) {
  var month, len, year, yearValid;

  if (/\//.test(value)) {
    value = value.split(/\s*\/\s*/g);
  } else if (/\s/.test(value)) {
    value = value.split(/ +/g);
  }

  if (isArray(value)) {
    return {
      month: value[0],
      year: value.slice(1).join()
    };
  }

  len = value[0] === '0' || value.length > 5 ? 2 : 1;

  if (value[0] === '1') {
    year = value.substr(1);
    yearValid = expirationYear_1(year);
    if (!yearValid.isPotentiallyValid) {
      len = 2;
    }
  }

  month = value.substr(0, len);

  return {
    month: month,
    year: value.substr(month.length)
  };
}

var parseDate_1 = parseDate;

'use strict';

function verification$3(isValid, isPotentiallyValid, isValidForThisYear) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    isValidForThisYear: isValidForThisYear || false
  };
}

function expirationMonth(value) {
  var month, result;
  var currentMonth = new Date().getMonth() + 1;

  if (typeof value !== 'string') {
    return verification$3(false, false);
  }
  if (value.replace(/\s/g, '') === '' || value === '0') {
    return verification$3(false, true);
  }
  if (!/^\d*$/.test(value)) {
    return verification$3(false, false);
  }

  month = parseInt(value, 10);

  if (isNaN(value)) {
    return verification$3(false, false);
  }

  result = month > 0 && month < 13;

  return verification$3(result, result, result && month >= currentMonth);
}

var expirationMonth_1 = expirationMonth;

'use strict';





function verification$1(isValid, isPotentiallyValid, month, year) {
  return {
    isValid: isValid,
    isPotentiallyValid: isPotentiallyValid,
    month: month,
    year: year
  };
}

function expirationDate(value) {
  var date, monthValid, yearValid, isValidForThisYear;

  if (typeof value === 'string') {
    value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
    date = parseDate_1(value);
  } else if (value !== null && typeof value === 'object') {
    date = {
      month: String(value.month),
      year: String(value.year)
    };
  } else {
    return verification$1(false, false, null, null);
  }

  monthValid = expirationMonth_1(date.month);
  yearValid = expirationYear_1(date.year);

  if (monthValid.isValid) {
    if (yearValid.isCurrentYear) {
      isValidForThisYear = monthValid.isValidForThisYear;
      return verification$1(isValidForThisYear, isValidForThisYear, date.month, date.year);
    }

    if (yearValid.isValid) {
      return verification$1(true, true, date.month, date.year);
    }
  }

  if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
    return verification$1(false, true, null, null);
  }

  return verification$1(false, false, null, null);
}

var expirationDate_1 = expirationDate;

'use strict';

var DEFAULT_LENGTH = 3;

function includes(array, thing) {
  var i = 0;

  for (; i < array.length; i++) {
    if (thing === array[i]) { return true; }
  }

  return false;
}

function max(array) {
  var maximum = DEFAULT_LENGTH;
  var i = 0;

  for (; i < array.length; i++) {
    maximum = array[i] > maximum ? array[i] : maximum;
  }

  return maximum;
}

function verification$4(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function cvv(value, maxLength) {
  maxLength = maxLength || DEFAULT_LENGTH;
  maxLength = maxLength instanceof Array ? maxLength : [maxLength];

  if (typeof value !== 'string') { return verification$4(false, false); }
  if (!/^\d*$/.test(value)) { return verification$4(false, false); }
  if (includes(maxLength, value.length)) { return verification$4(true, true); }
  if (value.length < Math.min.apply(null, maxLength)) { return verification$4(false, true); }
  if (value.length > max(maxLength)) { return verification$4(false, false); }

  return verification$4(true, true);
}

var cvv_1 = cvv;

'use strict';

var DEFAULT_MIN_POSTAL_CODE_LENGTH = 3;

function verification$5(isValid, isPotentiallyValid) {
  return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
}

function postalCode(value, options) {
  var minLength;

  options = options || {};

  minLength = options.minLength || DEFAULT_MIN_POSTAL_CODE_LENGTH;

  if (typeof value !== 'string') {
    return verification$5(false, false);
  } else if (value.length < minLength) {
    return verification$5(false, true);
  }

  return verification$5(true, true);
}

var postalCode_1 = postalCode;

'use strict';

var cardValidator = {
  number: cardNumber_1,
  expirationDate: expirationDate_1,
  expirationMonth: expirationMonth_1,
  expirationYear: expirationYear_1,
  cvv: cvv_1,
  postalCode: postalCode_1
};

var number = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;
exports.format = format;
exports.mask = mask;



var _cardValidator2 = _interopRequireDefault(cardValidator);

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

  if (cardValidatorResult.card) {
    result.type = cardValidatorResult.card.type;
    result.niceType = cardValidatorResult.card.niceType;

    result.codeName = cardValidatorResult.card.code.name;
    result.codeSize = cardValidatorResult.card.code.size;
  }

  if (!cardValidatorResult.isValid) {
    return result;
  }

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
});

unwrapExports(number);

var code = createCommonjsModule(function (module, exports) {
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
});

unwrapExports(code);

var lib = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var expiration$$1 = _interopRequireWildcard(expiration);



var number$$1 = _interopRequireWildcard(number);



var code$$1 = _interopRequireWildcard(code);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  expiration: expiration$$1,
  number: number$$1,
  code: code$$1
};
});

var index = unwrapExports(lib);

return index;

}());
