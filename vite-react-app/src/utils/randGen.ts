export function cryptoRand(): number {
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  // 0xffffffff == max 32 bit int val.
  return ( buffer[0] / (0xffffffff + 1) );
}

export function randomInt(preQuantMin: number, preQuantMax: number): number {
  const min: number = Math.ceil(preQuantMin);
  const max: number = Math.floor(preQuantMax);
  return Math.floor(cryptoRand() * (max - min + 1)) + min;
}

export function randomLetter(): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[randomInt(0, alphabet.length - 1)];
}

export function randomVowel(): string {
  const vowels = 'aeiou';
  return vowels[randomInt(0, vowels.length - 1)]
}

export const letterWeights = {
  'e': 24,
  'a': 16,
  't': 15,
  'o': 15,
  'r': 13,
  'n': 13,
  'i': 13,
  's': 10,
  'd': 8,
  'u': 7,
  'l': 7,
  'm': 6,
  'c': 6,
  'g': 5,
  'h': 5,
  'p': 4,
  'b': 4,
  'y': 4,
  'w': 4,
  'f': 4,
  'v': 3,
  'k': 2,
  'x': 2,
  'j': 2,
  'z': 2,
  'q': 2,
}

export function randomWeightedLetter(): string {
  const weightSpread = Object.values(letterWeights).reduce((acc, curr) => acc + curr, 0)
  let randInt = randomInt(1, weightSpread);
  for (const [letter, weight] of Object.entries(letterWeights) ) {
    randInt -= weight;
    if (randInt <= 0) {
      return letter;
    }
  }
  // This will never happen since the randInt is constrained by the weightSpread.
  // But it keeps Typescript happy.
  return '';
}
