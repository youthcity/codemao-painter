import './js/override/static-canvas';
import './js/override/canvas.js';
import './js/override/canvas-events.js';
import './js/override/base-brush.js';
import './js/override/pencil-brush.js';
import './js/layer.js';
import './js/layer-manager.js';
import './js/cursor-render.js';
import './js/eraser-brush.js';
import './js/point-brush.js';
import './js/line-brush.js';
import './js/rect-brush.js';
import './js/round-brush.js';

import {Brush} from './def/Brush.ts';
import {Shape} from './def/Shape.ts';

//  todo: use modules
const global:any = window;

class FabricCanvas {
  private _canvas:any;
  get canvas() {
    return this._canvas;
  }

  private last_shape:Shape;
  private shape_offset:number = 0;

  init(element:any, wrapper_element:any) {
    this._canvas = new global.fabric.Canvas(element);
    this.set_canvas_size(wrapper_element.clientWidth, wrapper_element.clientHeight);

    this.canvas.setFreeDrawingBrush(Brush[Brush.pencil], {
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
  set_canvas_size(width:number, height:number) {
    this._canvas.setWidth(width);
    this._canvas.setHeight(height);
    this._canvas.layerManager.setBackgroundImageURL();
  }

  /**
   * Select color and set fabric color.
   * @param color
   */
  select_color(color:string) {
    if (this._canvas) {
      if (this._canvas.freeDrawingBrush) {
        this._canvas.freeDrawingBrush.color = color;
      }
    }
  }

  set_brush(brush = Brush.pointer, width = 7, color = '#333') {
    if (brush !== Brush.pointer) {
      this.canvas.deactivateAll();
      this.canvas.renderAll();
      this.canvas.setFreeDrawingBrush(Brush[brush], {
        width: width,
        color: color,
      });
      this.canvas.setDrawingMode(true);
      this.last_shape = undefined;
    } else {
      this.canvas.setDrawingMode(false);
    }
  }

  add_shape(shape:Shape, width = 7, color = '#333') {
    let shape_object:any;
    this.set_brush();
    if (shape === this.last_shape) {
      this.shape_offset += 10;
    } else {
      this.shape_offset = 0;
    }

    switch (shape) {
      case Shape.rect:
        shape_object = new global.fabric.Rect({
          left: this.canvas.getWidth() / 2 - width * 5 + this.shape_offset,
          top: this.canvas.getHeight() / 2 - width * 5 + this.shape_offset,
          fill: color,
          width: width * 10,
          height: width * 10,
        });
        break;
      case Shape.round:
        shape_object = new global.fabric.Circle({
          left: this.canvas.getWidth() / 2 - width * 5 + this.shape_offset,
          top: this.canvas.getHeight() / 2 - width * 5 + this.shape_offset,
          fill: color,
          radius: width * 10,
        });
        break;
      case Shape.triangle:
        shape_object = new global.fabric.Triangle({
          left: this.canvas.getWidth() / 2 - width * 5 + this.shape_offset,
          top: this.canvas.getHeight() / 2 - width * 5 + this.shape_offset,
          fill: color,
          width: width * 10,
          height: width * 10,
        });
        break;
      case Shape.text:
        const text = '点我选中文字，在画布下方可以修改文字内容和样式哦~';
        shape_object = new global.fabric.Text(text, {
          left: this.canvas.getWidth() / 2 + this.shape_offset,
          top: this.canvas.getHeight() / 2 + this.shape_offset,
          fontFamily: 'Microsoft YaHei',
          angle: 0,
          fill: color,
          scaleX: 1,
          scaleY: 1,
          fontWeight: '',
          originX: 'center',
          originY: 'center',
          hasRotatingPoint: true,
          centerTransform: true,
        });
        break;
      default:
        throw(new Error('Shape not found!'));
    }
    this.canvas.add(shape_object);
    this.canvas.setActiveObject(shape_object);
    this.canvas.fire('path:created', {path: shape_object});


    this.last_shape = shape;
  }
}

export let fabric_canvas = new FabricCanvas();