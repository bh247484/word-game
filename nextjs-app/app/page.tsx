'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import binSearch from './searchAlgo/binSearch';
import { randomLetter } from './randGen/randGen'
import LetterGrid from './components/letter-grid';


export default function Home() {
  const [word, setWord]: [string, Function] = useState("");
  const [columns, setColumns]: [string[][], Function] = useState(
    Array.from(Array(6), () => [...Array(10)].map((_, i) => i > 3 ? '0' : randomLetter()))
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

  const changeHandler = (value: string) => {
    const sanitizedStr = value.split('').filter((char) => {
      return columns.flat().includes(char);
    });
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
      <LetterGrid
        columns={columns}
      />
    </div>
  );
}
