import { IBlock } from "../types/types";
import { randomWeightedLetter } from "./randGen/randGen";

export function dequeueBlocks(grid: IBlock[][]): IBlock[][] {
  return grid.map((col) => col.map(({ letter }) => {
     return { letter, queued: false };
  }));
}

export function removeQueue(grid: IBlock[][]): IBlock[][] {
  return grid.map((col) => col.filter(({ queued }) => !queued));
}

export function queueLetters(letters: string[], grid: IBlock[][]): IBlock[][] {
    // Dequeue all blocks and localize a copy to mutate.
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

export function newDrip(grid: IBlock[][], setGrid: Function) {
  const locGrid = grid.map((col) => {
    col.push({ queued: false, letter: randomWeightedLetter() });
    return col;
  });

  setGrid(locGrid);
}
