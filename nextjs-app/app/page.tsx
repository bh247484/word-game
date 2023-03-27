'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import binSearch from './searchAlgo/binSearch';
import { randomLetter } from './randGen/randGen'
import LetterGrid from './components/letter-grid';


export default function Home() {
  const [word, setWord]: [string, Function] = useState("");
  const [letters, setLetters]: [string[], Function] = useState(
    [...Array(20)].map(() => randomLetter())
  );

  // console.log([...Array(20)].map(() => randomLetter()));

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

  // useEffect(() => {
  // }, [])

  return (
    <div className="App">
      <h1>Text</h1>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' ? submitWord() : null}
      />
      <button onClick={submitWord}>Try</button>
      <LetterGrid
        letters={letters}
      />
    </div>
  );
}
