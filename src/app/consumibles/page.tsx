import { redirect } from 'next/navigation';

// Hoy el catálogo de consumibles es una sola ficha (fibras VPG): se abre directamente.
export default function ConsumiblesPage() {
  redirect('/consumibles/fibras-quirurgicas-vpg');
}
