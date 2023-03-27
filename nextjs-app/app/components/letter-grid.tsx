import LetterBlock from "./letter-block";

interface IProps {
  letters: string[];
}

export default function LetterGrid({ letters }: IProps) {
  return (
    <div className="letter-grid">
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
