export function createHash() {
  let alpha = '01234567890abcdef';
  let h = '';
  for (let i = 0; i < 64; i++) {
    h += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }
  return h;
}

export function sum(array: number[]): number {
  return array.reduce((a, c) => a + c);
}
