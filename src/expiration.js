const minLength = '12017'.length;
const maxLength = '01/2017'.length;

// myyyy, m-yyyy, m/yyyy, mmyyyy, mm-yyyy, mm/yyyy
const allowedPattern = /^([\d]{1,2})[-/]?([\d]{4})$/;
const potentialMatchPattern = /^([\d]{1,2})([-/])?([\d]{1,4})*$/;

export function validate(input) {
  const result = {
    month: undefined,
    year: undefined,
    isValid: false,
  };

  // Input can't be falsey
  if (!input) { return result; }

  // Enforce input length
  if (input.length < minLength || input.length > maxLength) {
    return result;
  }

  // Must match one of the allowed patterns
  const patternMatch = allowedPattern.exec(input);
  if (!patternMatch) {
    return result;
  }

  const month = parseInt(patternMatch[1], 10);
  const year = parseInt(patternMatch[2], 10);

  // Month out of range
  if (month < 1 || month > 12) {
    return result;
  }

  result.month = month;
  result.year = year;

  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

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

export function format(input) {
  const validated = validate(input);
  const { isValid, year } = validated;
  let { month } = validated;

  // Not valid, just return the original input
  if (!isValid) {
    return input;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${month}/${year}`;
}

export function mask(input) {
  const patternMatch = potentialMatchPattern.exec(input);

  if (!patternMatch) {
    return input.slice(0, -1);
  }

  const month = patternMatch[1];
  const delimiter = patternMatch[2];
  const year = patternMatch[3];

  let fullMonth = month;
  if (delimiter && month.length < 2) {
    fullMonth = `0${month}`;
  }

  if (!year) {
    return `${fullMonth}${delimiter ? '/' : ''}`;
  }

  if (year.length > 0) {
    return `${fullMonth}/${year}`;
  }

  return input.replace('-', '/');
}
