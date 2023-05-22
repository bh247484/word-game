import { useEffect, useState } from 'react';
import styles from './game-report.module.css';

interface IProps {
  gameScore: number;
  scoredWords: { word: string, score: number }[];
  setPhase: Function;
}

export default function GameReport({ gameScore, scoredWords, setPhase }: IProps) {
  const [apiWords, setApiWords]: [{ word: string, timesSpelled: number }, Function] = useState([]);
  // Post scoredWords to api endpoint.

  return (
    <div className={styles['wrapper']}>
      <h2>Game Over</h2>
      <h3>Your Score: {gameScore}</h3>
      {scoredWords.length > 0 ? (
        <>
          <h3>Words Spelled...</h3>
          {
            scoredWords.map(({ word }) => (
              <li>{word}</li>
            ))
          }
        </>
      ) : null}
      <button onClick={()=> setPhase('high-scores')}>Show High Scores</button>
    </div>
  );
}