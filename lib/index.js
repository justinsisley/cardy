function formatExpiration(input) {
  let cardExpiration = input.replace(/\/{2,}/g, '/');

  if (cardExpiration.length > 2 && cardExpiration.indexOf('/') === -1) {
    const split = cardExpiration.split('');
    split.splice(2, 0, '/');
    cardExpiration = split.join('');
  }

  return cardExpiration;
}

function validateExpiration(input) {
  const result = {
    month: null,
    year: null,
    isValid: false,
  };

  let [month, year] = input.split('/');

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

export default {
  formatExpiration,
  validateExpiration,
};
