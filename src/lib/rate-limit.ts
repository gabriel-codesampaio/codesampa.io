// Limite por chave (ex.: IP) em memória.
// Em serverless cada instância tem a própria memória, então isso freia abuso
// básico, mas não substitui uma regra de rate limit no Firewall da Vercel.
const hits = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Evita crescer sem limite em instâncias de vida longa
  if (hits.size > 5000) hits.clear();

  return false;
}
