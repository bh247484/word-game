import { IBlock } from "@/types";
import { randomWeightedLetter } from "@/utils/randGen";

export const ACTIONS = {

};

export function gridReducer(grid: IBlock[][], { type, payload }: any): IBlock[][] {
  const action: Function = actionMap.get(type)!;
  return action ? action(grid, payload) : grid;
}

const actionMap = new Map<string, Function>([

  [
    'remove-queue',
    (grid: IBlock[][]) => {
      return grid.map((col) => col.filter(({ queued }) => !queued));
    }
  ],

  [
    'dequeue-blocks',
    (grid: IBlock[][]) => {
      return grid.map((col) => col.map(({ letter }) => {
        return { letter, queued: false };
      }));
    }
  ],

  [
    'queue-letters',
    (grid: IBlock[][], letters: string[]) => {
      // Dequeue all blocks and localize a copy to mutate.
      const dequeueBlocks = actionMap.get('dequeue-blocks')!;
      const locGrid: IBlock[][] = dequeueBlocks(grid);

      // Define column iteration order to prioritize queuing letters in longest/tallest columns first.
      // Cannot simply sort locGrid or that will change the render order on the screen too.
      const iterationOrder: { index: number, length: number }[] = [...locGrid]
        // Return obj with index to preserve order post sort and length for sorting.
        .map((col, index) => ({ index, length: col.length }))
        // Sort by column length, longest to shortest.
        .sort((a,b) => b.length - a.length);

      // Queue blocks with matching letters.
      letters.forEach((letter) => {
        loop1: for (const { index } of iterationOrder) {
          for (const block of locGrid[index]) {
            // `&& !block.queued` to make sure we're not re-queuing the same letter more than once.
            if (block.letter === letter && !block.queued) {
              block.queued = true;
              break loop1;
            }
          }
        }
      });

      return locGrid;
    }
  ],

  [
    'new-drip', (grid: IBlock[][]) => {
      return grid.map((col: IBlock[]) => {
        // Add new random letter to the start of column. 
        return [{ queued: false, letter: randomWeightedLetter() }, ...col];
      });
    }
  ],

  [
    'new-board', (_grid: IBlock[][], rows: number) => {
      return Array.from(
        Array(6),
        () => [...Array(rows)].map(() => ({ queued: false, letter: randomWeightedLetter() }))
      );
    }
  ],

]);

export function createInitialState(rows: number): IBlock[][] {
  const newBoard = actionMap.get('new-board')!;
  return newBoard(null, rows);
}
