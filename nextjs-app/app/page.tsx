'use client';

import { useState, } from 'react';
import styles from './page.module.css';
import binSearch from './searchAlgo/binSearch';

export default function Home() {
  const [word, setWord]: [string, Function] = useState("");

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
    </div>
  );
}
