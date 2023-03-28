import Block from "./block";

interface IProps {
  id: string;
  letters: string[];
}

export default function Column({ letters, id }: IProps) {
  return (
    <div className="letter-column" id={id}>
      {
        letters.map((letter: string, index) => (
          <Block
            key={index}
            id={`${id}${index.toString()}`}
            letter={letter}
          />
        ))
      }
    </div>
  );
}