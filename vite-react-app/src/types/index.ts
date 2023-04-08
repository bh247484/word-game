export interface IBlock {
  letter: string;
  queued: boolean;
}

export interface IGameConfig {
  dripDelay: number;
  level: number;
  pauseDrip: boolean;
  time: number;
  rows: number;
  world: number;
}
