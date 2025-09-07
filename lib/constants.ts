export const BATTLE_CONFIG = {
  MAX_HEALTH: 100,
  BASE_ATTACK_DAMAGE: 20,
  BASE_DEFENSE_REDUCTION: 0.1,
  SPEED_ADVANTAGE_MULTIPLIER: 1.2,
  LEVEL_MULTIPLIER: 0.1,
  EXPERIENCE_PER_WIN: 50,
  EXPERIENCE_PER_LOSS: 10,
} as const;

export const RARITY_MULTIPLIERS = {
  common: 1.0,
  uncommon: 1.1,
  rare: 1.25,
  epic: 1.5,
  legendary: 2.0,
} as const;

export const BATTLE_MESSAGES = {
  ATTACK: [
    '{attacker} launches a devastating attack!',
    '{attacker} strikes with precision!',
    '{attacker} unleashes their power!',
    '{attacker} delivers a crushing blow!',
  ],
  DEFEND: [
    '{defender} braces for impact!',
    '{defender} raises their defenses!',
    '{defender} prepares to counter!',
  ],
  CRITICAL: [
    'Critical hit! Maximum damage dealt!',
    'A perfect strike! Critical damage!',
    'Devastating critical attack!',
  ],
  VICTORY: [
    '{winner} emerges victorious!',
    '{winner} claims victory in the arena!',
    '{winner} stands triumphant!',
  ],
} as const;

export const MOCK_NFTS: NFT[] = [
  {
    id: '1',
    tokenId: '1001',
    contractAddress: '0x1234...5678',
    name: 'Cyber Warrior Alpha',
    image: 'https://picsum.photos/300/300?random=1',
    attributes: [
      { trait_type: 'Rarity', value: 'Epic' },
      { trait_type: 'Element', value: 'Lightning' },
      { trait_type: 'Weapon', value: 'Energy Blade' },
    ],
    battleStats: {
      attack: 85,
      defense: 70,
      speed: 90,
      health: 100,
      level: 5,
      experience: 250,
    },
    owner: '0xuser1',
  },
  {
    id: '2',
    tokenId: '1002',
    contractAddress: '0x1234...5678',
    name: 'Neon Guardian',
    image: 'https://picsum.photos/300/300?random=2',
    attributes: [
      { trait_type: 'Rarity', value: 'Rare' },
      { trait_type: 'Element', value: 'Plasma' },
      { trait_type: 'Weapon', value: 'Shield Matrix' },
    ],
    battleStats: {
      attack: 65,
      defense: 95,
      speed: 60,
      health: 100,
      level: 4,
      experience: 180,
    },
    owner: '0xuser2',
  },
  {
    id: '3',
    tokenId: '1003',
    contractAddress: '0x1234...5678',
    name: 'Quantum Assassin',
    image: 'https://picsum.photos/300/300?random=3',
    attributes: [
      { trait_type: 'Rarity', value: 'Legendary' },
      { trait_type: 'Element', value: 'Void' },
      { trait_type: 'Weapon', value: 'Phase Daggers' },
    ],
    battleStats: {
      attack: 95,
      defense: 55,
      speed: 100,
      health: 100,
      level: 7,
      experience: 420,
    },
    owner: '0xuser3',
  },
];
