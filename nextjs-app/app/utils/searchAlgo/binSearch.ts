import dict from './dictionary.json';

export default function binSearch(word: string): boolean {
  const wordLen: number = word.length;
  const dictValue: string = dict[wordLen];

  if (!dictValue) {
    console.error("No words of that length.");
    return false;
  }

  const numWords: number = dictValue.length / wordLen;

  let start: number = 0;
  let end: number = numWords - 1;
  let mid: number = Math.floor(numWords / 2);

  while (end >= start) {
    const strIndex: number = wordLen * mid;
    let current: string = dictValue.substring(strIndex, strIndex + wordLen);

    console.log({
      end,
      start,
      word,
      current,
    });

    // console.log(dictValue.substring(strIndex, wordLen * end));

    if (word === current) {
      return true;
    }

    if (word < current) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }

    mid = Math.floor((start + end) / 2);
  }

  return false;
}