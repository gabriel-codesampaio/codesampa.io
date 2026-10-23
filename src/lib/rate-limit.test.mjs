import assert from 'node:assert/strict';
import { test } from 'node:test';

import { isRateLimited } from './rate-limit.ts';

test('bloqueia depois do limite e libera quando a janela passa', (t) => {
  t.mock.timers.enable({ apis: ['Date'], now: 0 });
  const key = 'newsletter:1.2.3.4';

  assert.equal(isRateLimited(key, 3, 1000), false);
  assert.equal(isRateLimited(key, 3, 1000), false);
  assert.equal(isRateLimited(key, 3, 1000), false);
  assert.equal(isRateLimited(key, 3, 1000), true);

  // Outro IP não é afetado
  assert.equal(isRateLimited('newsletter:5.6.7.8', 3, 1000), false);

  t.mock.timers.tick(1001);
  assert.equal(isRateLimited(key, 3, 1000), false);
});
