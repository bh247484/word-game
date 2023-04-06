'use client';

import styles from './page.module.css';
import GameBoard from './gameBoard';

export default function Home() {
  return (
    <div className={styles.container}>
      <GameBoard
        gameConfig={{
          dripDelay: 15,
          levelTime: 120,
          rows: 4,
        }}
      />
    </div>
  );
}
