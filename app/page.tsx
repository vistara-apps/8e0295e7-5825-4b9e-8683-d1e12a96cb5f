'use client';

import { useState, useEffect } from 'react';

// Disable static generation for this page
export const dynamic = 'force-dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
// import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Swords, Zap, Trophy, Users } from 'lucide-react';
import { NFTPortfolio } from '@/components/NFTPortfolio';
import { BattleArena } from '@/components/BattleArena';
import { MOCK_NFTS } from '@/lib/constants';
import type { NFT, User, GameState } from '@/lib/types';

export default function TrellendarArena() {
  // const { setFrameReady } = useMiniKit();
  const [gameState, setGameState] = useState<GameState>({
    currentBattle: null,
    selectedNFT: null,
    opponent: null,
    isInBattle: false,
    battlePhase: 'selection',
  });

  const [user] = useState<User>({
    farcasterId: 'demo-user',
    connectedWalletAddress: '0x1234...5678',
    registeredNFTs: ['1', '2', '3'],
    wins: 12,
    losses: 3,
    totalBattles: 15,
    level: 5,
    experience: 750,
  });

  const [userNFTs] = useState<NFT[]>(MOCK_NFTS);
  const [availableOpponents] = useState<NFT[]>(MOCK_NFTS.slice(1));

  // useEffect(() => {
  //   setFrameReady();
  // }, [setFrameReady]);

  const handleSelectNFT = (nft: NFT) => {
    setGameState(prev => ({
      ...prev,
      selectedNFT: nft,
      battlePhase: 'selection',
    }));
  };

  const handleStartBattle = (opponent: NFT) => {
    if (!gameState.selectedNFT) return;
    
    setGameState(prev => ({
      ...prev,
      opponent,
      isInBattle: true,
      battlePhase: 'battle',
    }));
  };

  const handleBattleComplete = (winner: NFT, loser: NFT) => {
    // Update user stats (in a real app, this would be saved to database)
    console.log('Battle completed:', { winner: winner.name, loser: loser.name });
  };

  const handleBackToSelection = () => {
    setGameState(prev => ({
      ...prev,
      selectedNFT: null,
      opponent: null,
      isInBattle: false,
      battlePhase: 'selection',
    }));
  };

  const handleFindOpponent = () => {
    if (!gameState.selectedNFT) return;
    
    // Simple matchmaking - select random opponent
    const randomOpponent = availableOpponents[Math.floor(Math.random() * availableOpponents.length)];
    handleStartBattle(randomOpponent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 cyber-grid">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
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
          
          {/* Wallet Connection */}
          <div className="flex justify-center mb-6">
            <Wallet>
              <ConnectWallet className="cyber-button">
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>

          {/* Stats Bar */}
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-neon-blue" />
              <span>1,247 Active Fighters</span>
            </div>
            <div className="flex items-center space-x-2">
              <Swords className="w-4 h-4 text-neon-purple" />
              <span>8,932 Battles Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-neon-green" />
              <span>156 Champions</span>
            </div>
          </div>
        </motion.header>

        {/* Main Game Area */}
        <AnimatePresence mode="wait">
          {!gameState.isInBattle ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <NFTPortfolio
                user={user}
                nfts={userNFTs}
                onSelectNFT={handleSelectNFT}
              />

              {/* Battle Initiation */}
              {gameState.selectedNFT && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <div className="cyber-border rounded-xl p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                    <h3 className="text-2xl font-bold neon-text mb-4">
                      {gameState.selectedNFT.name} is Ready for Battle!
                    </h3>
                    <p className="text-gray-300 mb-6">
                      Find an opponent and prove your NFT's worth in the arena.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleFindOpponent}
                      className="cyber-button text-lg px-8 py-4"
                    >
                      <Zap className="w-6 h-6 inline mr-2" />
                      FIND OPPONENT
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="battle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              {gameState.selectedNFT && gameState.opponent && (
                <BattleArena
                  playerNFT={gameState.selectedNFT}
                  opponentNFT={gameState.opponent}
                  onBattleComplete={handleBattleComplete}
                  onBackToSelection={handleBackToSelection}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-400 text-sm"
        >
          <p>Powered by Base • Built for Farcaster</p>
          <p className="mt-2">Join the ultimate NFT battle experience</p>
        </motion.footer>
      </div>
    </div>
  );
}
