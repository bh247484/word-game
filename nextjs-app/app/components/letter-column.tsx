import LetterBlock from "./letter-block";

interface IProps {
  letters: string[];
}

export default function LetterColumn({ letters }: IProps) {
  return (
    <div className="letter-column">
      {
        letters.map((letter: string, index) => (
          <LetterBlock
            key={index}
            letter={letter}
          />
        ))
      }
    </div>
  );
}