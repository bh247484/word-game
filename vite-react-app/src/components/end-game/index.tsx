import { useEffect, useState } from 'react';
import { worldConfig } from "@/config/worldConfig";
import styles from './end-game.module.css';

interface IProps {
  gameScore: number;
  dispatches: Function[]
  scoredWords: { word: string, score: number }[];
}

export default function EndGame({ gameScore, dispatches, scoredWords }: IProps) {
  const [highScores, setHighScores]:[{ name:string, score:number }[], Function] = useState([]);
  const [loading, setLoading] = useState(true);
  const [phase, setPhase] = useState('report');
  const [name, setName] = useState('');
  const [gcDispatch, gridDispatch, scoreDispatch] = dispatches;

  async function getHighScores() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/high_scores");
      const scores = await response.json();
      setHighScores(scores);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function submitNewScore(name: string) {
    // Update local, frontend high scores.
    const updatedScores = [...highScores];
    const newScore = {
      name,
      score: gameScore,
    }
    if (updatedScores.length === 10) {
      updatedScores.splice(-1);
    }
    updatedScores.push(newScore);
    updatedScores.sort((a,b) => b.score - a.score);
    setHighScores(updatedScores);

    // Update backend db high scores.
    try {
      const response = await fetch('http://localhost:3000/api/v1/high_scores', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newScore),
      })
    } catch(error) {
      console.error(error);
    } finally {
      setPhase('show-scores');
    }
  }
  
  // Make API request for High Scores.
  useEffect(() => {
    getHighScores();
  }, [])

  // Check if new high score.
  useEffect(() => {
    if (phase === 'high-scores' && !loading) {
      if (highScores?.length < 10 || highScores[highScores.length - 1].score < gameScore) {
        setPhase('new-high-score')
      } else {
        setPhase('show-scores');
      }
    }
  }, [phase, loading])

  const newGame = () => {
    gcDispatch({ type: 'reset' });
    gridDispatch({ type: 'reset', payload: worldConfig[0].levels[0].rows });
    scoreDispatch({ type: 'reset' });
  }

  if (phase === 'report') {
    return (
      <div className={styles['wrapper']}>
          <h2>Game Over</h2>
          <h3>Your Score: {gameScore}</h3>
          <h3>Words Spelled...</h3>
          {
            scoredWords.map(({ word }) => (
              <li>{word}</li>
            ))
          }
          <button onClick={()=> setPhase('high-scores')}>Show High Scores</button>
      </div>
    );
  }

  if (phase === 'new-high-score') {
    return (
      <>
        {!loading ? (
          <div className={styles['wrapper']}>
            <h4>New High Score!</h4>
            <p>Enter Your Name</p>
            <input
              className={styles.input}
              maxLength={3}
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value.toUpperCase())}
              onKeyUp={({ key }) => key === 'Enter' ? submitNewScore(name) : null}
            />
            <button onClick={() => submitNewScore(name)}>Submit</button>
          </div>
        ) : null}
      </>
    );
  }

  if (phase === 'show-scores') {
    return (
      <div className={styles['wrapper']}>
        <h2>High Scores</h2>
        {
          highScores.map((entry) => (
            <li>{entry.name} -- {entry.score}</li>
          ))
        }
        <button onClick={newGame}>Start New Game</button>
      </div>
    );
  }
}
