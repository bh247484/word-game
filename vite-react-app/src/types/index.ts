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

export interface ILevelConfig {
  dripDelay: number;
  time: number;
  rows: number;
}

export interface IWorldConfig {
  name: string;
  levels: ILevelConfig[];
}

export interface IScoreState {
  gameScore: number;
  levelScore: number;
  multiplier: number;
  multiTime: number;
  scoredWords: { word: string, score: number }[];
}
