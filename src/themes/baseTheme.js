import { rgba } from "polished";

const sizes = {
  xl: 1600,
  l: 1280,
  m: 820,
  s: 360,
};

export const device = {
  xl: `(min-width: ${sizes.xl})`,
  l: `(min-width: ${sizes.l})`,
  m: `(min-width: ${sizes.m})`,
  s: `(min-width: ${sizes.s})`,
};

const color = {
  white: "white",
  whiteTransparent75: rgba(255, 255, 255, 0.75),
  background: "#141414",
  backgroundLite: rgba(32, 32, 32, 1),
  overlay: rgba(20, 20, 20, 0.75),
};

const theme = {
  color,
  sizes,
};

export default theme;
