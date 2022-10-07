import { Segment } from './interfaces';
import { rng } from './random';

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

export function createDimPattern(): string {
  const numberOfSegments = 1 + Math.floor(rng() * 4);
  const segments = [];
  for (let i = 0; i < numberOfSegments; i++) {
    const numberOfReps = 1 + Math.floor(rng() * 8);
    const numberOfDims = 1 + Math.floor(rng() * 3);
    const dims = [];
    for (let j = 0; j < numberOfDims; j++) {
      dims.push(10 + Math.floor(rng() * 70));
    }
    const segment = numberOfReps + '[' + dims.join(':') + ']';
    segments.push(segment);
  }
  return segments.join('_');
}

export function createSlopePattern(): string {
  const numberOfSegments = 1 + Math.floor(rng() * 4);
  const segments = [];
  for (let i = 0; i < numberOfSegments; i++) {
    const numberOfReps = 1 + Math.floor(rng() * 3);
    const numberOfSlopes = 1 + Math.floor(rng() * 8);
    const slopeProfiles = [];
    for (let j = 0; j < numberOfSlopes; j++) {
      const slope = Math.round((rng() * 2 - 1) * 1000) / 1000;
      const wildcard = rng() < 0.2;
      slopeProfiles.push(wildcard ? 13 : slope);
    }
    const segment = numberOfReps + '[' + slopeProfiles.join(':') + ']';
    segments.push(segment);
  }
  return segments.join('_');
}
