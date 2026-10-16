// Array reordenado para ordem Anti-Horária iniciando em ~11h
// Sequência: 11h -> 9h -> 8h -> 6h -> 4h -> 3h -> 1h

export const codeSymbols = [
  // 1. Topo Esquerdo (~11h) - Ponto de Partida
  {
    id: 1,
    char: '{ }',
    depth: 1,
    top: '20%',
    left: '10%',
    size: 'text-2xl md:text-4xl',
    color: 'text-primary-text/30'
  },
  // 2. Meio Esquerdo Superior (~9h)
  {
    id: 6,
    char: '=>',
    depth: 1.2,
    top: '30%',
    left: '5%',
    size: 'text-lg md:text-3xl',
    color: 'text-fuchsia-500/30'
  },
  // 3. Meio Esquerdo Inferior (~8h)
  {
    id: 3,
    char: 'npm',
    depth: 0.5,
    top: '60%',
    left: '5%',
    size: 'text-xs md:text-xl',
    color: 'text-slate-700'
  },
  // 4. Baixo Centro (~6h)
  {
    id: 7,
    char: ';',
    depth: 0.3,
    top: '80%',
    left: '40%',
    size: 'text-3xl md:text-6xl',
    color: 'text-slate-800'
  },
  // 5. Baixo Direito (~4h)
  {
    id: 4,
    char: '&&',
    depth: 1.5,
    top: '70%',
    left: '85%',
    size: 'text-2xl md:text-5xl',
    color: 'text-blue-500/20'
  },
  // 6. Meio Direito (~3h)
  {
    id: 5,
    char: 'div',
    depth: 0.8,
    top: '40%',
    left: '90%',
    size: 'text-sm md:text-2xl',
    color: 'text-slate-600'
  },
  // 7. Topo Direito (~1h) - Fim do ciclo
  {
    id: 2,
    char: '</>',
    depth: 2,
    top: '15%',
    left: '80%',
    size: 'text-3xl md:text-6xl',
    color: 'text-blue-500/20'
  }
];
