<p align="center">
  <img alt="cardy" src="https://image.flaticon.com/icons/svg/138/138287.svg" width="144">
</p>

<h3 align="center">
  cardy
</h3>

<p align="center">
  A credit card utility belt for browser and Node.js apps
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/cardy"><img src="https://img.shields.io/npm/v/cardy.svg?style=flat"></a> <a href="https://github.com/justinsisley/cardy/blob/master/license"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat"></a>
  <a href="https://travis-ci.org/justinsisley/cardy"><img src="https://travis-ci.org/justinsisley/cardy.svg?branch=master&style=flat"></a> <a href="https://www.npmjs.com/package/cardy"><img src="https://img.shields.io/npm/dm/cardy.svg?style=flat"></a>
  <a href="https://david-dm.org/justinsisley/cardy"><img src="https://david-dm.org/justinsisley/cardy/status.svg?style=flat"></a> <a href="https://david-dm.org/justinsisley/cardy?type=dev"><img src="https://david-dm.org/justinsisley/cardy/dev-status.svg?style=flat"></a>
</p>

#### <a href="https://htmlpreview.github.io/?https://github.com/justinsisley/cardy/blob/master/docs/index.html">Try out the demo</a>

## Installation

```bash
npm install cardy
```

## Usage

### Browser (ES6)

#### Validation

```javascript
import cardy from 'cardy';

// Validate a card number
const numberValidationResult = cardy.number.validate('4111111111111111');

// Validate an expiration date
const expirationValidationResult = cardy.expiration.validate('01/2020');
```

#### Formatting

```javascript
import cardy from 'cardy';

// Format a card number
const formattedNumber = cardy.number.format('4111111111111111');

// Format an expiration date
const formattedExpiration = cardy.expiration.format('01/2020');
```

#### Input Masking

```javascript
import cardy from 'cardy';

// Credit card input field in your app
const numberInput = document.querySelector('#card-number-input');

numberInput.addEventListener('input', (e) => {
  numberInput.value = cardy.number.mask(numberInput.value);
});

// Expiration date input field in your app
const expirationInput = document.querySelector('#card-expiration-input');

expirationInput.addEventListener('input', (e) => {
  expirationInput.value = cardy.expiration.mask(expirationInput.value);
});
```

### Node.js

#### Validation

```javascript
const cardy = require('cardy');

// Validate a card number
const numberValidationResult = cardy.number.validate('4111111111111111');

// Validate an expiration date
const expirationValidationResult = cardy.expiration.validate('01/2020');
```

#### Formatting

```javascript
const cardy = require('cardy');

// Format a card number
const formattedNumber = cardy.number.format('4111111111111111');

// Format an expiration date
const formattedExpiration = cardy.expiration.format('01/2020');
```

## Credits

- Depends on [card-validator](https://github.com/braintree/card-validator)
- Icon by [Flaticon](http://www.flaticon.com/)