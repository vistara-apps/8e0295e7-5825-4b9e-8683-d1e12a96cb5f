'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Zap } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'battle';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration (default 5 seconds)
    const duration = notification.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAll
    }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
}

function NotificationToast({ notification, onClose }: NotificationToastProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-neon-green" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-neon-orange" />;
      case 'battle':
        return <Zap className="w-5 h-5 text-neon-purple" />;
      default:
        return <Info className="w-5 h-5 text-neon-blue" />;
    }
  };

  const getColors = () => {
    switch (notification.type) {
      case 'success':
        return 'border-neon-green/50 bg-green-900/20';
      case 'error':
        return 'border-red-400/50 bg-red-900/20';
      case 'warning':
        return 'border-neon-orange/50 bg-orange-900/20';
      case 'battle':
        return 'border-neon-purple/50 bg-purple-900/20';
      default:
        return 'border-neon-blue/50 bg-blue-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`cyber-border rounded-lg p-4 backdrop-blur-sm ${getColors()}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-white mb-1">
            {notification.title}
          </h4>
          {notification.message && (
            <p className="text-sm text-gray-300">
              {notification.message}
            </p>
          )}
          {notification.action && (
            <button
              onClick={notification.action.onClick}
              className="mt-2 text-xs text-neon-blue hover:text-neon-purple transition-colors duration-200 font-medium"
            >
              {notification.action.label}
            </button>
          )}
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-slate-900 rounded"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Convenience hooks for different notification types
export function useSuccessNotification() {
  const { addNotification } = useNotifications();
  return (title: string, message?: string, action?: Notification['action']) => {
    addNotification({ type: 'success', title, message, action });
  };
}

export function useErrorNotification() {
  const { addNotification } = useNotifications();
  return (title: string, message?: string, action?: Notification['action']) => {
    addNotification({ type: 'error', title, message, action, duration: 8000 });
  };
}

export function useBattleNotification() {
  const { addNotification } = useNotifications();
  return (title: string, message?: string, action?: Notification['action']) => {
    addNotification({ type: 'battle', title, message, action, duration: 6000 });
  };
}

export function useInfoNotification() {
  const { addNotification } = useNotifications();
  return (title: string, message?: string, action?: Notification['action']) => {
    addNotification({ type: 'info', title, message, action });
  };
}
