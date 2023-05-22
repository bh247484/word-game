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
  const [newHighScore, setNewHighScore] = useState(false);
  const [name, setName] = useState('')
  const [gcDispatch, gridDispatch, scoreDispatch] = dispatches;

  async function getHighScores() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/high_scores");
      const scores = await response.json();
      setHighScores(scores);

      // Determine if new high score set.
      if (scores.length < 10 || scores[scores.length - 1].score < gameScore) {
        setNewHighScore(true);
      }
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
      setNewHighScore(false);
    }
  }
  
  // Make API request for High Scores.
  useEffect(() => {
    getHighScores();
  }, [])

  const newGame = () => {
    gcDispatch({ type: 'reset' });
    gridDispatch({ type: 'reset', payload: worldConfig[0].levels[0].rows });
    scoreDispatch({ type: 'reset' });
  }

  return (
    <div className={styles['wrapper']}>
      <h2>Game Over</h2>
      <h3>Your Score: {gameScore}</h3>
      {
        !loading ? (
          newHighScore ? (
            <div>
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
          ) : (
            <>
              <h2>High Scores</h2>
              {
                highScores.map((entry) => (
                  <li>{entry.name} -- {entry.score}</li>
                ))
              }
            </>
          )
        ) : null
      }
      <button onClick={newGame}>Start New Game</button>
    </div>
  );
}
