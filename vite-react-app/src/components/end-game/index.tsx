import { worldConfig } from "@/config/worldConfig";
import styles from './end-game.module.css';

interface IProps {
  gameScore: number;
  dispatches: Function[]
  scoredWords: { word: string, score: number }[];
}

export default function EndGame({ gameScore, dispatches, scoredWords }: IProps) {
  const [gcDispatch, gridDispatch, scoreDispatch] = dispatches;
  // Make API request for High Scores.

  // ...

  const newGame = () => {
    gcDispatch({ type: 'reset' });
    gridDispatch({ type: 'reset', payload: worldConfig[0].levels[0].rows });
    scoreDispatch({ type: 'reset' });
  }

  return (
    <div className={styles['wrapper']}>
      <h2>Game Over</h2>
      <h3>Your Score: {gameScore}</h3>
      <button onClick={newGame}>Start New Game</button>
    </div>
  );
}
