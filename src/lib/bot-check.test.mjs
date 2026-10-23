import assert from 'node:assert/strict';
import { test } from 'node:test';

import { looksLikeBot } from './bot-check.ts';

const form = (fields) => {
  const data = new FormData();
  for (const [k, v] of Object.entries(fields)) data.append(k, v);
  return data;
};

test('separa pessoa de robô pelo honeypot e pelo tempo de preenchimento', () => {
  const now = 100_000;

  // Pessoa: honeypot vazio e 5 s entre aparecer e enviar
  assert.equal(looksLikeBot(form({ company: '', rendered_at: String(now - 5000) }), now), false);

  assert.equal(looksLikeBot(form({ company: 'ACME', rendered_at: String(now - 5000) }), now), true);
  assert.equal(looksLikeBot(form({ company: '', rendered_at: String(now - 500) }), now), true);

  // Sem o carimbo ou com lixo: robô (antes passava, porque Number(null) é 0)
  assert.equal(looksLikeBot(form({ company: '' }), now), true);
  assert.equal(looksLikeBot(form({ company: '', rendered_at: 'abc' }), now), true);
});
