'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Wifi, WifiOff } from 'lucide-react';

interface ErrorStateProps {
  title: string;
  message: string;
  type?: 'error' | 'warning' | 'network' | 'notFound';
  actionLabel?: string;
  onAction?: () => void;
  showRetry?: boolean;
  onRetry?: () => void;
}

export function ErrorState({
  title,
  message,
  type = 'error',
  actionLabel,
  onAction,
  showRetry = true,
  onRetry
}: ErrorStateProps) {
  const getIcon = () => {
    switch (type) {
      case 'network':
        return <WifiOff className="w-16 h-16 text-neon-orange" />;
      case 'notFound':
        return <Home className="w-16 h-16 text-neon-blue" />;
      case 'warning':
        return <AlertTriangle className="w-16 h-16 text-neon-orange" />;
      default:
        return <AlertTriangle className="w-16 h-16 text-red-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'network':
        return 'border-neon-orange/50 bg-orange-900/20';
      case 'notFound':
        return 'border-neon-blue/50 bg-blue-900/20';
      case 'warning':
        return 'border-neon-orange/50 bg-orange-900/20';
      default:
        return 'border-red-400/50 bg-red-900/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 cyber-grid flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`cyber-border rounded-xl p-8 max-w-md w-full text-center ${getColors()}`}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: type === 'error' ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          {getIcon()}
        </motion.div>

        <h1 className="text-2xl font-bold neon-text mb-4">
          {title}
        </h1>

        <p className="text-gray-300 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="space-y-4">
          {showRetry && onRetry && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRetry}
              className="cyber-button w-full focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <RefreshCw className="w-5 h-5 inline mr-2" />
              Try Again
            </motion.button>
          )}

          {actionLabel && onAction && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAction}
              className="w-full px-6 py-3 border border-neon-blue text-neon-blue rounded-lg hover:bg-neon-blue hover:text-slate-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              {actionLabel}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

interface NetworkErrorProps {
  onRetry?: () => void;
}

export function NetworkError({ onRetry }: NetworkErrorProps) {
  return (
    <ErrorState
      type="network"
      title="Connection Lost"
      message="Unable to connect to the Trellendar Arena servers. Please check your internet connection and try again."
      onRetry={onRetry}
      actionLabel="Check Network Status"
      onAction={() => {
        // Open network diagnostics or settings
        if (typeof window !== 'undefined') {
          window.open('https://www.google.com', '_blank');
        }
      }}
    />
  );
}

interface WalletErrorProps {
  onRetry?: () => void;
  onGoHome?: () => void;
}

export function WalletError({ onRetry, onGoHome }: WalletErrorProps) {
  return (
    <ErrorState
      type="warning"
      title="Wallet Connection Failed"
      message="We couldn't connect to your wallet. Make sure you have a compatible wallet installed and try connecting again."
      onRetry={onRetry}
      actionLabel="Go to Home"
      onAction={onGoHome}
    />
  );
}

interface NotFoundErrorProps {
  onGoHome?: () => void;
}

export function NotFoundError({ onGoHome }: NotFoundErrorProps) {
  return (
    <ErrorState
      type="notFound"
      title="Arena Not Found"
      message="The battle arena you're looking for doesn't exist or has been moved. Let's get you back to the main arena."
      showRetry={false}
      actionLabel="Return to Arena"
      onAction={onGoHome}
    />
  );
}

interface BattleErrorProps {
  onRetry?: () => void;
  onGoBack?: () => void;
}

export function BattleError({ onRetry, onGoBack }: BattleErrorProps) {
  return (
    <ErrorState
      type="error"
      title="Battle System Error"
      message="Something went wrong during the battle. Your NFTs are safe, but we need to restart the battle system."
      onRetry={onRetry}
      actionLabel="Back to Selection"
      onAction={onGoBack}
    />
  );
}

// Inline error component for smaller errors
interface InlineErrorProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function InlineError({ message, onRetry, className = '' }: InlineErrorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`cyber-border rounded-lg p-4 bg-red-900/20 border-red-400/50 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-200">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-red-400 hover:text-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded p-1"
            aria-label="Retry action"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
