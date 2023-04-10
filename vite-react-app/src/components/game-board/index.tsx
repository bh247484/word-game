import { useEffect, useReducer, useState } from 'react';
import styles from './gameBoard.module.css';
import { IBlock, IGameConfig } from '@/types';
import { Clock, Grid } from '@/components';
import { gameConfigInit, gameConfigReducer } from '@/reducers/gameConfigReducer';
import { gridInit, gridReducer } from '@/reducers/gridReducer';
import useInterval from '@/utils/useInterval';
import binSearch from '@/utils/searchAlgo/binSearch';
import { percentExpired } from '@/utils/helpers';
import { worldConfig } from '@/config/worldConfig';

interface IProps {
  setGameOver: Function;
}

export default function GameBoard({ setGameOver }: IProps) {
  const [{
    dripDelay, pauseDrip, time, rows, level, world
  }, gcDispatch]: [IGameConfig, Function] = useReducer(gameConfigReducer, null, gameConfigInit);
  const [grid, gridDispatch]: [IBlock[][], Function] = useReducer(gridReducer, rows, gridInit); 
  const [word, setWord]: [string, Function] = useState('');
  const [scoredWords, setScoredWords]: [string[], Function] = useState([]);

  // Setup time intervals.
  useInterval(() => gridDispatch({ type: 'new-drip' }), pauseDrip ? null : dripDelay);
  useInterval(() => {
    if (time > 0) {
      gcDispatch({ type: 'setTime', payload: time - 1 });
    } 
  }, 1000);

  const submitWord = () => {
    if (word.length < 3) {
      console.error('Word must be longer than 2 characters.');
      setWord('');
      gridDispatch({ type: 'dequeue-blocks' });
      return false;
    }

    const isWord: boolean = binSearch(word);
    if (isWord) {
      console.log('Its a word.');
      gridDispatch({ type: 'remove-queue' });
      setScoredWords([...scoredWords, word]);
    } else {
      console.log('Not a word.');
      gridDispatch({ type: 'dequeue-blocks' });
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
    gridDispatch({ type: 'queue-letters', payload: sanitizedStr });
    // Update word state with new santized input string.
    setWord(sanitizedStr.join(''));
  };

  const nextLevel = () => {
    if (level < worldConfig[world].levels.length - 1) {
      gcDispatch({ type: 'setLevel', payload: level + 1 });
    } else {
      gcDispatch({ type: 'setLevel', payload: 0 });
      gcDispatch({ type: 'setWorld', payload: world + 1 });
    }
    console.log('Next Level');
  }

  // Update config when level changes.
  useEffect(() => {
    console.log('New Level: ', level);
    console.log('World: ', world);
    const { dripDelay, time, rows } = worldConfig[world].levels[level];
    gcDispatch({ type: 'setDripDelay', payload: dripDelay });
    gcDispatch({ type: 'setTime', payload: time });
    gridDispatch({ type: 'new-board', payload: rows });
  }, [level])

  // Update config when world changes.
  useEffect(() => {
    console.log('New World: ', world);
  }, [world])

  // Update drip delay after percent time expires.
  useEffect(() => {
    // Triggers at 25%, 50%, and 75% time expired.
    const levelTime = worldConfig[world].levels[level].time;
    if ( time !== levelTime && percentExpired(levelTime, time) % 25 === 0 ) {
      console.log(time);
      gcDispatch({ type: 'setDripDelay', payload: dripDelay * .75 });
    }
    if (time === 0) {
      gcDispatch({ type: 'setPauseDrip', payload: true });
    }
  }, [time]);

  // Check column length for Game Over condition.
  useEffect(() => {
    if ( grid.some((col) => col.length > 10) ) {
      // Log the longest column length to warn player.
      setGameOver(true);
      gcDispatch({ type: 'setPauseDrip', payload: true });
      console.log('Game Over!');
    }
  }, [grid]);

  return (
    <div className={styles['board-wrapper']}>
      <div className={styles['col-1']}>
        <h4>World: {world} - {level}</h4>
        <h3>Time Remaining</h3>
        <Clock time={time} />
        {
          time === 0 ? (
            <button onClick={() => nextLevel()}>Next Level!</button>
          ) : null
        }
        <button onClick={() => gridDispatch({ type: 'new-drip' })}>Add Row</button>
      </div>
      <div className={styles['col-2']}>
        <div className="grid-wrapper">
          <h3>Enter Word</h3>
          <input
            className={styles.input}
            type="text"
            value={word}
            onChange={({ target }) => changeHandler(target.value)}
            onKeyUp={({ key }) => key === 'Enter' ? submitWord() : null}
          />
          <button onClick={submitWord}>Try</button>
          <Grid
            columns={grid}
          />
        </div>
      </div>
      <div className={styles['col-3']}>
        {
          scoredWords.length > 0 ? (
            <ul>
              {
                scoredWords.map(scoredWord => <li>{scoredWord}</li>)
              }
            </ul>
          ) : null
        }
      </div>
    </div>
  );
}
