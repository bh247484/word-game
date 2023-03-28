interface IProps {
  id: string;
  letter: string;
}

export default function Block({ letter, id }: IProps) {
  return (
    <div className="letter-block" id={id}>
      {letter}
    </div>
  );
}