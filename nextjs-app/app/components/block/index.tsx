import { IBlock } from '../../types/types';
import styles from './block.module.css';
import joinClasses from '@/app/methods/joinClasses';

interface IProps {
  id: string;
  block: IBlock;
}

export default function Block({ block: { letter, queued }, id }: IProps) {
  return (
    <div className={joinClasses(styles['block-wrapper'], { [styles.queued]: queued })} id={id}>
      {letter}
    </div>
  );
}