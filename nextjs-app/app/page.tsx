'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import GameBoard from './gameBoard';

export default function Home() {
  const [gameOver, setGameOver]: [boolean, Function] = useState(false);
  const [levelClear, setLevelClear]: [boolean, Function] = useState(false);
  const [activeComp, setActiveComp]: [string, Function] = useState('game-board')

  const gameConfig = {
    initDripDelay: 15,
    levelTime: 120,
    rows: 4,
  };

  useEffect(() => {
    if (gameOver) setActiveComp('game-over');
    if (levelClear) setActiveComp('level-clear');

  }, [gameOver, levelClear])

  return (
    <div className={styles.container}>
      {
        {
          'game-board': <GameBoard
                          gameConfig={gameConfig}
                          gameOver={gameOver}
                          setGameOver={setGameOver}
                          setLevelClear={setLevelClear}
                        />,
          'game-over': <h2>GAME OVER</h2>,
          'level-clear': <h2>LEVEL CLEAR</h2>,
        }[activeComp]
      }
    </div>
  );
}
