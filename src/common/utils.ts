export type RGB = [number, number, number];

export function clamp(num: number, min: number = 0, max: number = 255) {
  return Math.min(Math.max(num, min), max);
}

export function clampColor(rgb: RGB): RGB {
  return [clamp(rgb[0]), clamp(rgb[1]), clamp(rgb[2])];
}

export function rgbToHex(rgb: RGB) {
  function toHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  return `#${rgb.map(toHex).join("")}`;
}
