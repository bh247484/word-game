interface IProps {
  letter: string;
}

export default function LetterBlock({ letter }: IProps) {
  return (
    <div className="letter-block">
      {letter}
    </div>
  );
}