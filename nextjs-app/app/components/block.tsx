import { IBlock } from "../types/types";

interface IProps {
  id: string;
  block: IBlock;
}

export default function Block({ block: { letter, queued }, id }: IProps) {
  const classes = 'letter-block' + ( queued ? ' queued' : '' );
  return (
    <div className={classes} id={id}>
      {letter}
    </div>
  );
}