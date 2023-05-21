import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { GameBoard } from '@/components';

function App() {
  return (
    <div className={styles.container}>
      <GameBoard />
    </div>
  );
}

export default App
