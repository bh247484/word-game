import { useEffect, useReducer, useState } from 'react';
import styles from './gameBoard.module.css';
import { IBlock, IGameConfig } from '@/types';
import { Clock, Grid } from '@/components';
import { createInitialState, gridReducer } from '@/reducers/gridReducer';
import useInterval from '@/utils/useInterval';
import binSearch from '@/utils/searchAlgo/binSearch';
import { percentExpired } from '@/utils/helpers';

interface IProps {
  gameConfig: IGameConfig;
  setGameOver: Function;
}

export default function GameBoard({
  gameConfig: {
    initDripDelay,
    levelTime,
    rows,
  },
  setGameOver,
}: IProps) {
  const [grid, dispatch]: [IBlock[][], Function] = useReducer(gridReducer, rows, createInitialState); 
  const [word, setWord]: [string, Function] = useState('');
  const [dripDelay, setDripDelay] = useState(initDripDelay * 1000);
  const [noDrip, setNoDrip] = useState(false);
  const [time, setTime] = useState(levelTime);
  // console.log(grid);

  const submitWord = () => {
    if (word.length < 3) {
      console.error('Word must be longer than 2 characters.');
      setWord('');
      dispatch({ type: 'dequeue-blocks' });
      return false;
    }

    const isWord: boolean = binSearch(word);
    if (isWord) {
      console.log('Its a word.');
      dispatch({ type: 'remove-queue' });
    } else {
      console.log('Not a word.');
      dispatch({ type: 'dequeue-blocks' });
    }
    setWord('');
  };

  const changeHandler = (value: string) => {
    // Filter out letters that are not in the grid.
    let allowedLetters = grid.flat().map(({ letter }) => letter);
    const sanitizedStr = value.split('').filter((char) => {
      const bool = allowedLetters.includes(char);
      // Remove this occurence of letter to prevent confusion with subsequent occurences.
      allowedLetters.splice(allowedLetters.findIndex(x => x === char), 1);
      return bool;
    });

    // Queue letters based on new sanitized input string and update the grid state.
    // setGrid(queueLetters(sanitizedStr, grid));
    dispatch({ type: 'queue-letters', payload: sanitizedStr });
    // Update word state with new santized input string.
    setWord(sanitizedStr.join(''));
  };

  const newGame = () => {
    setTime(levelTime);
    dispatch({ type: 'new-board', payload: rows });
    setDripDelay(initDripDelay * 1000);
    setNoDrip(false);
  }

  useInterval(() => dispatch({ type: 'new-drip' }), noDrip ? null : dripDelay);
  useInterval(() => {
    if (time > 0) {
      setTime(time - 1);
    } 
  }, 1000);

  // Update drip delay after certain amount of time expires.
  useEffect(() => {
    // Triggers at 25%, 50%, and 75% time expired.
    if ( time !== levelTime && percentExpired(levelTime, time) % 25 === 0 ) {
      console.log(time);
      setDripDelay(dripDelay => dripDelay * .75);
    }
    if (time === 0) {
      setNoDrip(true);
    }
  }, [time]);

  useEffect(() => {
    if ( grid.some((col) => col.length > 10) ) {
      // Log the longest column length to warn player.
      setGameOver(true);
      setNoDrip(true);
      console.log('Game Over!');
    }
  }, [grid]);

  return (
    <div className={styles['board-wrapper']}>
      <h3>Time Remaining</h3>
      <Clock time={time} />
      <br />
      {
        time === 0 ? (
          <button onClick={() => newGame()}>New Game!</button>
        ) : null
      }
      <h3>Enter Word</h3>
      <input
        type="text"
        value={word}
        onChange={({ target }) => changeHandler(target.value)}
        onKeyUp={({ key }) => key === 'Enter' ? submitWord() : null}
      />
      <button onClick={submitWord}>Try</button>
      <Grid
        columns={grid}
      />
      <button onClick={() => dispatch({ type: 'new-drip' })}>Add Row</button>
    </div>
  );
}
