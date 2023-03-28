import Block from "./block";
import { IBlock } from "../types/types";

interface IProps {
  id: string;
  blocks: IBlock[];
}

export default function Column({ blocks, id }: IProps) {
  return (
    <div className="letter-column" id={id}>
      {
        blocks.map((block: IBlock, index) => (
          <Block
            key={`${id}${index.toString()}`}
            id={`${id}${index.toString()}`}
            block={block}
          />
        ))
      }
    </div>
  );
}