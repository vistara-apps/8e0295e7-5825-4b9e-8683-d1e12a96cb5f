'use client';

import { motion } from 'framer-motion';
import { LoadingSpinner, ProgressBar } from '@/components/LoadingStates';
import { SkeletonStats } from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 cyber-grid flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header Skeleton */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            animate={{ 
              textShadow: [
                '0 0 10px #00f5ff, 0 0 20px #00f5ff',
                '0 0 20px #bf00ff, 0 0 30px #bf00ff',
                '0 0 10px #00f5ff, 0 0 20px #00f5ff'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-green bg-clip-text text-transparent">
              TRELLENDAR ARENA
            </span>
          </motion.h1>
          <p className="text-xl text-gray-300 mb-6">Unleash Your NFTs: Battle, Earn, and Collect</p>
          
          {/* Loading Indicator */}
          <div className="mb-6">
            <LoadingSpinner 
              variant="cyber" 
              size="lg" 
              message="Initializing Arena..." 
            />
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <ProgressBar 
              progress={75} 
              variant="cyber" 
              showPercentage={true} 
            />
          </div>

          {/* Stats Skeleton */}
          <SkeletonStats count={3} />
        </motion.header>

        {/* Loading Message */}
        <div className="text-center">
          <motion.div
            className="cyber-border rounded-xl p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 max-w-md mx-auto"
            animate={{ 
              borderColor: ['rgba(0, 245, 255, 0.3)', 'rgba(191, 0, 255, 0.3)', 'rgba(0, 245, 255, 0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.p 
              className="text-neon-blue font-cyber"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Preparing your NFT battle experience...
            </motion.p>
            <motion.p 
              className="text-gray-400 text-sm mt-2"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              Loading wallet connections and battle arena
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
}
