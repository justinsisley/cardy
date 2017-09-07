import { assert } from 'chai';
import * as code from '../src/code';

describe('code', () => {
  describe('mask', () => {
    it('should not add to the result unless the last character is valid', () => {
      assert.equal(code.mask(' '), '');
      assert.equal(code.mask('a'), '');
      assert.equal(code.mask('1a'), '1');
      assert.equal(code.mask('11a'), '11');
      assert.equal(code.mask('111a'), '111');
      assert.equal(code.mask('1111a'), '1111');
      assert.equal(code.mask('11111'), '1111');
    });

    it('should add to the result if the last character is valid', () => {
      assert.equal(code.mask('1'), '1');
      assert.equal(code.mask('11'), '11');
      assert.equal(code.mask('111'), '111');
      assert.equal(code.mask('1111'), '1111');
    });

    it('should encorce an optional `maxLength`', () => {
      assert.equal(code.mask('1111', 3), '111');
      assert.equal(code.mask('11111', 4), '1111');
    });
  });
});
