'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Trophy, Target, TrendingUp } from 'lucide-react';
import { NFTCard } from './NFTCard';
import { StatsBar } from './StatsBar';
import type { NFT, User as UserType } from '@/lib/types';

interface NFTPortfolioProps {
  user: UserType;
  nfts: NFT[];
  onSelectNFT: (nft: NFT) => void;
}

export function NFTPortfolio({ user, nfts, onSelectNFT }: NFTPortfolioProps) {
  const [selectedTab, setSelectedTab] = useState<'nfts' | 'stats'>('nfts');

  const winRate = user.totalBattles > 0 ? (user.wins / user.totalBattles) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* User Profile Header */}
      <div className="cyber-border rounded-xl p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold neon-text">Arena Fighter</h2>
            <p className="text-gray-400">Level {user.level} Warrior</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="cyber-border rounded-lg p-3 bg-black/30">
            <Trophy className="w-6 h-6 text-neon-green mx-auto mb-1" />
            <div className="text-xl font-bold text-neon-green">{user.wins}</div>
            <div className="text-xs text-gray-400">Victories</div>
          </div>
          <div className="cyber-border rounded-lg p-3 bg-black/30">
            <Target className="w-6 h-6 text-neon-blue mx-auto mb-1" />
            <div className="text-xl font-bold text-neon-blue">{user.totalBattles}</div>
            <div className="text-xs text-gray-400">Battles</div>
          </div>
          <div className="cyber-border rounded-lg p-3 bg-black/30">
            <TrendingUp className="w-6 h-6 text-neon-purple mx-auto mb-1" />
            <div className="text-xl font-bold text-neon-purple">{winRate.toFixed(1)}%</div>
            <div className="text-xs text-gray-400">Win Rate</div>
          </div>
        </div>

        <div className="mt-4">
          <StatsBar
            current={user.experience}
            max={1000}
            color="neon-purple"
            showLabel={true}
            label="Experience to Next Level"
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-black/30 rounded-lg p-1">
        <button
          onClick={() => setSelectedTab('nfts')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            selectedTab === 'nfts'
              ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          My NFTs ({nfts.length})
        </button>
        <button
          onClick={() => setSelectedTab('stats')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
            selectedTab === 'stats'
              ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Battle Stats
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {selectedTab === 'nfts' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold neon-text">Select Your Fighter</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nfts.map((nft) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  variant="detailed"
                  onSelect={onSelectNFT}
                />
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'stats' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold neon-text">Battle Statistics</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="cyber-border rounded-lg p-4 bg-black/30">
                <h4 className="font-bold text-neon-blue mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Win Rate</span>
                      <span>{winRate.toFixed(1)}%</span>
                    </div>
                    <StatsBar current={winRate} max={100} color="neon-green" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Battle Experience</span>
                      <span>{user.totalBattles}/100</span>
                    </div>
                    <StatsBar current={user.totalBattles} max={100} color="neon-blue" />
                  </div>
                </div>
              </div>

              <div className="cyber-border rounded-lg p-4 bg-black/30">
                <h4 className="font-bold text-neon-purple mb-3">Recent Activity</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Battle:</span>
                    <span className="text-neon-green">Victory vs Cyber Warrior</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Longest Win Streak:</span>
                    <span className="text-neon-blue">5 battles</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Favorite NFT:</span>
                    <span className="text-neon-purple">{nfts[0]?.name || 'None'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
