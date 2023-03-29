'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import binSearch from './methods/searchAlgo/binSearch';
import { randomLetter } from './methods/randGen/randGen'
import Grid from './components/grid';
import { IBlock } from './types/types';
import { dequeueBlocks, removeQueue, queueLetters } from './methods/helpers';


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

  const changeHandler = (value: string) => {
    // Filter out letters that are not in the grid.
    let allowedLetters = grid.flat().map(({ letter }) => letter);
    const sanitizedStr = value.split('').filter((char) => {
      const bool = allowedLetters.includes(char);
      // Remove this occurence of letter to prevent confusion with subsequent occurences.
      allowedLetters.splice(allowedLetters.findIndex(x => x === char), 1);
      return bool;
    });

    // Queue letters based on new sanitized input string and update the grid state.
    setGrid(queueLetters(sanitizedStr, grid));
    // Update word state with new santized input string.
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
