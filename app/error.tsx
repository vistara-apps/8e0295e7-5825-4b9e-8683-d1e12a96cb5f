'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="cyber-border rounded-xl p-8 bg-gradient-to-r from-red-900/20 to-pink-900/20 text-center max-w-md"
      >
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <AlertTriangle className="w-16 h-16 text-neon-pink mx-auto mb-4" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-neon-pink mb-4">
          Arena Malfunction!
        </h2>
        
        <p className="text-gray-300 mb-6">
          Something went wrong in the battle arena. Our technicians are working to fix the issue.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={reset}
          className="cyber-button"
        >
          <RefreshCw className="w-5 h-5 inline mr-2" />
          Restart Arena
        </motion.button>
        
        {error.digest && (
          <p className="text-xs text-gray-500 mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
