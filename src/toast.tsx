import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';

export interface Toast {
  id: number;
  message: string;
  actionLabel?: string;
  actionHref?: string;
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, actionLabel?: string, actionHref?: string) => void;
  dismissToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, actionLabel?: string, actionHref?: string) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, message, actionLabel, actionHref }]);
      setTimeout(() => dismissToast(id), 3500);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
