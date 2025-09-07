'use client';

import { motion } from 'framer-motion';

interface SkeletonCardProps {
  variant?: 'compact' | 'detailed';
  count?: number;
}

export function SkeletonCard({ variant = 'detailed', count = 1 }: SkeletonCardProps) {
  const skeletonAnimation = {
    animate: {
      opacity: [0.4, 0.8, 0.4],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  const cyberGlow = {
    animate: {
      boxShadow: [
        '0 0 5px rgba(0, 245, 255, 0.2)',
        '0 0 15px rgba(0, 245, 255, 0.4)',
        '0 0 5px rgba(0, 245, 255, 0.2)',
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  if (variant === 'compact') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            className="nft-card"
            {...cyberGlow}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600"
                {...skeletonAnimation}
              />
              <div className="flex-1 min-w-0 space-y-2">
                <motion.div
                  className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4"
                  {...skeletonAnimation}
                />
                <motion.div
                  className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/2"
                  {...skeletonAnimation}
                />
              </div>
              <div className="text-right space-y-1">
                <motion.div
                  className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-12"
                  {...skeletonAnimation}
                />
                <motion.div
                  className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-16"
                  {...skeletonAnimation}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="nft-card hologram-effect"
          {...cyberGlow}
        >
          {/* Image Skeleton */}
          <motion.div
            className="relative w-full h-48 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 mb-4 overflow-hidden"
            {...skeletonAnimation}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <motion.div
                className="h-3 w-8 bg-gradient-to-r from-slate-600 to-slate-500 rounded"
                {...skeletonAnimation}
              />
            </div>
          </motion.div>

          <div className="space-y-3">
            {/* Title and Rarity */}
            <div className="space-y-2">
              <motion.div
                className="h-5 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-3/4"
                {...skeletonAnimation}
              />
              <div className="flex items-center justify-between">
                <motion.div
                  className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/3"
                  {...skeletonAnimation}
                />
                <motion.div
                  className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-1/4"
                  {...skeletonAnimation}
                />
              </div>
            </div>

            {/* Weapon */}
            <motion.div
              className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-2/3"
              {...skeletonAnimation}
            />

            {/* Battle Stats */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 4 }).map((_, statIndex) => (
                  <motion.div
                    key={statIndex}
                    className="flex items-center space-x-1"
                  >
                    <motion.div
                      className="w-3 h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded"
                      {...skeletonAnimation}
                    />
                    <motion.div
                      className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-12"
                      {...skeletonAnimation}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Experience Bar */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <motion.div
                    className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-16"
                    {...skeletonAnimation}
                  />
                  <motion.div
                    className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-12"
                    {...skeletonAnimation}
                  />
                </div>
                <div className="stats-bar">
                  <motion.div
                    className="h-full bg-gradient-to-r from-slate-600 to-slate-500 rounded"
                    animate={{ width: ['20%', '60%', '20%'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
}

interface SkeletonStatsProps {
  count?: number;
}

export function SkeletonStats({ count = 3 }: SkeletonStatsProps) {
  return (
    <div className="flex justify-center space-x-8 text-sm">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-2">
          <motion.div
            className="w-4 h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          />
          <motion.div
            className="h-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded w-20"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
          />
        </div>
      ))}
    </div>
  );
}
