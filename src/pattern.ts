import { Segment, Slope } from './interfaces';

export function parsePattern(pattern: string): Segment[] {
  return pattern.split('_').map((segment) => {
    const reps = parseInt(segment.at(0));
    const dims = segment
      .slice(2, -1)
      .split(':')
      .map((i) => parseFloat(i));
    return { reps, dims };
  });
}

export function createDimPattern(rng: Function): string {
  const numberOfSegments = 1 + Math.floor(rng() * 4);
  const segments = [];
  for (let i = 0; i < numberOfSegments; i++) {
    const numberOfReps = 1 + Math.floor(rng() * 8);
    const numberOfDims = 1 + Math.floor(rng() * 3);
    const dims = [];
    for (let j = 0; j < numberOfDims; j++) {
      dims.push(10 + Math.floor(Math.pow(rng() * 9, 2)));
      //dims.push(10 + Math.floor(rng() * 70));
    }
    const segment = numberOfReps + '[' + dims.join(':') + ']';
    segments.push(segment);
  }
  return segments.join('_');
}

export function createSlopePattern(rng: Function): string {
  const numberOfSegments = 1 + Math.floor(rng() * 3);
  const segments = [];
  let tick = 0;
  for (let i = 0; i < numberOfSegments; i++) {
    const numberOfReps = 1 + Math.floor(rng() * 3);
    const numberOfSlopes = 1 + Math.floor(rng() * 7);
    const slopeProfiles = [];
    for (let j = 0; j < numberOfSlopes; j++) {
      slopeProfiles.push(tick++);
    }
    const segment = numberOfReps + '[' + slopeProfiles.join(':') + ']';
    segments.push(segment);
  }
  return segments.join('_');
}

export function createSlopes(rng: Function): Slope[][] {
  const profiles = [];
  for (let i = 0; i < 32; i++) {
    const profileRow = [];
    for (let j = 0; j < 32; j++) {
      profileRow.push({ z: rng(), xslope: rng() * 2 - 1, yslope: rng() * 2 - 1 });
    }
    profiles.push(profileRow);
  }
  return profiles;
}
