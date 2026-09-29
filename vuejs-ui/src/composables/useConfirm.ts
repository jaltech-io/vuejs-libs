import { ref, shallowRef } from 'vue';

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'default' | 'destructive';
}

// Singleton partagé par showConfirm() et le composant ConfirmDialog.
export const _confirmOpen = ref(false);
export const _confirmOpts = shallowRef<ConfirmOptions>({ title: '' });
let resolvePending: ((value: boolean) => void) | null = null;

export function showConfirm(options: ConfirmOptions): Promise<boolean> {
  resolvePending?.(false);
  _confirmOpts.value = options;
  _confirmOpen.value = true;

  return new Promise((resolve) => {
    resolvePending = resolve;
  });
}

export function resolveConfirm(value: boolean) {
  _confirmOpen.value = false;
  resolvePending?.(value);
  resolvePending = null;
}
