'use client';

import { motion } from 'framer-motion';
import { Loader2, Zap } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'cyber' | 'battle';
  message?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  message 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  if (variant === 'cyber') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className={`${sizeClasses[size]} relative`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-neon-blue opacity-20"></div>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-neon-blue"></div>
          <div className="absolute inset-1 rounded-full border border-neon-purple opacity-40"></div>
        </motion.div>
        {message && (
          <motion.p 
            className="text-neon-blue text-sm font-cyber"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'battle') {
    return (
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          className="relative"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Zap className={`${sizeClasses[size]} text-neon-blue`} />
          <motion.div
            className="absolute inset-0 rounded-full bg-neon-blue opacity-20"
            animate={{ scale: [1, 2, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
        {message && (
          <p className="text-neon-blue text-sm font-cyber text-center">
            {message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-neon-blue`} />
      {message && (
        <p className="text-gray-400 text-sm">{message}</p>
      )}
    </div>
  );
}

interface ProgressBarProps {
  progress: number;
  variant?: 'default' | 'cyber';
  showPercentage?: boolean;
}

export function ProgressBar({ 
  progress, 
  variant = 'default',
  showPercentage = false 
}: ProgressBarProps) {
  if (variant === 'cyber') {
    return (
      <div className="w-full space-y-2">
        <div className="relative h-3 rounded-full overflow-hidden cyber-border">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ 
              boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
              filter: 'drop-shadow(0 0 5px rgba(0, 245, 255, 0.3))'
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ width: '20%' }}
          />
        </div>
        {showPercentage && (
          <div className="text-center text-neon-blue text-sm font-cyber">
            {Math.round(progress)}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <motion.div
        className="bg-neon-blue h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}

interface PulseLoaderProps {
  count?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function PulseLoader({ count = 3, size = 'md' }: PulseLoaderProps) {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className="flex space-x-2">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} bg-neon-blue rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
}
