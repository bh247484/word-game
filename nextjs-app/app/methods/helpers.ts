import { IBlock } from "../types/types";

export function dequeueBlocks(grid: IBlock[][]): IBlock[][] {
  return grid.map((col) => col.map(({ letter }) => {
     return { letter, queued: false };
  }));
}

export function removeQueue(grid: IBlock[][]): IBlock[][] {
  return grid.map((col) => col.filter(({ queued }) => !queued));
}
