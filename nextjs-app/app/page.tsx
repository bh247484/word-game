'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import GameBoard from './gameBoard';

export default function Home() {
  const [gameOver, setGameOver]: [boolean, Function] = useState(false);
  const [activeComp, setActiveComp]: [string, Function] = useState('game-board')

  const gameConfig = {
    initDripDelay: 15,
    levelTime: 30,
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
