const minLength = '12017'.length;
const maxLength = '01/2017'.length;

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

  // Must match one of the following formats:
  // myyyy, m-yyyy, m/yyyy, mmyyyy, mm-yyyy, mm/yyyy
  const patternMatch = /^([\d]{1,2})[-/]*([\d]{4})$/.exec(input);
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
