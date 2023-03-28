import LetterColumn from "./letter-column";

interface IProps {
  columns: string[][];
}

export default function LetterGrid({ columns }: IProps) {
  return (
    <div className="letter-grid" style={{display: 'flex', gap: '25px'}}>
      {
        columns.map((column: string[], index) => (
          <LetterColumn
            key={index}
            letters={column}
          />
        ))
      }
    </div>
  );
}
