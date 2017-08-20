import { assert } from 'chai';
import * as expiration from '../src/expiration';

describe('expiration', () => {
  describe('validate', () => {
    it('should reject falsey input', () => {
      assert.isFalse(expiration.validate().isValid);
      assert.isFalse(expiration.validate('').isValid);
      assert.isFalse(expiration.validate(null).isValid);
    });

    it('should reject invalid input format', () => {
      // Too short
      assert.isFalse(expiration.validate('1234').isValid);

      // Too long
      assert.isFalse(expiration.validate('12345678').isValid);

      // Doesn't match allowed patterns
      assert.isFalse(expiration.validate('abcde').isValid);
      assert.isFalse(expiration.validate('/1/2018').isValid);

      // Month out of range
      assert.isFalse(expiration.validate('02017').isValid);
      assert.isFalse(expiration.validate('132017').isValid);
    });

    it('should accept valid input', () => {
      // No slash or dash
      assert.isTrue(expiration.validate('12017').isValid);
      assert.isTrue(expiration.validate('012017').isValid);

      // Slash
      assert.isTrue(expiration.validate('1/2017').isValid);
      assert.isTrue(expiration.validate('01/2017').isValid);

      // Dash
      assert.isTrue(expiration.validate('1-2017').isValid);
      assert.isTrue(expiration.validate('01-2017').isValid);
    });

    it('should extract the month and year from valid input', () => {
      assert.equal(expiration.validate('12017').month, 1);
      assert.equal(expiration.validate('12017').year, 2017);

      assert.equal(expiration.validate('012017').month, 1);
      assert.equal(expiration.validate('012017').year, 2017);

      assert.equal(expiration.validate('1/2017').month, 1);
      assert.equal(expiration.validate('01/2017').month, 1);
      assert.equal(expiration.validate('1/2017').year, 2017);
      assert.equal(expiration.validate('01/2017').year, 2017);

      assert.equal(expiration.validate('1-2017').month, 1);
      assert.equal(expiration.validate('01-2017').month, 1);
      assert.equal(expiration.validate('1-2017').year, 2017);
      assert.equal(expiration.validate('01-2017').year, 2017);
    });
  });

  describe('format', () => {
    it('should return the input if the input is an invalid format', () => {
      const input = 'abc';
      assert.equal(expiration.format(input), input);
    });

    it('should return a formatted expiration string from valid input', () => {
      // No slash or dash
      assert.equal(expiration.format('12017'), '01/2017');
      assert.equal(expiration.format('122017'), '12/2017');

      // Slash
      assert.equal(expiration.format('1/2017'), '01/2017');
      assert.equal(expiration.format('12/2017'), '12/2017');

      // Dash
      assert.equal(expiration.format('1-2017'), '01/2017');
      assert.equal(expiration.format('12-2017'), '12/2017');
    });
  });

  describe('mask', () => {
    it('should not add to the result unless the last character is valid', () => {
      assert.equal(expiration.mask('a'), '');
      assert.equal(expiration.mask('0a'), '0');
      assert.equal(expiration.mask('01a'), '01');
      assert.equal(expiration.mask('012a'), '012');
      assert.equal(expiration.mask('012017a'), '012017');
      assert.equal(expiration.mask('1--'), '1-');
    });

    it('should add to the result if the last character is valid', () => {
      assert.equal(expiration.mask('1'), '1');
      assert.equal(expiration.mask('12'), '12');
      assert.equal(expiration.mask('120'), '12/0');
      assert.equal(expiration.mask('1201'), '12/01');
      assert.equal(expiration.mask('12017'), '12/017');

      assert.equal(expiration.mask('01'), '01');
      assert.equal(expiration.mask('012'), '01/2');
      assert.equal(expiration.mask('0120'), '01/20');
      assert.equal(expiration.mask('01201'), '01/201');
      assert.equal(expiration.mask('012017'), '01/2017');

      assert.equal(expiration.mask('1-'), '01/');
      assert.equal(expiration.mask('2-2'), '02/2');
      assert.equal(expiration.mask('3-20'), '03/20');
      assert.equal(expiration.mask('11-201'), '11/201');
      assert.equal(expiration.mask('12-2017'), '12/2017');

      assert.equal(expiration.mask('01-'), '01/');
      assert.equal(expiration.mask('01-2'), '01/2');
      assert.equal(expiration.mask('01-20'), '01/20');
      assert.equal(expiration.mask('01-201'), '01/201');
      assert.equal(expiration.mask('01-2017'), '01/2017');

      assert.equal(expiration.mask('1/'), '01/');
      assert.equal(expiration.mask('1/2'), '01/2');
      assert.equal(expiration.mask('1/20'), '01/20');
      assert.equal(expiration.mask('1/201'), '01/201');
      assert.equal(expiration.mask('1/2017'), '01/2017');

      assert.equal(expiration.mask('01/'), '01/');
      assert.equal(expiration.mask('01/2'), '01/2');
      assert.equal(expiration.mask('01/20'), '01/20');
      assert.equal(expiration.mask('01/201'), '01/201');
      assert.equal(expiration.mask('01/2017'), '01/2017');
    });
  });
});
