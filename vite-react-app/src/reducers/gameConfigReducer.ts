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
    'setPauseDrip',
    (gameConfig: IGameConfig, val: boolean) => {
        return {
            ...gameConfig,
            pauseDrip: val,
        };
    }
  ],

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
    'setTime',
    (gameConfig: IGameConfig, time: number) => {
        return {
            ...gameConfig,
            time
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
    'setWorld',
    (gameConfig: IGameConfig, world: number) => {
        return {
            ...gameConfig,
            world
        };
    }
  ],

]);

export function gameConfigInit(): IGameConfig {
  return {
    ...worldConfig[0].levels[0],
    level: 0,
    pauseDrip: false,
    world: 0
  };;
}
