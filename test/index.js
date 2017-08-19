import { assert } from 'chai';
import index from '../src/index';

describe('cardy', () => {
  it('should export an "expiration" property', () => {
    assert.isDefined(index.expiration);
  });
});
