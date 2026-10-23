"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

interface ToastItem {
  id: number;
  message: string;
  leaving: boolean;
}

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const containerStyle: CSSProperties = {
  position: "fixed",
  bottom: 24,
  right: 24,
  zIndex: 9999,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none",
};

const toastStyle: CSSProperties = {
  background: "var(--tms-slate-900)",
  color: "#ffffff",
  padding: "12px 22px",
  borderRadius: "var(--radius-full)",
  boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
  border: "1px solid rgba(20, 147, 83, 0.4)",
  fontSize: "0.875rem",
  fontWeight: 600,
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  gap: 10,
  animation: "toastSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
  transition: "all 0.3s ease",
};

const leavingStyle: CSSProperties = {
  opacity: 0,
  transform: "translateY(10px)",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const showToast = useCallback((message: string) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, message, leaving: false }]);

    window.setTimeout(() => {
      setToasts((current) =>
        current.map((toast) => (toast.id === id ? { ...toast, leaving: true } : toast))
      );
      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 300);
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={containerStyle}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            style={toast.leaving ? { ...toastStyle, ...leavingStyle } : toastStyle}
          >
            <span style={{ color: "var(--tms-green)", fontSize: "1rem" }}>●</span>{" "}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside a ToastProvider");
  }
  return context;
}
