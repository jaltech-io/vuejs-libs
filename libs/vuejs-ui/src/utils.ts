import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Fusionne les classes conditionnelles et résout les conflits Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Détecte les plateformes Apple sans accéder à navigator pendant le SSR. */
export function getIsMacOS() {
  return typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

/** Initiales (1-2 lettres) à partir d'un nom complet, pour un avatar de repli. */
export function getInitials(name: string | null | undefined): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
}
