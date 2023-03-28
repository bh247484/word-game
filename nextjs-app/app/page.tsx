'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import binSearch from './searchAlgo/binSearch';
import { randomLetter } from './randGen/randGen'
import Grid from './components/grid';
import { IBlock } from './types/types';


export default function Home() {
  const [word, setWord]: [string, Function] = useState("");
  const [columns, setColumns]: [IBlock[][], Function] = useState(
    Array.from(Array(6), () => [...Array(10)].map(
      (_, i) => i > 3 ? { queued: false, letter: '0' } : { queued: false, letter: randomLetter() }))
  );

  const submitWord = () => {
    if (word.length < 3) {
      console.error("Word must be longer than 2 characters.");
      setWord("");
      return false;
    }

    const isWord: boolean = binSearch(word.toLowerCase());
    if (isWord) {
      console.log('Its a word.');
    } else {
      console.log('Not a word.');
    }
    setWord("");
  };

  const queueLetters = (letters: string[]) => {
    // Sort Columns by length to prioritize letters in longest arrays.
    const locCols: IBlock[][] = columns;
    locCols.sort((a,b) => b.length - a.length);

    // Dequeue all letters first.
    locCols.forEach((col) => {
      col.forEach((block) => block.queued = false);
    });

    letters.forEach((letter) => {
      loop1: for (const col of locCols) {
        for (const block of col) {
          // && !block.queued to make sure we're not re-queuing the same letter more than once.
          if (block.letter === letter && !block.queued) {
            block.queued = true;
            break loop1;
          }
        }
      }
    });
    setColumns(locCols);
  };

  const changeHandler = (value: string) => {
    // Filter out letters that are not in the grid.
    let allowedLetters = columns.flat().map(({ letter }) => letter);
    const sanitizedStr = value.split('').filter((char) => {
      const bool = allowedLetters.includes(char);
      // Remove first occurence of letter.
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
        columns={columns}
      />
    </div>
  );
}
