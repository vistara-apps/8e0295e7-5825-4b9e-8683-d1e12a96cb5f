'use client';

import { motion } from 'framer-motion';
import { Trophy, Award, RotateCcw, ArrowLeft } from 'lucide-react';
import { NFTCard } from './NFTCard';
import type { NFT, BattleResult } from '@/lib/types';

interface ResultDisplayProps {
  result: BattleResult;
  winner: NFT;
  loser: NFT;
  onPlayAgain: () => void;
  onBackToSelection: () => void;
}

export function ResultDisplay({ 
  result, 
  winner, 
  loser, 
  onPlayAgain, 
  onBackToSelection 
}: ResultDisplayProps) {
  const isVictory = result === 'win';
  const isDraw = result === 'draw';

  const getResultConfig = () => {
    if (isDraw) {
      return {
        title: 'DRAW!',
        subtitle: 'An evenly matched battle!',
        color: 'text-neon-orange',
        icon: Award,
        bgGradient: 'from-orange-500/20 to-yellow-500/20',
      };
    } else if (isVictory) {
      return {
        title: 'VICTORY!',
        subtitle: 'You emerged triumphant!',
        color: 'text-neon-green',
        icon: Trophy,
        bgGradient: 'from-green-500/20 to-emerald-500/20',
      };
    } else {
      return {
        title: 'DEFEAT',
        subtitle: 'Better luck next time!',
        color: 'text-neon-pink',
        icon: Award,
        bgGradient: 'from-red-500/20 to-pink-500/20',
      };
    }
  };

  const config = getResultConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`cyber-border rounded-xl p-6 bg-gradient-to-br ${config.bgGradient} backdrop-blur-sm`}
    >
      {/* Result Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-4"
        >
          <IconComponent className={`w-16 h-16 mx-auto ${config.color}`} />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-3xl font-bold ${config.color} mb-2`}
        >
          {config.title}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300"
        >
          {config.subtitle}
        </motion.p>
      </div>

      {/* Battle Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Winner</div>
          <NFTCard nft={winner} variant="compact" showBattleStats={false} />
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Opponent</div>
          <NFTCard nft={loser} variant="compact" showBattleStats={false} />
        </div>
      </div>

      {/* Rewards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="cyber-border rounded-lg p-4 mb-6 bg-black/30"
      >
        <h3 className="text-lg font-bold text-neon-blue mb-3">Battle Rewards</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Experience Gained:</span>
            <span className="text-neon-green">+{isVictory ? 50 : 10} XP</span>
          </div>
          {isVictory && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-400">Battle Points:</span>
                <span className="text-neon-blue">+25 BP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Arena Coins:</span>
                <span className="text-neon-purple">+100 AC</span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="flex-1 cyber-button"
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Battle Again
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBackToSelection}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 inline mr-2" />
          New Match
        </motion.button>
      </div>
    </motion.div>
  );
}
