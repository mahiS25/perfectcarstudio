import { Link } from 'react-router-dom';
import { useToast } from '../toast';
import { CheckCircle2 } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[80] flex flex-col gap-2 items-center w-full max-w-sm px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto w-full flex items-center gap-3 rounded-xl bg-charcoal-900 text-cream-50 px-4 py-3 shadow-xl animate-toast-in"
        >
          <CheckCircle2 className="w-5 h-5 text-leaf-400 shrink-0" />
          <span className="flex-1 text-sm font-medium">{t.message}</span>
          {t.actionLabel && t.actionHref && (
            <Link
              to={t.actionHref}
              onClick={() => dismissToast(t.id)}
              className="text-saffron-300 text-sm font-semibold hover:text-saffron-200 transition shrink-0"
            >
              {t.actionLabel}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
