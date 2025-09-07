'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Zap, Shield, Gauge, Heart } from 'lucide-react';
import type { NFT } from '@/lib/types';
import { getRarityColor, getElementColor } from '@/lib/utils';

interface NFTCardProps {
  nft: NFT;
  variant?: 'compact' | 'detailed';
  isSelected?: boolean;
  onSelect?: (nft: NFT) => void;
  showBattleStats?: boolean;
}

export function NFTCard({ 
  nft, 
  variant = 'detailed', 
  isSelected = false, 
  onSelect,
  showBattleStats = true 
}: NFTCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const rarity = nft.attributes.find(attr => attr.trait_type === 'Rarity')?.value as string;
  const element = nft.attributes.find(attr => attr.trait_type === 'Element')?.value as string;
  const weapon = nft.attributes.find(attr => attr.trait_type === 'Weapon')?.value as string;

  const handleClick = () => {
    if (onSelect) {
      onSelect(nft);
    }
  };

  if (variant === 'compact') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`nft-card cursor-pointer ${isSelected ? 'border-neon-purple glow-neon-purple' : ''}`}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={imageError ? '/placeholder-nft.png' : nft.image}
              alt={nft.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm truncate neon-text">{nft.name}</h3>
            <p className={`text-xs ${getRarityColor(rarity)}`}>{rarity}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Lvl {nft.battleStats.level}</div>
            <div className="text-xs text-neon-blue">{nft.battleStats.attack} ATK</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`nft-card cursor-pointer hologram-effect ${isSelected ? 'border-neon-purple glow-neon-purple' : ''}`}
      onClick={handleClick}
    >
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
        <Image
          src={imageError ? '/placeholder-nft.png' : nft.image}
          alt={nft.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          onError={() => setImageError(true)}
        />
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-bold text-white">Lvl {nft.battleStats.level}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="font-bold text-lg neon-text truncate">{nft.name}</h3>
          <div className="flex items-center justify-between text-sm">
            <span className={getRarityColor(rarity)}>{rarity}</span>
            <span className={getElementColor(element)}>{element}</span>
          </div>
        </div>

        {weapon && (
          <div className="text-sm text-gray-300">
            <span className="text-gray-500">Weapon:</span> {weapon}
          </div>
        )}

        {showBattleStats && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-neon-blue" />
                <span>ATK: {nft.battleStats.attack}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-neon-green" />
                <span>DEF: {nft.battleStats.defense}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gauge className="w-3 h-3 text-neon-orange" />
                <span>SPD: {nft.battleStats.speed}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-neon-pink" />
                <span>HP: {nft.battleStats.health}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Experience</span>
                <span>{nft.battleStats.experience}/500</span>
              </div>
              <div className="stats-bar">
                <div 
                  className="stats-fill" 
                  style={{ width: `${(nft.battleStats.experience / 500) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
