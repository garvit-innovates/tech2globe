import { createContext, useContext, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

const ToastContext = createContext(null);

function ToastItem({ toast, onDismiss }) {
  const isSuccess = toast.type === "success";

  return (
    <div className="animate-slideIn rounded-2xl border border-borderSoft bg-white p-4 shadow-card">
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 rounded-full p-2 ${
            isSuccess ? "bg-green-50 text-success" : "bg-red-50 text-danger"
          }`}
        >
          {isSuccess ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-sm font-semibold text-textMain">
            {isSuccess ? "Success" : "Something went wrong"}
          </p>
          <p className="mt-1 text-sm text-slate-600">{toast.message}</p>
        </div>
        <button
          type="button"
          onClick={() => onDismiss(toast.id)}
          className="rounded-full p-1 text-slate-400 transition hover:bg-secondaryBg hover:text-textMain"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const showToast = (message, type = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => dismissToast(id), 4000);
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6 sm:top-6">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider.");
  }

  return context;
}
