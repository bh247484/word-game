import { useEffect, useState } from 'react';
import styles from './game-report.module.css';

interface IProps {
  gameScore: number;
  scoredWords: { word: string, score: number }[];
  setPhase: Function;
}

export default function GameReport({ gameScore, scoredWords, setPhase }: IProps) {
  const [apiWords, setApiWords]: [{ word: string, timesScored: number }[], Function] = useState([]);
  const [loading, setLoading]: [boolean, Function] = useState(true);

  // Post scoredWords to api endpoint.
  async function postScoredWords() {
    try {
      const res = await fetch('http://localhost:3000/api/v1/scored_words', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(scoredWords.map(({ word }) => word)),
      });

      // Parse response and set local state.
      const response = await res.json();
      setApiWords(response.map(({ word, times_scored: timesScored }: { word: string, times_scored: number }) => {
        return { word, timesScored };
      }));
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    postScoredWords();
  }, [])

  if (loading) {
    return (
      <div>
        <h2>Game Over</h2>
        <h2>Loading Results...</h2>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <h2>Game Over</h2>
      <h3>Your Score: {gameScore}</h3>
      {!loading && apiWords.length > 0 ? (
        <>
          <h3>Words Spelled...</h3>
          <div className={styles['table-wrapper']}>
            <table>
              <thead>
                <tr>
                  <th>Word</th>
                  <th>Previous Spellings</th>
                </tr>
              </thead>
              <tbody>
                {
                  apiWords.map(({ word, timesScored }) => (
                    <tr>
                      <td>{word}</td>
                      {
                        timesScored === 1 ? (
                          <td>New Word!</td>
                        ) : (
                          <td>{timesScored - 1}</td>
                        )
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </>
      ) : null}
      <br />
      <button onClick={()=> setPhase('high-scores')}>Show High Scores</button>
    </div>
  );
}