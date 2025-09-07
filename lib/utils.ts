import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BATTLE_CONFIG, RARITY_MULTIPLIERS, BATTLE_MESSAGES } from './constants';
import type { NFT, BattleStats, BattleAction, BattleResult } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateBattleStats(nft: NFT): BattleStats {
  const baseStats = nft.battleStats;
  const rarity = nft.attributes.find(attr => attr.trait_type === 'Rarity')?.value as string;
  const multiplier = RARITY_MULTIPLIERS[rarity?.toLowerCase() as keyof typeof RARITY_MULTIPLIERS] || 1.0;
  
  return {
    ...baseStats,
    attack: Math.floor(baseStats.attack * multiplier),
    defense: Math.floor(baseStats.defense * multiplier),
    speed: Math.floor(baseStats.speed * multiplier),
    health: BATTLE_CONFIG.MAX_HEALTH,
  };
}

export function calculateDamage(attacker: BattleStats, defender: BattleStats): number {
  const baseDamage = BATTLE_CONFIG.BASE_ATTACK_DAMAGE;
  const attackBonus = (attacker.attack / 100) * baseDamage;
  const defenseReduction = (defender.defense / 100) * BATTLE_CONFIG.BASE_DEFENSE_REDUCTION * baseDamage;
  const levelBonus = attacker.level * BATTLE_CONFIG.LEVEL_MULTIPLIER * baseDamage;
  
  const totalDamage = Math.max(1, Math.floor(baseDamage + attackBonus + levelBonus - defenseReduction));
  
  // Critical hit chance based on speed difference
  const speedDiff = attacker.speed - defender.speed;
  const critChance = Math.max(0, speedDiff / 200); // Max 50% crit chance
  const isCritical = Math.random() < critChance;
  
  return isCritical ? Math.floor(totalDamage * 1.5) : totalDamage;
}

export function simulateBattle(nft1: NFT, nft2: NFT): {
  winner: NFT;
  loser: NFT;
  battleLog: BattleAction[];
  result: BattleResult;
} {
  const stats1 = calculateBattleStats(nft1);
  const stats2 = calculateBattleStats(nft2);
  
  let health1 = stats1.health;
  let health2 = stats2.health;
  
  const battleLog: BattleAction[] = [];
  let turn = 1;
  
  // Determine turn order based on speed
  const firstAttacker = stats1.speed >= stats2.speed ? { nft: nft1, stats: stats1 } : { nft: nft2, stats: stats2 };
  const secondAttacker = stats1.speed >= stats2.speed ? { nft: nft2, stats: stats2 } : { nft: nft1, stats: stats1 };
  
  while (health1 > 0 && health2 > 0 && turn <= 20) { // Max 20 turns to prevent infinite battles
    // First attacker's turn
    if (health1 > 0 && health2 > 0) {
      const damage = calculateDamage(firstAttacker.stats, secondAttacker.stats);
      if (firstAttacker.nft.id === nft1.id) {
        health2 = Math.max(0, health2 - damage);
      } else {
        health1 = Math.max(0, health1 - damage);
      }
      
      battleLog.push({
        turn,
        attacker: firstAttacker.nft.id,
        defender: secondAttacker.nft.id,
        action: 'attack',
        damage,
        remainingHealth: firstAttacker.nft.id === nft1.id ? health2 : health1,
      });
    }
    
    // Second attacker's turn
    if (health1 > 0 && health2 > 0) {
      const damage = calculateDamage(secondAttacker.stats, firstAttacker.stats);
      if (secondAttacker.nft.id === nft1.id) {
        health2 = Math.max(0, health2 - damage);
      } else {
        health1 = Math.max(0, health1 - damage);
      }
      
      battleLog.push({
        turn,
        attacker: secondAttacker.nft.id,
        defender: firstAttacker.nft.id,
        action: 'attack',
        damage,
        remainingHealth: secondAttacker.nft.id === nft1.id ? health2 : health1,
      });
    }
    
    turn++;
  }
  
  // Determine winner
  if (health1 > health2) {
    return { winner: nft1, loser: nft2, battleLog, result: 'win' };
  } else if (health2 > health1) {
    return { winner: nft2, loser: nft1, battleLog, result: 'win' };
  } else {
    return { winner: nft1, loser: nft2, battleLog, result: 'draw' };
  }
}

export function getRandomBattleMessage(type: keyof typeof BATTLE_MESSAGES, attacker?: string, defender?: string, winner?: string): string {
  const messages = BATTLE_MESSAGES[type];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  return randomMessage
    .replace('{attacker}', attacker || 'Fighter')
    .replace('{defender}', defender || 'Opponent')
    .replace('{winner}', winner || 'Champion');
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case 'common': return 'text-gray-400';
    case 'uncommon': return 'text-green-400';
    case 'rare': return 'text-blue-400';
    case 'epic': return 'text-purple-400';
    case 'legendary': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
}

export function getElementColor(element: string): string {
  switch (element.toLowerCase()) {
    case 'fire': return 'text-red-400';
    case 'water': return 'text-blue-400';
    case 'earth': return 'text-green-400';
    case 'air': return 'text-cyan-400';
    case 'lightning': return 'text-yellow-400';
    case 'plasma': return 'text-purple-400';
    case 'void': return 'text-gray-400';
    default: return 'text-white';
  }
}
