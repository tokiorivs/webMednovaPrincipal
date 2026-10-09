import 'server-only';
import { createHash, randomInt } from 'node:crypto';

// Sin 0/O/1/I/L para que los códigos impresos no se confundan.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function pick(alphabet: string, length: number): string {
  let out = '';
  for (let i = 0; i < length; i++) out += alphabet[randomInt(alphabet.length)];
  return out;
}

export function generateRecoveryCodes(count = 10): string[] {
  return Array.from({ length: count }, () => `${pick(CODE_ALPHABET, 5)}-${pick(CODE_ALPHABET, 5)}`);
}

export function normalizeRecoveryCode(code: string): string {
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// Los códigos tienen ~50 bits de entropía y un solo uso: un SHA-256 es suficiente.
export function hashRecoveryCode(code: string): string {
  return createHash('sha256').update(normalizeRecoveryCode(code)).digest('hex');
}

export function generateTempPassword(): string {
  const upper = 'ABCDEFGHJKMNPQRSTUVWXYZ';
  const lower = 'abcdefghijkmnpqrstuvwxyz';
  const digits = '23456789';
  const parts = [pick(upper, 4), pick(lower, 6), pick(digits, 4), pick('-_.!', 2)];
  // Mezcla simple (Fisher-Yates) de los caracteres.
  const chars = parts.join('').split('');
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
