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
            scoredWords: [{ word, score: wordScore}, ...scoredWords],
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

export const letterPoints: { [key: string]: number} = {
  'e': 1,
  'a': 3,
  't': 4,
  'o': 4,
  'r': 6,
  'n': 6,
  'i': 6,
  's': 8,
  'd': 9,
  'u': 10,
  'l': 10,
  'm': 11,
  'c': 11,
  'g': 12,
  'h': 12,
  'p': 13,
  'b': 13,
  'y': 13,
  'w': 13,
  'f': 13,
  'v': 14,
  'k': 15,
  'x': 18,
  'j': 16,
  'z': 20,
  'q': 20,
}

function scoreWord(word: string): number {
  let score: number = 0;
  // Score each letter.
  word.split('').forEach((letter) => {
    score += letterPoints[letter];
  });

  // Word length score multipliers.
  // For every letter beyond 4, increase score by 150%.
  let numLoops = word.length - 4;

  while (numLoops > 0) {
    score *= 1.5;
    numLoops --;
  }

  return Math.floor(score);
}
