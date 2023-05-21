import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { GameBoard } from '@/components';

function App() {
  async function testFetch() {
    const response = await fetch("http://localhost:5000/WordGame");
    console.log(response);
    const data = await response.text();
    console.log(data);
  }
  return (
    <div className={styles.container}>
      <button onClick={testFetch}>Test Fetch</button>
      <GameBoard />
    </div>
  );
}

export default App
