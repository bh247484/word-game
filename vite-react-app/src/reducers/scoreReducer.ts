import { IScoreState } from "@/types";

export const ACTIONS = {

};

export function scoreReducer(scoreState: IScoreState, { type, payload }: any): IScoreState {
  const action: Function = actionMap.get(type)!;
  return action ? action(scoreState, payload) : scoreState;
}

const actionMap = new Map<string, Function>([

  [
    'updateScore',
    (scoreState: IScoreState, word: string) => {
        const { gameScore, levelScore, multiplier, scoredWords } = scoreState;
        const wordScore = scoreWord(word);

        const newGameScore = gameScore + (wordScore * multiplier);
        const newLevelScore = levelScore + (wordScore * multiplier);
        console.log(word);

        return {
            ...scoreState,
            gameScore: newGameScore,
            levelScore: newLevelScore,
            multiplier: multiplier + 1,
            multiTime: 5,
            scoredWords: [word, ...scoredWords],
        };
    }
  ],

  [
    'multiplierTick',
    (scoreState: IScoreState) => {
        const { multiplier, multiTime} = scoreState;
        const newMultiTime = multiTime - 1;
        let newMultiplier = multiplier;

        if (newMultiTime === 0) {
          newMultiplier = 1;          
        }
        return {
            ...scoreState,
            multiplier: newMultiplier,
            multiTime: newMultiTime,
        };
    }
  ],

  [
    'setGameScore',
    (scoreState: IScoreState, gameScore: number) => {
        return {
            ...scoreState,
            gameScore,
        };
    }
  ],

  [
    'setLevelScore',
    (scoreState: IScoreState, levelScore: number) => {
        return {
            ...scoreState,
            levelScore
        };
    }
  ],

  [
    'setMultiplier',
    (scoreState: IScoreState, multiplier: number) => {
        return {
            ...scoreState,
            multiplier
        };
    }
  ],

  [
    'setScoredWords',
    (scoreState: IScoreState, scoredWords: string[]) => {
        return {
            ...scoreState,
            scoredWords
        };
    }
  ],

]);

export function scoreInit(): IScoreState {
  return {
    gameScore: 0,
    levelScore: 0,
    multiplier: 1,
    multiTime: 0,
    scoredWords: [],
  };
}

function scoreWord(word: string): number {
  return 10;
}
