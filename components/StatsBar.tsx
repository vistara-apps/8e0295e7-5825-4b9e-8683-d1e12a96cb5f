'use client';

import { motion } from 'framer-motion';

interface StatsBarProps {
  current: number;
  max: number;
  variant?: 'horizontal' | 'vertical';
  color?: 'neon-blue' | 'neon-purple' | 'neon-green' | 'neon-orange' | 'neon-pink';
  showLabel?: boolean;
  label?: string;
}

export function StatsBar({ 
  current, 
  max, 
  variant = 'horizontal',
  color = 'neon-blue',
  showLabel = false,
  label 
}: StatsBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'neon-blue':
        return 'from-neon-blue to-blue-400';
      case 'neon-purple':
        return 'from-neon-purple to-purple-400';
      case 'neon-green':
        return 'from-neon-green to-green-400';
      case 'neon-orange':
        return 'from-neon-orange to-orange-400';
      case 'neon-pink':
        return 'from-neon-pink to-pink-400';
      default:
        return 'from-neon-blue to-blue-400';
    }
  };

  if (variant === 'vertical') {
    return (
      <div className="flex flex-col items-center space-y-2">
        {showLabel && label && (
          <span className="text-xs text-gray-400">{label}</span>
        )}
        <div className="w-4 h-20 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
          <motion.div
            className={`w-full bg-gradient-to-t ${getColorClasses(color)} rounded-full`}
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{ 
              boxShadow: `0 0 10px rgba(0, 245, 255, 0.5)`,
              filter: 'drop-shadow(0 0 5px currentColor)'
            }}
          />
        </div>
        <span className="text-xs text-gray-300">{current}/{max}</span>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {showLabel && label && (
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">{label}</span>
          <span className="text-gray-300">{current}/{max}</span>
        </div>
      )}
      <div className="stats-bar">
        <motion.div
          className={`stats-fill bg-gradient-to-r ${getColorClasses(color)}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ 
            boxShadow: `0 0 10px rgba(0, 245, 255, 0.5)`,
            filter: 'drop-shadow(0 0 5px currentColor)'
          }}
        />
      </div>
    </div>
  );
}
