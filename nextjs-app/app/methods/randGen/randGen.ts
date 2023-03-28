'use client';

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

// export function randomWeightLetter(): string {
  
// }
