import styles from './clock.module.css';

interface IProps {
  time: number;
}

export default function Clock({ time }: IProps) {
  const minutes: string = Math.floor(time / 60).toString();
  const seconds: string = (time % 60).toString().padStart(2, '0');

  return (
    <div className={styles.nothing}>
      {minutes} : {seconds}
    </div>
  );
}