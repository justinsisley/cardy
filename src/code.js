const patterns = {
  3: /^\d{1,3}$/,
  4: /^\d{1,4}$/,
};

export function mask(input, maxLength = 4) {
  const patternMatch = patterns[maxLength].exec(input);

  if (!patternMatch) {
    return input.slice(0, -1);
  }

  return input;
}
