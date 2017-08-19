import { assert } from 'chai';
import * as number from '../src/number';

describe('number', () => {
  describe('validate', () => {
    it('should reject falsey input', () => {
      assert.isFalse(number.validate().isValid);
      assert.isFalse(number.validate('').isValid);
      assert.isFalse(number.validate(null).isValid);
    });

    it('should reject invalid input format', () => {
      assert.isFalse(number.validate('1234').isValid);
      assert.isFalse(number.validate('123456789').isValid);
      assert.isFalse(number.validate('abcde').isValid);
    });

    it('should determine if a number is potentially valid', () => {
      // Visa
      assert.isTrue(number.validate('4111').isPotentiallyValid);

      // MasterCard
      assert.isTrue(number.validate('5500 0000').isPotentiallyValid);

      // American Express
      assert.isTrue(number.validate('3400 0000 0000').isPotentiallyValid);
    });

    it('should accept valid input', () => {
      // Visa
      assert.isTrue(number.validate('4111 1111 1111 1111').isValid);

      // MasterCard
      assert.isTrue(number.validate('5500 0000 0000 0004').isValid);

      // American Express
      assert.isTrue(number.validate('3400 000000 00009').isValid);
    });

    it('should return the card type from valid input', () => {
      // Visa
      assert.equal(number.validate('4111 1111 1111 1111').type, 'visa');
      assert.equal(number.validate('4111 1111 1111 1111').niceType, 'Visa');

      // MasterCard
      assert.equal(number.validate('5500 0000 0000 0004').type, 'master-card');
      assert.equal(number.validate('5500 0000 0000 0004').niceType, 'MasterCard');

      // American Express
      assert.equal(number.validate('3400 000000 00009').type, 'american-express');
      assert.equal(number.validate('3400 000000 00009').niceType, 'American Express');
    });

    it('should return the security code name and size from valid input', () => {
      // Visa
      assert.equal(number.validate('4111 1111 1111 1111').codeName, 'CVV');
      assert.equal(number.validate('4111 1111 1111 1111').codeSize, 3);

      // MasterCard
      assert.equal(number.validate('5500 0000 0000 0004').codeName, 'CVC');
      assert.equal(number.validate('5500 0000 0000 0004').codeSize, 3);

      // American Express
      assert.equal(number.validate('3400 000000 00009').codeName, 'CID');
      assert.equal(number.validate('3400 000000 00009').codeSize, 4);
    });
  });

  describe('format', () => {
    it('should return the input if the input is an invalid format', () => {
      const input = 'abc';
      assert.equal(number.format(input), input);
    });

    it('should return a formatted number string from valid input', () => {
      assert.equal(number.format('4111111111111111'), '4111 1111 1111 1111');
      assert.equal(number.format('5500000000000004'), '5500 0000 0000 0004');
      assert.equal(number.format('340000000000009'), '3400 000000 00009');
    });
  });
});
