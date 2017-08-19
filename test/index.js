import { assert } from 'chai';
import index from '../lib/index';

describe('cardy', () => {
  it('should export an "expiration" property', () => {
    assert.isDefined(index.expiration);
  });
});
