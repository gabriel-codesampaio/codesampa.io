import { notFound } from 'next/navigation';

// Captura URLs desconhecidas (ex.: /pt-BR/qualquer-coisa) para mostrar a 404 traduzida
export default function CatchAllPage() {
  notFound();
}
