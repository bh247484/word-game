'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import binSearch from './methods/searchAlgo/binSearch';
import { randomLetter } from './methods/randGen/randGen'
import Grid from './components/grid';
import { IBlock } from './types/types';
import { dequeueBlocks, removeQueue } from './methods/helpers';


export default function Home() {
  const [word, setWord]: [string, Function] = useState("");
  const [grid, setGrid]: [IBlock[][], Function] = useState(
    Array.from(Array(6), () => [...Array(4)].map(() => ({ queued: false, letter: randomLetter() })))
  );
  console.log(grid);

  const submitWord = () => {
    if (word.length < 3) {
      console.error("Word must be longer than 2 characters.");
      setWord("");
      setGrid(dequeueBlocks(grid));
      return false;
    }

    const isWord: boolean = binSearch(word.toLowerCase());
    if (isWord) {
      console.log('Its a word.');
      setGrid(removeQueue(grid));
    } else {
      console.log('Not a word.');
      setGrid(dequeueBlocks(grid));
    }
    setWord("");
  };

  const queueLetters = (letters: string[]) => {
    // Dequeue all blocks and localize a copy to mutate.
    const locGrid: IBlock[][] = dequeueBlocks(grid);

    // Designate column iteration order to prioritize letters in longest/tallest columns.
    // Cannot simply sort locGrid or that will change the render order on the screen too.
    const iterationOrder = [...locGrid]
      // Add index to columns to preserve order post sort.
      .map((col, i) => ({ col, index: i }))
      // Sort by column length.
      .sort((a,b) => b.col.length - a.col.length)
      // Return original index in new sorted order to be used in iterations below.
      .map(({ index }) => index);

    // Queue all blocks with matching letters.
    letters.forEach((letter) => {
      loop1: for (const index of iterationOrder) {
        for (const block of locGrid[index]) {
          // `&& !block.queued` to make sure we're not re-queuing the same letter more than once.
          if (block.letter === letter && !block.queued) {
            block.queued = true;
            break loop1;
          }
        }
      }
    });

    setGrid(locGrid);
  };

  const changeHandler = (value: string) => {
    // Filter out letters that are not in the grid.
    let allowedLetters = grid.flat().map(({ letter }) => letter);
    const sanitizedStr = value.split('').filter((char) => {
      const bool = allowedLetters.includes(char);
      // Remove this occurence of letter to prevent confusion with subsequent occurences.
      allowedLetters.splice(allowedLetters.findIndex(x => x === char), 1);
      return bool;
    });
    queueLetters(sanitizedStr);
    setWord(sanitizedStr.join(''));
  };

  return (
    <div className="App">
      <h1>Text</h1>
      <input
        type="text"
        value={word}
        onChange={({ target }) => changeHandler(target.value)}
        onKeyUp={({ key }) => {
          if (key === 'Enter') {
            submitWord()
          }
        }}
      />
      <button onClick={submitWord}>Try</button>
      <Grid
        columns={grid}
      />
    </div>
  );
}
