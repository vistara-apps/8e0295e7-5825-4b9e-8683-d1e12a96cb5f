export interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  name: string;
  image: string;
  attributes: NFTAttribute[];
  battleStats: BattleStats;
  owner: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface BattleStats {
  attack: number;
  defense: number;
  speed: number;
  health: number;
  level: number;
  experience: number;
}

export interface User {
  farcasterId: string;
  connectedWalletAddress: string;
  registeredNFTs: string[];
  wins: number;
  losses: number;
  totalBattles: number;
  level: number;
  experience: number;
}

export interface Battle {
  battleId: string;
  player1NFTId: string;
  player2NFTId: string;
  winnerNFTId: string | null;
  timestamp: number;
  battleLog: BattleAction[];
  status: 'pending' | 'active' | 'completed';
}

export interface BattleAction {
  turn: number;
  attacker: string;
  defender: string;
  action: 'attack' | 'defend' | 'special';
  damage: number;
  remainingHealth: number;
}

export type BattleResult = 'win' | 'loss' | 'draw';

export interface GameState {
  currentBattle: Battle | null;
  selectedNFT: NFT | null;
  opponent: NFT | null;
  isInBattle: boolean;
  battlePhase: 'selection' | 'battle' | 'result';
}
