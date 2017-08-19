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
