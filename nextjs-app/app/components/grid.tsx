import Column from "./column";
import { IBlock } from "../types/types";

interface IProps {
  columns: IBlock[][];
}

export default function Grid({ columns }: IProps) {
  return (
    <div className="letter-grid" style={{display: 'flex', gap: '25px'}}>
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
