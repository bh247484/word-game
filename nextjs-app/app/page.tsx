'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import binSearch from './methods/searchAlgo/binSearch';
import { randomWeightedLetter } from './methods/randGen/randGen'
import Grid from './components/grid';
import { IBlock } from './types/types';
import { dequeueBlocks, removeQueue, queueLetters, newDrip } from './methods/helpers';
import useInterval from './methods/useInterval';


export default function Home() {
  const [word, setWord]: [string, Function] = useState("");
  const [grid, setGrid]: [IBlock[][], Function] = useState(
    Array.from(Array(6), () => [...Array(4)].map(() => ({ queued: false, letter: randomWeightedLetter() })))
  );
  const [gameOver, setGameOver]: [boolean, Function] = useState(false);
  const [dripDelay, setDripDelay] = useState(10 * 1000);
  console.log(grid);

  const submitWord = () => {
    if (word.length < 3) {
      console.error("Word must be longer than 2 characters.");
      setWord("");
      setGrid(dequeueBlocks(grid));
      return false;
    }

    const isWord: boolean = binSearch(word);
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

  useInterval(() => newDrip(grid, setGrid), gameOver ? null : dripDelay);

  useEffect(() => {
    if ( grid.some((col) => col.length > 10) ) {
      // Log the longest column length to warn player.
      setGameOver(true);
      console.log('Game Over!');
    }
  }, [grid]);

  return (
    <div className={styles.container}>
      <div className={styles['board-wrapper']}>
        <h1>Enter Word</h1>
        <input
          type="text"
          value={word}
          onChange={({ target }) => changeHandler(target.value)}
          onKeyUp={({ key }) => key === 'Enter' ? submitWord() : null}
        />
        <button onClick={submitWord}>Try</button>
        <Grid
          columns={grid}
        />
        <button onClick={() => newDrip(grid, setGrid)}>Add Row</button>
      </div>
    </div>
  );
}
