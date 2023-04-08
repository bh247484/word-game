import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { GameBoard } from '@/components';

function App() {
  const [gameOver, setGameOver]: [boolean, Function] = useState(false);
  const [activeComp, setActiveComp]: [string, Function] = useState('game-board')

  const gameConfig = {
    initDripDelay: 15,
    levelTime: 120,
    rows: 4,
  };

  useEffect(() => {
    if (gameOver) setActiveComp('game-over');
  }, [gameOver])

  return (
    <div className={styles.container}>
      {
        {
          'game-board': <GameBoard
                          gameConfig={gameConfig}
                          setGameOver={setGameOver}
                        />,
          'game-over': <h2>GAME OVER</h2>,
        }[activeComp]
      }
    </div>
  );
}

export default App
