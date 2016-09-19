import { Point } from "./def/Point";
interface Bound {
  top:number;
  left:number;
  right:number;
  bottom:number;
}
/**
 * Trim canvas element
 * @param c
 * @param rotate_center
 * @returns {HTMLCanvasElement}
 */
export function trim_canvas(c:HTMLCanvasElement, rotate_center?:Point) {

  let ctx = c.getContext('2d'),
    copy = document.createElement('canvas').getContext('2d'),
    pixels = ctx.getImageData(0, 0, c.width, c.height),
    l = pixels.data.length,
    i:number,
    bound:Bound = {
      top: null,
      left: null,
      right: null,
      bottom: null
    },
    x:number,
    y:number;

  for (i = 0; i < l; i += 4) {
    if (pixels.data[i + 3] !== 0) {
      x = (i / 4) % c.width;
      y = ~~((i / 4) / c.width);

      if (bound.top === null) {
        bound.top = y;
      }

      if (bound.left === null) {
        bound.left = x;
      } else if (x < bound.left) {
        bound.left = x;
      }

      if (bound.right === null) {
        bound.right = x;
      } else if (bound.right < x) {
        bound.right = x;
      }

      if (bound.bottom === null) {
        bound.bottom = y;
      } else if (bound.bottom < y) {
        bound.bottom = y;
      }
    }
  }

  const stage_width: number = 620;
  const stage_height: number = 900;
  let stage_bound: Bound = {
    top: ~~((c.height - stage_height)/2),
    left: ~~((c.width - stage_width)/2),
    right: ~~((c.width - stage_width)/2) + stage_width,
    bottom: ~~((c.height - stage_height)/2) + stage_height
  };
  bound.left = Math.min(bound.left, stage_bound.left);
  bound.right = Math.max(bound.right, stage_bound.right);
  bound.top = Math.min(bound.top, stage_bound.top);
  bound.bottom = Math.max(bound.bottom, stage_bound.bottom);

  let trimHeight = bound.bottom - bound.top + 1;
  let trimWidth = bound.right - bound.left + 1;
  let trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

  copy.canvas.width = trimWidth;
  copy.canvas.height = trimHeight;
  copy.putImageData(trimmed, 0, 0);
  // open new window with trimmed image:
  return {
    canvas: copy.canvas,
    rotate_center: {
      x: rotate_center.x - bound.left,
      y: rotate_center.y - bound.top
    }
  };
}
