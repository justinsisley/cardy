import cardValidator from 'card-validator';

export function validate(input) {
  const result = {
    type: undefined,
    niceType: undefined,
    codeName: undefined,
    codeSize: undefined,
    isPotentiallyValid: false,
    isValid: false,
  };

  const cardValidatorResult = cardValidator.number(input);

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

export function format(input) {
  const cardValidatorResult = cardValidator.number(input);

  // Not valid, just return the original input
  if (!cardValidatorResult.isValid) {
    return input;
  }

  const { gaps } = cardValidatorResult.card;

  const condensed = input.replace(/\W/g, '');
  const split = condensed.split('');

  gaps.forEach((gap, index) => {
    split.splice(gap + index, 0, ' ');
  });

  return split.join('');
}

export function mask(input) {
  const cardValidatorResult = cardValidator.number(input);

  if (!cardValidatorResult.isPotentiallyValid) {
    return input.slice(0, -1);
  }

  if (!cardValidatorResult.card) {
    return input;
  }

  const { gaps } = cardValidatorResult.card;

  const condensed = input.replace(/\W/g, '');
  const split = condensed.split('');

  gaps.forEach((gap, index) => {
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
