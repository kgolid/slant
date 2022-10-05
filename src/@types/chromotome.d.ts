declare module 'chromotome' {
  export function get(name: string): Palette;
  export function get(): Palette;
  export function getNames(): string[];
}

interface Palette {
  name: string;
  colors: string[];
  background: string;
  stroke: string;
}
