import { Column } from '@/components';
import { IBlock } from '@/types';
import styles from './grid.module.css';

interface IProps {
  columns: IBlock[][];
}

export default function Grid({ columns }: IProps) {
  return (
    <div className={styles['grid-wrapper']}>
      {
        columns.map((column: IBlock[], index) => (
          <Column
            key={index}
            id={index.toString()}
            blocks={column}
          />
        ))
      }
    </div>
  );
}
