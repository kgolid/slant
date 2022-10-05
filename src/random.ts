import PARAMS from './params';

class Random {
  useA: boolean;
  prngA: () => number;
  prngB: () => number;

  constructor(hash: string) {
    console.log('hello');
    this.useA = false;
    let sfc32 = function (uint128Hex: string) {
      let a = parseInt(uint128Hex.substring(0, 8), 16);
      let b = parseInt(uint128Hex.substring(8, 16), 16);
      let c = parseInt(uint128Hex.substring(16, 24), 16);
      let d = parseInt(uint128Hex.substring(24), 16);
      return function () {
        a |= 0;
        b |= 0;
        c |= 0;
        d |= 0;
        let t = (((a + b) | 0) + d) | 0;
        d = (d + 1) | 0;
        a = b ^ (b >>> 9);
        b = (c + (c << 3)) | 0;
        c = (c << 21) | (c >>> 11);
        c = (c + t) | 0;
        return (t >>> 0) / 4294967296;
      };
    };
    // seed prngA with first half of tokenData.hash
    this.prngA = sfc32(hash.substring(0, 32));
    // seed prngB with second half of tokenData.hash
    this.prngB = sfc32(hash.substring(32));
    for (let i = 0; i < 1e6; i += 2) {
      this.prngA();
      this.prngB();
    }
  }
  // random number between 0 (inclusive) and 1 (exclusive)
  random_dec() {
    this.useA = !this.useA;
    return this.useA ? this.prngA() : this.prngB();
  }
}

let rand = new Random(PARAMS.seed);

export function reset() {
  rand = new Random(PARAMS.seed);
}
export const rng = brnd;

function brnd() {
  return rand.random_dec();
}
