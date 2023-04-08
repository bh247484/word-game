export interface IBlock {
  letter: string;
  queued: boolean;
}

export interface IGameConfig {
  initDripDelay: number;
  levelTime: number;
  rows: number;
}
