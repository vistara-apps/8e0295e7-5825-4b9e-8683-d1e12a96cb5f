'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Trophy, Zap } from 'lucide-react';
import { NFTCard } from './NFTCard';
import { StatsBar } from './StatsBar';
import { ResultDisplay } from './ResultDisplay';
import type { NFT, Battle, BattleAction } from '@/lib/types';
import { simulateBattle, getRandomBattleMessage } from '@/lib/utils';

interface BattleArenaProps {
  playerNFT: NFT;
  opponentNFT: NFT;
  onBattleComplete: (winner: NFT, loser: NFT) => void;
  onBackToSelection: () => void;
}

export function BattleArena({ 
  playerNFT, 
  opponentNFT, 
  onBattleComplete, 
  onBackToSelection 
}: BattleArenaProps) {
  const [battlePhase, setBattlePhase] = useState<'ready' | 'fighting' | 'result'>('ready');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [opponentHealth, setOpponentHealth] = useState(100);
  const [currentAction, setCurrentAction] = useState<string>('');
  const [battleResult, setBattleResult] = useState<{ winner: NFT; loser: NFT } | null>(null);
  const [battleLog, setBattleLog] = useState<BattleAction[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const startBattle = () => {
    setBattlePhase('fighting');
    const result = simulateBattle(playerNFT, opponentNFT);
    setBattleResult({ winner: result.winner, loser: result.loser });
    setBattleLog(result.battleLog);
    setCurrentLogIndex(0);
    
    // Animate battle sequence
    animateBattleSequence(result.battleLog);
  };

  const animateBattleSequence = async (log: BattleAction[]) => {
    for (let i = 0; i < log.length; i++) {
      const action = log[i];
      
      // Show action message
      const attackerName = action.attacker === playerNFT.id ? playerNFT.name : opponentNFT.name;
      const defenderName = action.defender === playerNFT.id ? playerNFT.name : opponentNFT.name;
      
      setCurrentAction(getRandomBattleMessage('ATTACK', attackerName, defenderName));
      setCurrentLogIndex(i);
      
      // Update health bars
      if (action.defender === playerNFT.id) {
        setPlayerHealth(action.remainingHealth);
      } else {
        setOpponentHealth(action.remainingHealth);
      }
      
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Show final result
    setBattlePhase('result');
    if (battleResult) {
      onBattleComplete(battleResult.winner, battleResult.loser);
    }
  };

  const resetBattle = () => {
    setBattlePhase('ready');
    setPlayerHealth(100);
    setOpponentHealth(100);
    setCurrentAction('');
    setBattleResult(null);
    setBattleLog([]);
    setCurrentLogIndex(0);
  };

  return (
    <div className="battle-arena p-6 cyber-grid">
      <div className="relative z-10">
        {/* Battle Header */}
        <div className="text-center mb-6">
          <motion.h2 
            className="text-3xl font-bold neon-text mb-2"
            animate={{ textShadow: ['0 0 10px currentColor', '0 0 20px currentColor', '0 0 10px currentColor'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            BATTLE ARENA
          </motion.h2>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Swords className="w-4 h-4" />
            <span>Turn-Based Combat</span>
          </div>
        </div>

        {/* Battle Stage */}
        <div className="relative mb-6">
          <div className="grid grid-cols-2 gap-8 items-center">
            {/* Player NFT */}
            <div className="text-center">
              <motion.div
                animate={battlePhase === 'fighting' ? { x: [0, 10, 0] } : {}}
                transition={{ duration: 0.5, repeat: battlePhase === 'fighting' ? Infinity : 0 }}
              >
                <NFTCard nft={playerNFT} variant="compact" showBattleStats={false} />
              </motion.div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Health</span>
                  <span>{playerHealth}/100</span>
                </div>
                <StatsBar 
                  current={playerHealth} 
                  max={100} 
                  variant="horizontal"
                  color="neon-blue"
                />
              </div>
            </div>

            {/* VS Indicator */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="bg-gradient-to-r from-neon-blue to-neon-purple rounded-full p-4"
                animate={{ 
                  scale: battlePhase === 'fighting' ? [1, 1.2, 1] : 1,
                  rotate: battlePhase === 'fighting' ? [0, 180, 360] : 0
                }}
                transition={{ duration: 1, repeat: battlePhase === 'fighting' ? Infinity : 0 }}
              >
                <Swords className="w-6 h-6 text-white" />
              </motion.div>
            </div>

            {/* Opponent NFT */}
            <div className="text-center">
              <motion.div
                animate={battlePhase === 'fighting' ? { x: [0, -10, 0] } : {}}
                transition={{ duration: 0.5, repeat: battlePhase === 'fighting' ? Infinity : 0 }}
              >
                <NFTCard nft={opponentNFT} variant="compact" showBattleStats={false} />
              </motion.div>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Health</span>
                  <span>{opponentHealth}/100</span>
                </div>
                <StatsBar 
                  current={opponentHealth} 
                  max={100} 
                  variant="horizontal"
                  color="neon-purple"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Battle Action Display */}
        <AnimatePresence>
          {currentAction && battlePhase === 'fighting' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-6"
            >
              <div className="cyber-border rounded-lg p-4 bg-black/30">
                <p className="text-neon-blue font-bold">{currentAction}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Battle Controls */}
        <div className="text-center space-y-4">
          {battlePhase === 'ready' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startBattle}
              className="cyber-button focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label={`Start battle between ${playerNFT.name} and ${opponentNFT.name}`}
            >
              <Zap className="w-5 h-5 inline mr-2" aria-hidden="true" />
              START BATTLE
            </motion.button>
          )}

          {battlePhase === 'fighting' && (
            <div className="cyber-border rounded-lg p-4 bg-black/30">
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-neon-blue border-t-transparent"></div>
                <span className="text-neon-blue">Battle in progress...</span>
              </div>
            </div>
          )}

          {battlePhase === 'result' && battleResult && (
            <ResultDisplay
              result={battleResult.winner.id === playerNFT.id ? 'win' : 'loss'}
              winner={battleResult.winner}
              loser={battleResult.loser}
              onPlayAgain={resetBattle}
              onBackToSelection={onBackToSelection}
            />
          )}
        </div>

        {/* Back Button */}
        {battlePhase === 'ready' && (
          <div className="text-center mt-6">
            <button
              onClick={onBackToSelection}
              className="text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1"
              aria-label="Go back to NFT selection screen"
            >
              ← Back to Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
