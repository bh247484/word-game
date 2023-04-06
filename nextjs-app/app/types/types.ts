export interface IBlock {
  letter: string;
  queued: boolean;
}

export interface IGameConfig {
  dripDelay: number;
  levelTime: number;
  rows: number;
}
