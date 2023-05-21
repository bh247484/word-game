import { IGameConfig } from "@/types";
import { worldConfig } from "@/config/worldConfig";

export const ACTIONS = {

};

export function gameConfigReducer(gameConfig: IGameConfig, { type, payload }: any): IGameConfig {
  const action: Function = actionMap.get(type)!;
  return action ? action(gameConfig, payload) : gameConfig;
}

const actionMap = new Map<string, Function>([

  [
    'setDripDelay',
    (gameConfig: IGameConfig, delay: number) => {
        return {
            ...gameConfig,
            dripDelay: delay,
        };
    }
  ],

  [
    'setGameOver',
    (gameConfig: IGameConfig, gameOver: boolean) => {
        return {
            ...gameConfig,
            gameOver
        };
    }
  ],
  
  [
    'setLevel',
    (gameConfig: IGameConfig, level: number) => {
      return {
        ...gameConfig,
        level
      };
    }
  ],

  [
    'setPauseDrip',
    (gameConfig: IGameConfig, val: boolean) => {
        return {
            ...gameConfig,
            pauseDrip: val,
        };
    }
  ],

  [
    'setTime',
    (gameConfig: IGameConfig, time: number) => {
        return {
            ...gameConfig,
            time
        };
    }
  ],

  [
    'setWorld',
    (gameConfig: IGameConfig, world: number) => {
        return {
            ...gameConfig,
            world
        };
    }
  ],

  [
    'reset',
    () => gameConfigInit()
  ],

]);

export function gameConfigInit(): IGameConfig {
  return {
    ...worldConfig[0].levels[0],
    gameOver: false,
    level: 0,
    pauseDrip: false,
    world: 0
  };
}
