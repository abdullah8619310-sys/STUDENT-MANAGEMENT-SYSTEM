import { useCallback, useRef, useState } from 'react';
import { ToastContext } from './ToastContext.js';
import ToastViewport from '../components/Toast/ToastViewport.jsx';

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = 'error') => {
      idRef.current += 1;
      const id = idRef.current;

      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => dismissToast(id), 5000);
    },
    [dismissToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}
