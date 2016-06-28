import '../js/override/static-canvas';
import '../js/override/canvas.js';
import '../js/override/canvas-events.js';
import '../js/override/base-brush.js';
import '../js/override/pencil-brush.js';
import '../js/layer.js';
import '../js/layer-manager.js';
import '../js/cursor-render.js';
import '../js/eraser-brush.js';
import '../js/point-brush.js';
import '../js/line-brush.js';
import '../js/rect-brush.js';
import '../js/round-brush.js';

//  todo: use modules
const global: any = window;

class FabricCanvas {
  private _canvas;
  get canvas() {
    return this._canvas;
  }
  init(element: any, wrapper_element: any) {
    this._canvas = new global.fabric.Canvas(element);
    this.set_canvas_size(wrapper_element.clientWidth, wrapper_element.clientHeight);

    this.canvas.setFreeDrawingBrush('pencil', {
      width: 5,
      color: '#333',
      opacity: 1,
    });
    this.canvas.setDrawingMode(true);
  }
  /**
   * Set size of the fabric canvas
   * @param width
   * @param height
   */
  set_canvas_size(width: number, height: number) {
    this._canvas.setWidth(width);
    this._canvas.setHeight(height);
    this._canvas.layerManager.setBackgroundImageURL();
  }
  /**
   * Select color and set fabric color.
   * @param color
   */
  select_color(color: string) {
    if (this._canvas) {
      if (this._canvas.freeDrawingBrush) {
        this._canvas.freeDrawingBrush.color = color;
      }
    }
  }
}

export let fabricCanvas = new FabricCanvas();