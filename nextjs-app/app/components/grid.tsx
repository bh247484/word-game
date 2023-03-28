import Column from "./column";

interface IProps {
  columns: string[][];
}

export default function Grid({ columns }: IProps) {
  return (
    <div className="letter-grid" style={{display: 'flex', gap: '25px'}}>
      {
        columns.map((column: string[], index) => (
          <Column
            key={index}
            id={index.toString()}
            letters={column}
          />
        ))
      }
    </div>
  );
}
