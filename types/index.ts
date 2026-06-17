export interface RollRecord {
  id: string;
  diceValue: number;
  randomHex: string;
  timestamp: string;
  provider: string;
  verified: boolean;
  requestId?: string;
}

export interface RollStats {
  total: number;
  faces: Record<number, number>;
}
