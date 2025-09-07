import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.h2
          animate={{ 
            textShadow: [
              '0 0 10px #00f5ff',
              '0 0 20px #bf00ff',
              '0 0 10px #00f5ff'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-bold text-neon-blue mb-2"
        >
          Loading Arena...
        </motion.h2>
        <p className="text-gray-400">Preparing your NFT battle experience</p>
      </div>
    </div>
  );
}
