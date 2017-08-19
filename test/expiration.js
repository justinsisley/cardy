import { assert } from 'chai';
import * as expiration from '../lib/expiration';

describe('expiration', () => {
  it('should expose a "validate" function', () => {
    assert.isDefined(expiration.validate);
  });

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
      assert.equal(expiration.format('012017'), '01/2017');

      // Slash
      assert.equal(expiration.format('1/2017'), '01/2017');
      assert.equal(expiration.format('01/2017'), '01/2017');

      // Dash
      assert.equal(expiration.format('1-2017'), '01/2017');
      assert.equal(expiration.format('01-2017'), '01/2017');
    });
  });
});
